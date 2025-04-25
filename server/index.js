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

const authRoutes = require("../auth/authRoutes");
const commentRoutes = require("../Comments/commentRoutes");

const reviewRoutes = require("../reviews/reviewRoutes");

app.use('/api', reviewRoutes);

app.use("/api/auth", authRoutes);
app.use('/api', commentRoutes);




app.get('/', async (req, res) => {
  res.send("Is working")
});
module.exports = app;
