const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactionsController");

router.post("/tambah", transactionsController.createTransaksi);

router.get("/getTransaksi", transactionsController.getTransaksi);
router.get("/", transactionsController.getTransaksiCount);

module.exports = router;
