const Recipe = require("../model/recipeModel");
//post recipe
exports.postRecipe = async (req, res) => {
  try {
    let recipe = new Recipe({
      recipe_name: req.body.recipe_name,
      description: req.body.description,
      prep_time: req.body.prep_time,
      cook_time: req.body.cook_time,
      instructions: req.body.instructions,
      image: req.body.image,
      category: req.body.category,
      owner: req.body.owner,
    });
    await recipe.save();
    res.json({ recipe });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//display all recipes
exports.recipeList = async (req, res) => {
  try {
    let recipes = await Recipe.find();
    res.json({ recipes });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
