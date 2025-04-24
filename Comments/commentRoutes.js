const router = require("express").Router();
const {
  createComment,
  getMyComments,
  updateComment,
  deleteComment,
  deleteReview
} = require("./commentController");

function middleware(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    next();
  } else {
    res.send("Please log in again");
  }
}

router.post("/items/:itemId/reviews/:reviewId/comments",middleware, createComment);
router.get("/comments/me", middleware, getMyComments);
router.put("/users/:userId/comments/:commentId", updateComment);
router.delete('/users/:userId/comments/:commentId', deleteComment);
router.delete('/users/:userId/reviews/:reviewId', deleteReview);

module.exports = router;
