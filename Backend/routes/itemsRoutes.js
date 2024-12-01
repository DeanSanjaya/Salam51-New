const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

router.get("/", itemsController.getItems);
router.get("/total", itemsController.getTotalItems);
router.get("/count", itemsController.getCollection);
router.get("/totalJumlah", itemsController.getTotalJumlahItemsEachItem);
router.get("/:id", itemsController.getItemById);

router.put("/:id/detail", itemsController.outItem);

router.delete("/:id/detail/:detailId", itemsController.deleteDetail);
router.delete("/:id", itemsController.deleteItem);

router.post("/", itemsController.createItem);
router.post("/:id/detail/", itemsController.addDetail);

module.exports = router;
