require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// protect req.
const helmet = require("helmet");
// show which req has been made, what was result and how long it took.
const morgan = require("morgan");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const cors = require("cors");

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Altas has been connected.");
});

app.use(cors());
// body-parser when making a post req, it will password it.
app.use(express.json());
app.use(
  helmet({
    // https://stackoverflow.com/questions/69243166/err-blocked-by-response-notsameorigin-cors-policy-javascript
    crossOriginResourcePolicy: false,
  })
);
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(6969, () => {
  console.log("Port 6969 is running.");
});
