const itemsModel = require("../models/items");

const getItems = (req, res) => {
	itemsModel
		.find()
		.then((items) => res.json(items))
		.catch((err) => res.json(err));
};

const getItemById = (req, res) => {
	const _id = req.params.id;
	itemsModel
		.findById(_id)
		.then((item) => res.json(item))
		.catch((err) => res.json(err));
};

const createItem = (req, res) => {
	itemsModel
		.create(req.body)
		.then((item) => res.status(201).json(item))
		.catch((err) => res.status(400).json(err));
};

const updateItem = (req, res) => {
	const _id = req.params.id;
	const updates = {};
	if (req.body.nama) updates.nama = req.body.nama;
	if (req.body.tanggal) updates.tanggal = req.body.tanggal;
	if (req.body.jumlah) updates.jumlah = req.body.jumlah;
	itemsModel
		.findByIdAndUpdate(_id, { $set: updates }, { new: true })
		.then((item) => res.json(item))
		.catch((err) => res.json(err));
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

		if (item.detail.length === 0) {
			await itemsModel.findByIdAndDelete(itemId);
			return res.status(200).json({ message: "Detail barang berhasil dihapus, item juga dihapus karena tidak ada detail tersisa." });
		}

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
		if (isNaN(jumlah) || !tanggal.getTime()) {
			return res.status(400).json({ message: "Data tidak valid" });
		}
		item.detail.push({
			jumlah,
			tanggal,
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
	getItemById,
	createItem,
	updateItem,
	deleteItem,
	addDetail,
	deleteDetail,
};
