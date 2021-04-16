const express = require("express");

const router = express.Router();

router.get("/sign-in", (req, res) => {
  res.send("It works");
});

module.exports = router;
