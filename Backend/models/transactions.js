const mongoose = require("mongoose");

const transaksi = new mongoose.Schema({
	tanggalTransaksi: Date,
	jumlah: Number,
	username: String,
});

const transactionSchema = new mongoose.Schema({
	namaBarang: String,
	idBarang: String,
	penambahan: [transaksi],
	pengeluaran: [transaksi],
	penghapusan: [transaksi],
});

const transactionModel = mongoose.model("transaction", transactionSchema);
module.exports = transactionModel;
