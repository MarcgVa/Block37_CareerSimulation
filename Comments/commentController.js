const { prisma, bcrypt, jwt } = require("../common/common");

const createComment = async (req, res, next) => {
 
  const token = req.headers?.authorization.split(" ")[1];
  const userId = jwt.verify(token, process.env.JWT_SECRET);

  const comment = await prisma.comment.create({
    data: {
      title: req.body.title,
      authorId: userId,
      reviewId: req.params.reviewId,
    },
  });
  if (comment) { 
    res.send(comment);
  } else {
    res.send('Unable to post comment');
  }  
};

const getMyComments = async (req, res, next) => {
  const token = req.headers?.authorization.split(" ")[1];
  const id = jwt.verify(token, process.env.JWT_SECRET);

  const comments = await prisma.comment.findMany({
    where: {
      authorId: { equals: id, }
    },
  });

  res.send(comments);
};
const updateComment = async (req, res, next) => {
   const token = req.headers?.authorization.split(" ")[1];
   const id = jwt.verify(token, process.env.JWT_SECRET);

  if (req.params.userId === id) {
    const comment = await prisma.comment.update({
      where: {
        id: req.params.commentId,
      },
      data: {
        title: req.body.title,
      }
    });

    if (comment) {
      res.send(comment);
    } else {
      res.send('Unable to update comment');
    }
  } else { 
    res.send('Not Authorized');
  }
};

const deleteComment = async (req, res, next) => {
  
};
const deleteReview = async (req, res, next) => {
  
};

module.exports = {
  createComment,
  getMyComments,
  updateComment,
  deleteComment,
  deleteReview,
};
