const express = require("express");
const { postUser, signIn, signOut } = require("../controller/user");
const router = express.Router();

router.post("/post", postUser);
router.post("/signin", signIn);
router.post("/signout", signOut);

module.exports = router;
