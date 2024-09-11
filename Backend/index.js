const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemsRoutes = require("./routes/itemsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Koneksi ke MongoDB
mongoose
	.connect(MONGO_URL)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Error connecting to MongoDB:", err));

// Menggunakan routes
app.use("/items", itemsRoutes);
app.use("/", usersRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
