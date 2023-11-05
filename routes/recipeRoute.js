const express = require("express");
const { postRecipe, recipeList } = require("../controller/recipe");
const { recipeValidation } = require("../validation");
const router = express.Router();

router.post("/post", recipeValidation, postRecipe);
router.get("/list", recipeList);

module.exports = router;
