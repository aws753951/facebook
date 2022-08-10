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

module.exports = router;
