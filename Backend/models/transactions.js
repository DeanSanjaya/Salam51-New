const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
	namaBarang: String,
	jenisTransaksi: String,
	jumlah: Number,
	tanggalTransaksi: Date,
	username: String,
});

const transactionModel = mongoose.model("transaction", transactionSchema);
module.exports = transactionModel;
