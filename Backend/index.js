const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemsRoutes = require("./routes/itemsRoutes");
const usersRoutes = require("./routes/usersRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Koneksi ke MongoDB
mongoose
	.connect("mongodb://127.0.0.1:27017/salam51")
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Error connecting to MongoDB:", err));

// Menggunakan routes
app.use("/items", itemsRoutes);
app.use("/", usersRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
