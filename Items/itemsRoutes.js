const router = require("express").Router();
const {
  getAllItems,
  getItem,
  getItemReviews,
} = require("./itemsController");



router.get("/items", middleware, getAllItems);
router.get("/items/:itemId", middleware, getItem);
router.get("/items/:itemId/reviews", middleware, getItemReviews);

module.exports = router;