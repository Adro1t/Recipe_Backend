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
      image: req.file.path,
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

//finding recipe by id
exports.recipeById = async (req, res, next, id) => {
  try {
    let recipe = await Recipe.findById(id);
    req.recipe = recipe;
    next();
  } catch (error) {
    return res.status(400).json({ error: "recipe not found" });
  }
};

//single recipe
exports.recipeDetails = async (req, res) => {
  res.json(req.recipe);
};

//delete recipe
exports.deleteRecipe = async (req, res) => {
  try {
    let recipe = req.recipe;
    await recipe.deleteOne();
    res.json({ message: "recipe removed successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//edit/update recipe
exports.updateRecipe = async (req, res) => {
  try {
    let recipe = req.recipe;
    recipe.recipe_name = req.body.recipe_name;
    recipe.description = req.body.description;
    recipe.prep_time = req.body.prep_time;
    recipe.cook_time = req.body.cook_time;
    recipe.instructions = req.body.instructions;
    recipe.category = req.body.category;
    recipe.owner = req.body.owner;
    recipe.image = req.file.path;
    let updatedRecipe = await recipe.save();
    if (!updatedRecipe) {
      return res.status(400).json({ error: "failed to update recipe" });
    }
    res.json({ updatedRecipe });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
