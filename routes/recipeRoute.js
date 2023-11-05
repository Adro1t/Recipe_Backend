const express = require("express");
const { postRecipe } = require("../controller/recipe");
const router = express.Router();

router.post("/post", postRecipe);

module.exports = router;
