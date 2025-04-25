const { prisma } = require("../../common/common");

const getAllItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).send("Error on server side");
  }
};

const getItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    console.log("routes retrieved");
    const item = await prisma.item.findFirst({
      where: {
        id: itemId,
      },
    });
    res.json(item);
  } catch (error) {
    res.status(500).send("Error on server side");
  }
};

const getItemReviews = async (req, res) => {
  const { itemId } = req.params;
  try {
    const reviews = await prisma.review.findMany({
      where: {
        itemId: { equals: itemId },
      },
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).send("Error on server side");
  }
};

module.exports = {
  getAllItems,
  getItem,
  getItemReviews,
};
