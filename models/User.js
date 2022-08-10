const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      maxLength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
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
    desc: {
      type: String,
      maxLength: 200,
    },
    city: {
      type: String,
      maxLength: 50,
    },
    from: {
      type: String,
      maxLength: 50,
    },
    relationship: {
      type: String,
      enum: ["single", "married", "complex"],
    },
  },
  //   doc time, need change
  { timestamps: true }
);

module.exports = mongoose.model("User", userschema);
