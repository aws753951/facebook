const mongoose = require("mongoose");

const postschema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      maxLength: 5000,
    },
    img: {
      type: String,
      default: "",
    },
    goods: {
      likes: {
        type: Array,
        default: [],
      },
      loves: {
        type: Array,
        default: [],
      },
      hates: {
        type: Array,
        default: [],
      },
    },
  },
  //   doc time, need change
  { timestamps: true }
);

module.exports = mongoose.model("Post", postschema);
