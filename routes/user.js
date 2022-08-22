const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const multer = require("multer");
const upload = multer({
  limits: {
    // 限制容量500KB
    fileSize: 500000,
  },
  fileFilter(req, file, cb) {
    // 只接受三種圖片格式
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("Please upload an image"));
    }
    cb(null, true);
  },
});

// update user
router.put("/:_id", async (req, res) => {
  // check before querying*******************************

  // check id
  if (req.body._id === req.params._id || req.body.isAdmin) {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }
    try {
      await User.findByIdAndUpdate(req.params._id, req.body);
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("Only person himself can update his account.");
  }
});

// update photo and cover\
router.post("/upload/photos", upload.single("file"), async (req, res) => {
  // check before querying*******************************

  try {
    await User.findByIdAndUpdate(req.body.userID, {
      profilePicture: req.file.buffer,
    });
    res.status(200).send("ok");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/buffer/photos/:_id", async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    res.set("Content-Type", "image/jpeg");
    // only send can cipher img
    res.status(200).send(user.profilePicture);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/upload/covers", upload.single("file"), async (req, res) => {
  // check before querying*******************************

  try {
    await User.findByIdAndUpdate(req.body.userID, {
      coverPicture: req.file.buffer,
    });
    res.status(200).send("ok");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/buffer/covers/:_id", async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    res.set("Content-Type", "image/jpeg");
    // only send can cipher img
    res.status(200).send(user.coverPicture);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete user
router.delete("/:_id", async (req, res) => {
  // check id
  if (req.body._id === req.params._id || req.body.isAdmin) {
    try {
      await User.deleteOne({ _id: req.params._id });
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("Only person himself can update his account.");
  }
});

// find user with condition of userID or username
router.get("/", async (req, res) => {
  const userID = req.query.userID;
  const username = req.query.username;
  try {
    const foundUser = userID
      ? await User.findById(userID)
      : await User.findOne({ username });
    // exclude certain properties
    const { password, updatedAt, ...other } = foundUser._doc;
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get friends: _id, img, username
router.get("/friends/:_id", async (req, res) => {
  try {
    const foundUser = await User.findById(req.params._id);
    // using map with Promise.all to get async data and array
    const friends = await Promise.all(
      foundUser.addfriends.map((friend) => {
        return User.findById(friend);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// follow user
router.put("/:_id/follow", async (req, res) => {
  if (req.params._id !== req.body._id) {
    try {
      const foundUser = await User.findById(req.params._id);
      const currentUser = await User.findById(req.body._id);
      if (!foundUser.followers.includes(req.body._id)) {
        // two ways to push user
        // foundUser add followers
        foundUser.followers.push(req.body._id);
        foundUser.save();
        // currentUser add followings
        await currentUser.updateOne({ $push: { followings: req.params._id } });
        res.status(200).json("User has been followed.");
      } else {
        res
          .status(403)
          .json("You cannot follow the same person twice, unless TWICE.");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res
      .status(403)
      .json("You cannot follow yourself, unless follow your heart.");
  }
});

// unfollow user
router.put("/:_id/unfollow", async (req, res) => {
  if (req.params._id !== req.body._id) {
    try {
      const foundUser = await User.findById(req.params._id);
      const currentUser = await User.findById(req.body._id);
      if (foundUser.followers.includes(req.body._id)) {
        await foundUser.updateOne({ $pull: { followers: req.body._id } });
        await currentUser.updateOne({ $pull: { followings: req.params._id } });
        res.status(200).json("User has been unfollowed.");
      } else {
        res.status(403).json("You dont have this friend, dont worry.");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cannot unfollow yourself.");
  }
});

// add friend

router.put("/:_id/addFriend", async (req, res) => {
  if (req.params._id !== req.body._id) {
    try {
      const foundUser = await User.findById(req.params._id);
      const currentUser = await User.findById(req.body._id);
      if (!foundUser.addfriends.includes(req.body._id)) {
        await foundUser.updateOne({ $push: { addfriends: req.body._id } });
        await currentUser.updateOne({ $push: { addfriends: req.params._id } });
        res.status(200).json("Addfriend finished.");
      } else {
        await foundUser.updateOne({ $pull: { addfriends: req.body._id } });
        await currentUser.updateOne({ $pull: { addfriends: req.params._id } });
        res.status(200).json("Unfriend finished.");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cannot add yourself.");
  }
});

module.exports = router;
