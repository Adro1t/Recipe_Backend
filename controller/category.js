const Category = require("../model/categoryModel");

exports.helloController = (req, res) => {
  res.send("hello from category controller");
};

//to insert
exports.postCategory = (req, res) => {
  const category = new Category(req.body);
  category
    .save()
    .then((savedCategory) => {
      res.json({ category: savedCategory });
    })
    .catch((error) => {
      res.status(400).json({ error: "failed to insert category" });
    });
};

//to fetch
exports.getCategoryList = (req, res) => {
  Category.find()
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => {
      res.status(400).json({ error: "failed to fetch" });
    });
};

//single category by id
exports.getSingleCategory = (req, res, next, id) => {
  Category.findById(id)
    .then((category) => {
      req.category = category;
      next();
    })
    .catch((error) => {
      res.status(400).json({ error: "failed to find category" });
    });
};

//to fetch categpry data related to single id
exports.getCategoryDetail = (req, res) => {
  res.json(req.category);
};
