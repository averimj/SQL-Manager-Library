const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

// Handler functio to wrap each routes
function asyncHandler(cb){
  return async(req,res,next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      // forward error to the global error Handler
      next(error);
    }
  }
}

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  const books = await Book.findAll();
  res.json(books);
}));


module.exports = router;
