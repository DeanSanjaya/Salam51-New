const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	username: { type: String, required: [true, "Your username is required"] },
	password: { type: String, required: [true, "Your password is required"] },
	role: { type: String, enum: ["user", "admin"], default: "user" },
});

userSchema.pre("save", async function () {
	this.password = await bcrypt.hash(this.password, 12);
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
