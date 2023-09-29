const express = require("express");
const { postUser, signIn } = require("../controller/user");
const router = express.Router();

router.post("/post", postUser);
router.post("/signin", signIn);

module.exports = router;
