const { validationResult, body } = require("express-validator");

exports.recipeValidation = [
  //name validation
  body("recipe_name").notEmpty().withMessage("Name is required"),
  //image validation
  body("image").notEmpty().withMessage("Image is required"),
  //description
  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isLength({
      min: 20,
    })
    .withMessage("description should be more than 20 characters"),
  //prep time
  body("prep_time")
    .notEmpty()
    .withMessage("preparation time is required")
    .isNumeric()
    .withMessage("time must be numeric value"),
  //cook time
  body("cook_time")
    .notEmpty()
    .withMessage("cooking time is required")
    .isNumeric()
    .withMessage("time must be numeric value"),
  //instructions
  body("instructions")
    .notEmpty()
    .withMessage("instructions are required")
    .isLength({
      min: 50,
    })
    .withMessage("instructions should be more than 50 characters"),
  //cateogry
  body("category").notEmpty().withMessage("Category is required"),
  //owner
  body("owner").notEmpty().withMessage("Owner is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const showError = errors.array().map((error) => error.msg)[0];
      return res.status(400).json({ error: showError });
    }
    next();
  },
];