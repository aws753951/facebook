const mongoose = require("mongoose");

const Conversationschema = new mongoose.Schema(
  {
    members: { type: Array },
  },
  //   doc time, need change
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", Conversationschema);
