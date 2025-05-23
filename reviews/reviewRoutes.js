const { router } = require("../common/common");
require("dotenv").config();
const { prisma, bcrypt, jwt } = require("../common/common");
const JWT_SECRET = process.env.JWT_SECRET;

// check if user is logged in
const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.slice(7);
  try {
    const id = jwt.verify(token, JWT_SECRET);
    req.userId = id;
    next();
  } catch (error) {
    return res.status(401).send("You must be logged in to do that.");
  }
};

// updates the average rating of an item
const updateAvgRating = async (itemId) => {
  const averageRating = await prisma.review.aggregate({
    where: { itemId },
    _avg: { rating: true },
  });
  
  await prisma.item.update({
    where: { id: itemId },
    data: { avg_rating: averageRating._avg.rating },
  });
}

// get all reviews of an item
router.get("/items/:itemId/reviews", async (req, res, next) => {
  try {
    const itemId = req.params.itemId;
    const response = await prisma.review.findMany({
      where: {
        itemId,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

// get a specific review
router.get("/items/:itemId/reviews/:reviewId", async (req, res, next) => {
  try {
    const id = req.params.reviewId;
    const itemId = req.params.itemId;

    const response = await prisma.review.findFirstOrThrow({
      where: {
        id,
        itemId,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send("that review does not exist");
  }
});

// get all reviews of a user
router.get("/reviews/me", isLoggedIn, async (req, res, next) => {
  try {
    const authorId = req.userId;

    const response = await prisma.review.findMany({
      where: {
        authorId,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

// post a review of an item
router.post("/items/:itemId/reviews", isLoggedIn, async (req, res, next) => {
  try {
    const title = req.body.title;
    const rating = parseInt(req.body.rating);
    const authorId = req.userId;
    const itemId = req.params.itemId;

    const response = await prisma.review.create({
      data: {
        title,
        rating,
        authorId,
        itemId,
      },
    });

    // update the average rating of the item
    updateAvgRating(itemId);
    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
});

// update a review of an item
router.put(
  "/users/:userId/reviews/:reviewId",
  isLoggedIn,
  async (req, res, next) => {
    // check if user has permissions to update this review
    if (req.params.userId !== req.userId) {
      return res
        .status(500)
        .send("You can only change a review that you made!");
    }

    try {
      const title = req.body.title;
      const rating = parseInt(req.body.rating);
      const authorId = req.params.userId;
      const id = req.params.reviewId;

      const response = await prisma.review.update({
        where: {
          id,
          authorId,
        },
        data: {
          title,
          rating,
        },
      });

      // update the average rating of the item
      const item = await prisma.review.findFirst({
        where: { id },
        select: { itemId: true }
      })
      const itemId = item?.itemId;
      updateAvgRating(itemId);

      res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  }
);

// delete a review
router.delete(
  "/users/:userId/reviews/:reviewId",
  isLoggedIn,
  async (req, res, next) => {
    // check if user has permissions to delete this review
    if (req.params.userId !== req.userId) {
      return res
        .status(500)
        .send("You can only delete a review that you made!");
    }

    try {
      const id = req.params.reviewId;
      const authorId = req.params.userId;

      const item = await prisma.review.findFirst({
        where: { id },
        select: { itemId: true }
      })
      const itemId = item?.itemId;

      const response = await prisma.review.delete({
        where: {
          id,
          authorId,
        },
      });

      // update the average rating of the item
      updateAvgRating(itemId);

      res.sendStatus(204);
    } catch (error) {
      res.status(404).send("that review does not exist");
    }
  }
);

module.exports = router;
