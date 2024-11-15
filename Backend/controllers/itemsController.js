const itemsModel = require("../models/items");

const getItems = (req, res) => {
	itemsModel
		.find()
		.then((items) => res.json(items))
		.catch((err) => res.json(err));
};

const getTotalItems = async (req, res) => {
	try {
		const result = await itemsModel.aggregate([
			{
				$group: {
					_id: null, // Grouping without a specific key to get a total
					totalItems: { $sum: "$totalJumlah" }, // Sum up the totalJumlah field
				},
			},
		]);

		// Check if there are any results
		const totalItems = result.length > 0 ? result[0].totalItems : 0;

		res.status(200).json({ totalItems });
	} catch (error) {
		console.error("Error getting total items:", error);
		res.status(500).json({ message: "Error getting total items" });
	}
};

const getCollection = async (req, res) => {
	try {
		const count = await itemsModel.countDocuments({});
		res.status(200).json({ count });
	} catch (error) {
		console.error("error getting count: ", error);
		res.status(500).json({ message: "error getting count" });
	}
};

const getTotalJumlahItemsEachItem = async (req, res) => {
	try {
		const items = await itemsModel.aggregate([
			{
				$addFields: {
					totalJumlah: { $sum: "$detail.jumlah" },
				},
			},
			{
				$project: {
					_id: 1,
					nama: 1,
					totalJumlah: 1, // Menyembunyikan field detail
				},
			},
		]);
		res.status(200).json(items);
	} catch (err) {
		console.error("Error fetching total jumlah:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getItemById = (req, res) => {
	const _id = req.params.id;
	itemsModel
		.findById(_id)
		.then((item) => res.json(item))
		.catch((err) => res.json(err));
};

const createItem = async (req, res) => {
	try {
		const item = await itemsModel.create(req.body);
		res.status(201).json(item);
	} catch (err) {
		res.status(400).json(err);
	}
};

const outItem = async (req, res) => {
	const { id } = req.params;
	const { jumlahKeluar } = req.body;

	const item = await itemsModel.findById(id);
	if (jumlahKeluar > item.totalJumlah) {
		return res.status(400).json({ message: "Jumlah barang tidak cukup" });
	}
	try {
		let remainingToRemove = jumlahKeluar;
		const detailYangDigunakan = [];
		for (let i = 0; i < item.detail.length; i++) {
			const detail = item.detail[i];
			if (remainingToRemove <= 0) break;
			if (remainingToRemove >= detail.jumlah) {
				remainingToRemove -= detail.jumlah;
				detailYangDigunakan.push({
					tempat: detail.tempat,
					jumlahYangDikeluarkan: detail.jumlah,
				});
				detail.jumlah = 0;
			} else {
				detail.jumlah -= remainingToRemove;
				detailYangDigunakan.push({
					tempat: detail.tempat,
					jumlahYangDikeluarkan: remainingToRemove,
				});
				remainingToRemove = 0;
			}
		}
		item.detail = item.detail.filter((detail) => detail.jumlah > 0);
		item.totalJumlah = item.detail.reduce((total, d) => total + d.jumlah, 0);
		await item.save();
		return res.status(200).json({
			message: "Barang berhasil dikeluarkan",
			item,
			detailYangDigunakan,
		});
	} catch (error) {
		console.error("Error updating detail:", error);
		res.status(500).json({ message: "Terjadi kesalahan saat mengupdate detail", error: error.message });
	}
};

const deleteItem = (req, res) => {
	const _id = req.params.id;
	itemsModel
		.findByIdAndDelete(_id)
		.then((item) => {
			if (item) {
				res.json({ message: "Item deleted successfully", item });
			} else {
				res.status(404).json({ message: "Item not found" });
			}
		})
		.catch((err) => res.status(500).json({ message: "Server Error", err }));
};

const deleteDetail = async (req, res) => {
	const { id: itemId, detailId } = req.params;
	try {
		const item = await itemsModel.findById(itemId);
		if (!item) {
			return res.status(404).json({ message: "Item tidak ditemukan" });
		}

		if (!Array.isArray(item.detail)) {
			return res.status(500).json({ message: "Detail tidak valid, tidak dapat menghapus" });
		}

		const updatedDetails = item.detail.filter((detail) => detail._id.toString() !== detailId);

		item.detail = updatedDetails;

		const totalJumlah = item.detail.reduce((total, detail) => total + detail.jumlah, 0);
		item.totalJumlah = totalJumlah; // Update total jumlah barang

		await item.save();
		res.status(200).json({ message: "Detail barang berhasil dihapus", item });
	} catch (error) {
		console.error("Error deleting detail:", error);
		res.status(500).json({ message: "Terjadi kesalahan saat menghapus detail barang", error: error.message });
	}
};

const addDetail = async (req, res) => {
	try {
		const item = await itemsModel.findById(req.params.id);
		if (!item) {
			return res.status(404).json({ message: "Item tidak ditemukan" });
		}
		const jumlah = parseInt(req.body.jumlah);
		const tanggal = new Date(req.body.tanggal);
		const tempat = req.body.tempat;
		if (isNaN(jumlah) || !tanggal.getTime()) {
			return res.status(400).json({ message: "Data tidak valid" });
		}
		item.detail.push({
			jumlah,
			tanggal,
			tempat,
		});
		item.detail.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
		const totalJumlah = item.detail.reduce((total, detail) => total + detail.jumlah, 0);
		item.totalJumlah = totalJumlah;
		await item.save();
		res.status(200).json(item);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error", error });
	}
};

module.exports = {
	getItems,
	getCollection,
	getTotalItems,
	getTotalJumlahItemsEachItem,
	getItemById,
	createItem,
	outItem,
	deleteItem,
	addDetail,
	deleteDetail,
};
