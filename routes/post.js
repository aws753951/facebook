const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

const multer = require("multer");
const upload = multer({});

// post an article
router.post("/upload", upload.single("file"), async (req, res) => {
  // check before querying*******************************
  let { userID, desc } = req.body;
  let { originalname, buffer } = req.file;
  try {
    const newPost = new Post({
      userID,
      desc,
      img: originalname,
      file: buffer,
    });
    const savedPost = await newPost.save();
    res.status(200).json("ok");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/buffer/:_id", async (req, res) => {
  try {
    const post = await Post.findById(req.params._id);
    res.set("Content-Type", "image/jpeg");
    res.status(200).send(post.file);
  } catch (err) {}
});

// update
router.put("/:_id", async (req, res) => {
  // check before querying*******************************

  try {
    const post = await Post.findById(req.params._id);
    if (post.userID === req.body.userID) {
      // update and no need to query again
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated.");
    } else {
      res.status(403).json("you can only update your post.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete
router.delete("/:_id", async (req, res) => {
  try {
    const post = await Post.findById(req.params._id);
    if (post.userID === req.body.userID) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted.");
    } else {
      res.status(403).json("you can only delete your post.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// like love hate
router.put("/:_id/:type", async (req, res) => {
  let { _id, type } = req.params;
  try {
    const post = await Post.findById(_id);
    if (type === "likes" && !post.goods.likes.includes(req.body.userID)) {
      await post.updateOne({ $push: { "goods.likes": req.body.userID } });
      await post.updateOne({ $pull: { "goods.loves": req.body.userID } });
      await post.updateOne({ $pull: { "goods.hates": req.body.userID } });
      res.status(200).json("the post has been liked.");
    } else if (type === "likes" && post.goods.likes.includes(req.body.userID)) {
      await post.updateOne({ $pull: { "goods.likes": req.body.userID } });
      res.status(200).json("the post like has been cancelled.");
    }

    if (type === "loves" && !post.goods.loves.includes(req.body.userID)) {
      await post.updateOne({ $pull: { "goods.likes": req.body.userID } });
      await post.updateOne({ $push: { "goods.loves": req.body.userID } });
      await post.updateOne({ $pull: { "goods.hates": req.body.userID } });
      res.status(200).json("the post has been loved.");
    } else if (type === "loves" && post.goods.loves.includes(req.body.userID)) {
      await post.updateOne({ $pull: { "goods.loves": req.body.userID } });
      res.status(200).json("the post love has been cancelled.");
    }

    if (type === "hates" && !post.goods.hates.includes(req.body.userID)) {
      await post.updateOne({ $pull: { "goods.likes": req.body.userID } });
      await post.updateOne({ $pull: { "goods.loves": req.body.userID } });
      await post.updateOne({ $push: { "goods.hates": req.body.userID } });
      res.status(200).json("the post has been hated.");
    } else if (type === "hates" && post.goods.hates.includes(req.body.userID)) {
      await post.updateOne({ $pull: { "goods.hates": req.body.userID } });
      res.status(200).json("the post hate has been cancelled.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// get an article
router.get("/:_id", async (req, res) => {
  try {
    const post = await Post.findById(req.params._id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get all personal and followings' articles
router.get("/articals/all/:userID", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userID);
    const userPosts = await Post.find({ userID: currentUser._id });
    // *** solve iterable promises
    const friendsPosts = await Promise.all(
      // iterable promises
      currentUser.followings.map((item) => {
        // return an array, but need time
        return Post.find({ userID: item });
      })
    );
    // **concat solve element in array once, ... solve twice
    res.status(200).json(userPosts.concat(...friendsPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all personal's articles
router.get("/articals/personal/:username", async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.params.username });
    const userPosts = await Post.find({ userID: foundUser._id });
    res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
