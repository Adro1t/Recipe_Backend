const express = require("express");
const {
  helloController,
  postCategory,
  getCategoryList,
  getSingleCategory,
  getCategoryDetail,
} = require("../controller/category");
const router = express.Router();

router.get("/", helloController);
router.post("/postcategory", postCategory);
router.get("/categorylist", getCategoryList);
router.get("/categorydetail/:categoryId", getCategoryDetail);

//to get single category value in param
router.param("categoryId", getSingleCategory);

module.exports = router;
