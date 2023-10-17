const express = require("express");
const {
  postUser,
  signIn,
  signOut,
  userList,
  userById,
  userDetails,
  requireSignin,
  postConfirmation,
  resendVerificationEmail,
} = require("../controller/user");
const router = express.Router();

router.post("/post", postUser);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/list", userList);
router.get("/detail/:userId", requireSignin, userDetails);
router.post("/confirmation/:token", postConfirmation);
router.post("/resend/confirmation", resendVerificationEmail);

router.param("userId", userById);
module.exports = router;
