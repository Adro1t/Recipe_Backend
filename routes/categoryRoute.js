const express = require("express");
const { helloController, postCategory } = require("../controller/category");
const router = express.Router();

router.get("/", helloController);
router.post("/postcategory", postCategory);

module.exports = router;
