const express = require("express");
const {
  postRecipe,
  recipeList,
  recipeById,
  recipeDetails,
  deleteRecipe,
  updateRecipe,
} = require("../controller/recipe");
const { recipeValidation } = require("../validation");
const upload = require("../middleware/file-upload");
const router = express.Router();

router.post("/post", upload.single("image"), recipeValidation, postRecipe);
router.get("/list", recipeList);
router.get("/detail/:recipeId", recipeDetails);
router.delete("/delete/:recipeId", deleteRecipe);
router.put("/update/:recipeId", recipeValidation, updateRecipe);

router.param("recipeId", recipeById);
module.exports = router;
