const mongoose = require("mongoose");
const { Schema } = mongoose;

const detailSchema = new Schema({
	jumlah: { type: Number },
	tanggal: { type: Date },
	tempat: { type: String },
});

const itemsSchema = new Schema({
	nama: { type: String },
	merk: { type: String },
	detail: [detailSchema],
	attributes: {
		type: Map,
		of: String,
	},
	leadTime: { type: Number },
	rerata: { type: Number },
	safetyStock: { type: Number },
	satuanBarang: { type: String },
	satuanWaktu: { type: String },
	totalJumlah: { type: Number },
	ROP: { type: Number },
});

module.exports = mongoose.model("items", itemsSchema);
