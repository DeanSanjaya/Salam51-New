const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactionsController");

router.post("/tambah", transactionsController.createTransaksi);

router.get("/getTransaksi", transactionsController.getTransaksi);
router.get("/getTransaksi/:id", transactionsController.getTransaksiById);
router.get("/", transactionsController.getTransaksiCount);

// router.put("/updateRerata/:idBarang", transactionsController.calculateAndUpdateRerata);

module.exports = router;
