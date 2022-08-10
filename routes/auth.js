const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;

// Register
router.post("/register", async (req, res) => {
  // check input before querying
  let { username, email, password } = req.body;
  const { error } = registerValidation({ username, email, password });
  if (error) return res.status(400).json(error.details[0].message);

  try {
    // check email
    const foundUser = await User.findOne({ email });
    if (foundUser) return res.status(400).json("email has been registered.");

    // hash password
    password = await bcrypt.hash(password, 12);

    // create new user
    const newUser = new User({ username, email, password });

    // save user and response
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
router.post("/login", async (req, res) => {
  // check input before querying
  let { email, password } = req.body;
  const { error } = loginValidation({ email, password });
  if (error) return res.status(400).json(error.details[0].message);

  try {
    // check email
    const foundUser = await User.findOne({ email });
    if (!foundUser) return res.status(400).json("User or password wrong");

    // check password
    const checkPassword = await bcrypt.compare(password, foundUser.password);
    !checkPassword
      ? res.status(400).json("User or password wrong")
      : res.status(200).json(foundUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
