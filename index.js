require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// protect req.
const helmet = require("helmet");
// show which req has been made, what was result and how long it took.
const morgan = require("morgan");

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Altas has been connected.");
});

// body-parser when making a post req, it will password it.
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(6969, () => {
  console.log("Port 6969 is running.");
});
