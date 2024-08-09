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
		.then((item) => res.json(item))
		.catch((err) => res.json(err));
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

module.exports = {
	getItems,
	getItemById,
	createItem,
	updateItem,
	deleteItem,
};
