const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
  // create new user
  const newUser = new User(req.body);

  // save user and response
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
router.post("/login", async (req, res) => {
  let { username, email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    // check email
    if (!foundUser) {
      res.status(400).json("User or password wrong");
    } else {
      // check password
      const checkPassword = await bcrypt.compare(password, foundUser.password);
      !checkPassword
        ? res.status(400).json("User or password wrong")
        : res.status(200).json(foundUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
