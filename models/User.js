const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  //   doc time, need change
  { timestamps: true }
);

// hash password before save user
userschema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    let hashpassword = await bcrypt.hash(this.password, 12);
    this.password = hashpassword;
    next();
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userschema);
