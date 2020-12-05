const express = require('express');
const router = express.Router();
const { sequelize, Book } = require('../models');
// const Book = require('../models').Book;

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
  res.render('index', {books, title: 'Library Books'});
}));

/* Create a new book form */
router.get('/new', (req,res) => {
  res.render('new_book', { book: {}, title: 'New Book' });
});

/* POST a newly created book */
router.post('/new', asyncHandler(async(req, res) => {
  const book = await Book.create(req.body);
  res.redirect('/books');
}));

/* GET a single book */
router.get('/:id', asyncHandler(async(req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    res.render('update_book', { book, title: book.title})
  } else {
    res.status(404).render('page-not-found');
  }
}));

module.exports = router;
