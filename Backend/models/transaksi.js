const mongoose = require("mongoose");

const transaksiSchema = new mongoose.Schema({
	namaBarang: String,
	jenisTransaksi: String,
	jumlah: Number,
	tanggalTransaksi: Date,
	username: String,
});

const transaksiModel = mongoose.model("transaksi", transaksiSchema);
module.exports = transaksiModel;
