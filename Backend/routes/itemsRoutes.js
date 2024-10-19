const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

router.get("/", itemsController.getItems);
router.get("/:id", itemsController.getItemById);
router.post("/", itemsController.createItem);
router.put("/:id", itemsController.updateItem);
router.delete("/:id", itemsController.deleteItem);
router.put("/:id/detail", itemsController.addDetail);
router.delete('/:id/detail/:detailId', itemsController.deleteDetail);

module.exports = router;
