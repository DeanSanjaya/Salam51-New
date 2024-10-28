const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/login", usersController.login);
router.post("/change-password", usersController.changePassword);
router.post("/reset", usersController.resetPassword);
router.post("/addUser", usersController.addUser);

router.get("/getUserCount", usersController.getUserCount);

module.exports = router;
