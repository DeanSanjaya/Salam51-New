const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
	nama: String,
	detail: [
		{
			jumlah: Number,
			tanggal: Date,
		},
	],
	totalJumlah: Number,
	leadTime: Number,
	rerata: Number,
	safetyStock: Number,
	ROP: Number,
	satuanWaktu: String,
	satuanBarang: String,
});

const itemsModel = mongoose.model("items", itemsSchema);
module.exports = itemsModel;
