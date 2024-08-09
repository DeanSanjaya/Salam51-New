const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
	nama: String,
	jumlah: Number,
	tanggal: String,
});

const itemsModel = mongoose.model("items", itemsSchema);
module.exports = itemsModel;
