const express = require("express");
const { helloController } = require("../controller/category");
const router = express.Router();

router.get("/", helloController);

module.exports = router;
