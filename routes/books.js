const express = require('express');
const router = express.Router();
// const { sequelize, Book } = require('../models');
const Book = require('../models').Book;

// Handler function to wrap each route
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

/* GET books listing. */
router.get('/', asyncHandler(async(req, res, next) => {
  const books = await Book.findAll();
  res.render('index', {books, title: 'I got this!'});
}));




module.exports = router;
