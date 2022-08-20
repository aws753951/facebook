const router = require("express").Router();
const Message = require("../models/Message");

// add messages

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    console.log(err);
  }
});

// get message

router.get("/:conversationID", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationID: req.params.conversationID,
    });
    // response every message in array
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
