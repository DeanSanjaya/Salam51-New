const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/login", usersController.login);
router.post("/change-password", usersController.changePassword);

module.exports = router;
