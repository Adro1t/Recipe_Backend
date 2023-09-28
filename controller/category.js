const Category = require("../model/categoryModel");

exports.helloController = (req, res) => {
  res.send("hello from category controller");
};

exports.postCategory = (req, res) => {
  const category = new Category(req.body);

  // category.save((error, category) => {
  //   if (error || !category) {
  //     res.status(400).json({ error: "failed to insert category" });
  //   }
  //   res.json({ category });
  // });

  category
    .save()
    .then((savedCategory) => {
      res.json({ category: savedCategory });
    })
    .catch((error) => {
      res.status(400).json({ error: "failed to insert category" });
    });
};
