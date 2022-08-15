const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

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

// follow user
router.put("/:_id/follow", async (req, res) => {
  if (req.params._id !== req.body._id) {
    try {
      const foundUser = await User.findById(req.params._id);
      const currentUser = await User.findById(req.body._id);
      if (!foundUser.followers.includes(req.body._id)) {
        // two ways to push user
        foundUser.followers.push(req.body._id);
        foundUser.save();
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

module.exports = router;
