const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemsModel = require("./models/items");
const usersModel = require("./models/users");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb://127.0.0.1:27017/salam51");

app.post("/login", (req, res) => {
	const { username, password } = req.body;
	usersModel.findOne({ username: username }).then((user) => {
		if (user) {
			if (user.password === password) {
				res.json({ message: "Login Succesfull" });
			} else {
				res.json({ message: "password salah" });
			}
		} else {
			res.json({ message: "no username" });
		}
	});
});

app.get("/items", (req, res) => {
	itemsModel
		.find()
		.then((item) => res.json(item))
		.catch((err) => res.json(err));
});

app.get("/items/:id", (req, res) => {
	const _id = req.params.id;
	itemsModel
		.find({ _id })
		.then((item) => res.json(item))
		.catch((err) => res.json(err));
});

app.post("/items", (req, res) => {
	itemsModel
		.create(req.body)
		.then((item) => res.json(item))
		.catch((err) => res.json(err));
});

app.post("/change-password", (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const token = req.headers['x-auth-token'];
    
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        usersModel.findById(decoded.id).then((user) => {
            if (user) {
                bcrypt.compare(oldPassword, user.password, (err, result) => {
                    if (result) {
                        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
                            if (err) {
                                return res.status(500).json({ message: "Error hashing password" });
                            }
                            user.password = hashedPassword;
                            user.save()
                                .then(() => res.json({ message: "Password updated successfully" }))
                                .catch((err) => res.status(500).json({ message: "Error saving new password", err }));
                        });
                    } else {
                        res.status(400).json({ message: "Old password is incorrect" });
                    }
                });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        }).catch((err) => res.status(500).json({ message: "Server error", err }));
    });
});

app.put("/items/:id", (req, res) => {
	const _id = req.params.id;
	const updates = {};

	if (req.body.nama) {
		updates.nama = req.body.nama;
	}
	if (req.body.tanggal) {
		updates.tanggal = req.body.tanggal;
	}
	if (req.body.jumlah) {
		updates.jumlah = req.body.jumlah;
	}
	itemsModel
		.findOneAndUpdate({ _id }, { $set: updates }, { new: true })
		.then((item) => res.json(item))
		.catch((err) => res.json(err));
});

// Endpoint untuk menghapus item berdasarkan ID
app.delete("/items/:id", (req, res) => {
	const _id = req.params.id;
	itemsModel
		.findByIdAndDelete(_id) // Menggunakan findByIdAndDelete untuk menghapus item berdasarkan ID
		.then((item) => {
			if (item) {
				res.json({ message: "Item deleted successfully", item });
			} else {
				res.status(404).json({ message: "Item not found" });
			}
		})
		.catch((err) => res.status(500).json({ message: "Server Error", err }));
});

app.listen(PORT, () => {
	console.log(`server is running on http://localhost:${PORT}`);
});
