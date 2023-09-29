const express = require("express");
const { postUser, signIn, signOut, userList, userById, userDetails, requireSignin } = require("../controller/user");
const router = express.Router();

router.post("/post", postUser);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/list", userList);
router.get("/detail/:userId", requireSignin, userDetails);

router.param("userId", userById);
module.exports = router;
