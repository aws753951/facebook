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

const path = require("path");

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Altas has been connected.");
});

// use images path(http://localhost6969/images/檔案), dont need make any req
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(cors());
// body-parser when making a post req, it will password it.
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(morgan("common"));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     // only server => file.originalname , use client to receive file => req.body.name (name is appended to FormData())
//     cb(null, req.body.name);
//   },
// });

// 要嘗試的地方 --------3  名稱已經改成可以運行的東西
// 這邊透過postman 搭配名稱，是可以傳到server的

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(6969, () => {
  console.log("Port 6969 is running.");
});
