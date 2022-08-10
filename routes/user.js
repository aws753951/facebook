const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("111");
});

module.exports = router;
