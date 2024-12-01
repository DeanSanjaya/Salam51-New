const usersModel = require("../models/users");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await usersModel.findOne({ username: username });
		if (!user) {
			// Jika username tidak ditemukan
			return res.json({ message: "no username" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			// Jika password salah
			return res.json({ message: "password salah" });
		}

		// Jika login berhasil
		return res.json({ user });
	} catch (err) {
		// Jika terjadi kesalahan
		console.error("Error saat login:", err);
		return res.status(500).json({ message: "Terjadi kesalahan", error: err.message });
	}
};

const resetPassword = async (req, res) => {
	const { username, newPassword } = req.body; // Ambil username dan password baru dari request
	try {
		const user = await usersModel.findOne({ username: username });
		if (!user) {
			return res.status(404).json({ message: "User tidak ditemukan" });
		}

		// Hash password baru
		user.password = await bcrypt.hash(newPassword, 10);
		await user.save();

		res.json({ message: "Password berhasil direset" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

const changePassword = async (req, res) => {
	const { key, oldPassword, newPassword } = req.body;
	try {
		const user = await usersModel.findOne({ username: key });
		// Cek password lama dengan hash yang disimpan
		const isMatch = await bcrypt.compare(oldPassword, user.password);
		if (!isMatch) {
			return res.json({ message: "password salah" });
		}

		// Hash password baru sebelum disimpan
		const hashedNewPassword = await bcrypt.hash(newPassword, 10);

		// Cek apakah password baru sama dengan yang lama
		const isSamePassword = await bcrypt.compare(newPassword, user.password);
		if (isSamePassword) {
			return res.json({ message: "passwordnya sama" });
		}

		// Simpan password baru
		user.password = hashedNewPassword;
		await user.save();

		res.json({ message: "berhasil ganti" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

const addUser = async (req, res) => {
	try {
		const existingUser = await usersModel.findOne({ username: req.body.username });

		if (existingUser) {
			return res.status(400).json({ message: "Username sudah terpakai" });
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		const newUser = await usersModel.create({
			...req.body,
			password: hashedPassword, // Ganti password dengan hashed password
			role: req.body.role,
		});

		res.status(201).json(newUser);
	} catch (err) {
		res.status(400).json({ message: "Terjadi kesalahan saat menambahkan user", error: err });
	}
};

const getUserCount = async (req, res) => {
	try {
		const count = await usersModel.countDocuments({});
		res.status(200).json({ count });
	} catch (error) {
		console.error("error getting count: ", error);
		res.status(500).json({ message: "error getting count" });
	}
};

module.exports = {
	login,
	changePassword,
	resetPassword,
	addUser,
	getUserCount,
};
