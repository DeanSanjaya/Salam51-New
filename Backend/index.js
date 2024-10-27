const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemsRoutes = require("./routes/itemsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const transaksiRoutes = require("./routes/transaksiRoutes");
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

mongoose
	.connect(MONGO_URL)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/items", itemsRoutes);
app.use("/", usersRoutes);
app.use("/transaksi", transaksiRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
