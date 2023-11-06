const express = require("express");
const { postRecipe, recipeList, recipeById, recipeDetails, deleteRecipe } = require("../controller/recipe");
const { recipeValidation } = require("../validation");
const router = express.Router();

router.post("/post", recipeValidation, postRecipe);
router.get("/list", recipeList);
router.get("/detail/:recipeId", recipeDetails);
router.delete("/delete/:recipeId", deleteRecipe);

router.param("recipeId", recipeById);
module.exports = router;
