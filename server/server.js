const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const habitRoutes = require("./routes/habitRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("Mongo Error:", err));

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("LevelUp API Running 🚀");
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});