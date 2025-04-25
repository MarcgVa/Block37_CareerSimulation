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
    const item = await prisma.item.findUnique({
      where: {
        id: itemId
      },
    });
    res.json(item);
  } catch (error) {
    res.status(500).send("Error on server side");
  }
};

const getItemReviews = async (req, res) => {};

module.exports = {
  getAllItems,
  getItem,
  getItemReviews,
}; 
