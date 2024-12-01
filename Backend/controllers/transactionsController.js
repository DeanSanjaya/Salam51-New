const transactionModel = require("../models/transactions");

const createTransaksi = async (req, res) => {
	try {
		const { namaBarang, transaksi, idBarang } = req.body;

		// Cari transaksi berdasarkan nama barang
		let existingTransaction = await transactionModel.findOne({ idBarang });

		if (existingTransaction) {
			// Jika barang sudah ada, tambahkan transaksi baru ke dalam kategori yang sesuai
			transaksi.forEach((item) => {
				if (item.jenisTransaksi === "Penambahan") {
					existingTransaction.penambahan.push(item);
				} else if (item.jenisTransaksi === "Pengeluaran") {
					existingTransaction.pengeluaran.push(item);
				} else if (item.jenisTransaksi === "Penghapusan") {
					existingTransaction.penghapusan.push(item);
				}
			});

			// Simpan perubahan dan perbarui total
			await existingTransaction.save();

			res.status(200).json(existingTransaction);
		} else {
			// Jika barang belum ada, buat transaksi baru
			const newTransaction = new transactionModel({
				namaBarang,
				idBarang,
				penambahan: transaksi.filter((item) => item.jenisTransaksi === "Penambahan"),
				pengeluaran: transaksi.filter((item) => item.jenisTransaksi === "Pengeluaran"),
				penghapusan: transaksi.filter((item) => item.jenisTransaksi === "Penghapusan"),
			});

			// Simpan transaksi baru
			await newTransaction.save();

			res.status(201).json(newTransaction);
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const getTransaksi = (req, res) => {
	transactionModel
		.find()
		.then((transaksi) => res.json(transaksi))
		.catch((err) => res.json(err));
};

const getTransaksiById = async (req, res) => {
	try {
		const transaksi = await transactionModel.findById(req.params.id);
		if (!transaksi) {
			return res.status(404).json({ message: "Transaksi tidak ditemukan" });
		}
		res.status(200).json(transaksi);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getTransaksiCount = async (req, res) => {
	try {
		// Menggunakan pipeline agregasi untuk menghitung total jumlah transaksi
		const result = await transactionModel.aggregate([
			{
				$group: {
					_id: null,
					totalPenambahan: { $sum: { $size: "$penambahan" } },
					totalPengeluaran: { $sum: { $size: "$pengeluaran" } },
					totalPenghapusan: { $sum: { $size: "$penghapusan" } },
				},
			},
			{
				$project: {
					count: {
						$add: ["$totalPenambahan", "$totalPengeluaran", "$totalPenghapusan"],
					},
				},
			},
		]);

		// Jika tidak ada data, set default 0
		const count = result[0]?.count || 0;

		res.status(200).json({ count });
	} catch (error) {
		console.error("Error getting total transaksi: ", error);
		res.status(500).json({ message: "Error getting total transaksi" });
	}
};

module.exports = {
	createTransaksi,
	getTransaksi,
	getTransaksiById,
	getTransaksiCount,
};
