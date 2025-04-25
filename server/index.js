require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

const authRoutes = require("../routes/auth/authRoutes");
const commentRoutes = require("../routes/comments/commentRoutes");
const reviewRoutes = require("../reviews/reviewRoutes");
const itemRoutes = require("../routes/items/itemRoutes");

app.use("/api", itemRoutes);
app.use("/api", reviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", commentRoutes);

app.get("/", async (req, res) => {
  res.send("Is working");
});

module.exports = app;
