const mongoose = require("mongoose");

const Messageschema = new mongoose.Schema(
  {
    conversationID: {
      type: String,
    },
    senderID: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  //   doc time, need change
  { timestamps: true }
);

module.exports = mongoose.model("Message", Messageschema);
