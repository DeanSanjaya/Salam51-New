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

module.exports = {
	login,
};
