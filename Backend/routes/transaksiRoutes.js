const express = require("express");
const router = express.Router();
const transaksiController = require("../controllers/transaksiController");

router.post("/tambah", transaksiController.createTransaksi);

router.get("/getTransaksi", transaksiController.getTransaksi);
router.get("/", transaksiController.getTransaksiCount);

module.exports = router;
