require('dotenv').config();
const router = require("express").Router();
const { jwt } = require('../common/common');
const { login, register, getUser } = require('./authController');


function middleware(req, res, next) {
  const token = req.headers?.authorization?.split(' ')[1]
  if (token) {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = id;
    next();
  } else { 
    res.send("Please log in again");
  }
}

router.post('/login', login);
router.post('/register', register);
router.get('/me', middleware, getUser);

module.exports = router;