const usersModel = require("../models/users");

const login = (req, res) => {
	const { username, password } = req.body;
	usersModel.findOne({ username: username }).then((user) => {
		if (user) {
			if (user.password === password) {
				if (user.role === "admin") {
					res.json({ message: "login admin" });
				} else if (user.role === "user") {
					res.json({ message: "login user" });
				}
			} else {
				res.json({ message: "password salah" });
			}
		} else {
			res.json({ message: "no username" });
		}
	});
};

const changePassword = async (req, res) => {
	const { key, oldPassword, newPassword } = req.body;
	try {
		const user = await usersModel.findOne({ username: key });
		if (user.password === newPassword) {
			res.json({ message: "passwordnya sama" });
		} else if (user.password !== oldPassword) {
			res.json({ message: "password salah" });
		} else {
			user.password = newPassword;
			await user.save();
			res.json({ message: "berhasil ganti" });
		}
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

module.exports = {
	login,
	changePassword,
};
