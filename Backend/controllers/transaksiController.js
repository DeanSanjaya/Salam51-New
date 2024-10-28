const transaksiModel = require("../models/transaksi");

const createTransaksi = async (req, res) => {
	try {
		const transaksi = await transaksiModel.create(req.body);
		res.status(201).json(transaksi);
	} catch (err) {
		res.status(400).json(err);
	}
};

const getTransaksi = (req, res) => {
	transaksiModel
		.find()
		.then((transaksi) => res.json(transaksi))
		.catch((err) => res.json(err));
};

const getTransaksiCount = async (req, res) => {
	try {
		const count = await transaksiModel.countDocuments({});
		res.status(200).json({ count });
	} catch (error) {
		console.error("error getting count: ", error);
		res.status(500).json({ message: "error getting count" });
	}
};

module.exports = {
	createTransaksi,
	getTransaksi,
	getTransaksiCount,
};
