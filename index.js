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
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

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

// 輸入server+/images/檔案即可透過server取得照片
app.use("/images", express.static(path.join(__dirname, "client/src/images")));

const storagePost = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "client/src/images/postPicture");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const uploadPost = multer({ storage: storagePost });
app.post("/uploadpost", uploadPost.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

const storageProfile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "client/src/images/profilePicture");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const uploadProfile = multer({ storage: storageProfile });
app.post("/uploadprofile", uploadProfile.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

const storageCover = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "client/src/images/coverPicture");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const uploadCover = multer({ storage: storageCover });
app.post("/uploadcover", uploadCover.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

// const upload = multer({
//   limits: {
//     // 限制容量500KB
//     fileSize: 500000,
//   },
//   fileFilter(req, file, cb) {
//     // 只接受三種圖片格式
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       cb(new Error("Please upload an image"));
//     }
//     cb(null, true);
//   },
// });

// 處理po文的圖片

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(process.env.PORT || 6969, () => {
  console.log("Port 6969 is running.");
});
