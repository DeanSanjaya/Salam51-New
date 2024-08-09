const usersModel = require("../models/users");

const login = (req, res) => {
	const { username, password } = req.body;
	usersModel.findOne({ username: username }).then((user) => {
		if (user) {
			if (user.password === password) {
				res.json({ message: "login berhasil" });
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
