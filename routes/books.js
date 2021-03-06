const express = require('express');
const router = express.Router();
const { sequelize, Book } = require('../models');


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

/* POST a newly created book. */
router.post('/new', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect('/books')
  } catch (error) {
    if(error.name === 'SequelizeValidationError') {
      book = await Book.build(req.body);
      res.render('form-error', { book, errors: error.errors, title: 'Error' })
    } else {
      throw error;
    }
  }
}));

/* UPDATE a single book */
router.get('/:id', asyncHandler(async(req, res, next) => {
  const book = await Book.findByPk(req.params.id);
    if(book) {
      res.render('update_book', { book, title: book.title})
    } else {
      const error = new Error();
      error.status = 404;
      throw error;
    }
}));

/* POST an updated book. */
router.post('/:id', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if(book) {
      await book.update(req.body);
      res.redirect('/books');
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    if(err.name === 'SequelizeValidationError') {
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render('update_book', { book, errors: err.errors, title: 'Error' })
    } else {
      throw err;
    }
  }
}));

// /* Delete single book. */
router.post('/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect('/');
  } else {
    res.sendStatus(404);
  }
}));


module.exports = router;
