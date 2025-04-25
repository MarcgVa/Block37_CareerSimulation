const router = require("express").Router();
const { getAllItems, getItem, getItemReviews } = require("./itemsController");

router.get("/items", getAllItems);
router.get("/items/:itemId", getItem);
router.get("/items/:itemId/reviews", getItemReviews);

module.exports = router;
