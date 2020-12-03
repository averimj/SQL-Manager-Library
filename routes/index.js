const express = require('express');
const router = express.Router();
// const Book = require('../models').Book;

/* GET home page. */
// router.get('/', async(req, res, next) => {
//   const books = await Book.findAll();
//   res.json(books);
// });

router.get('/', (req, res, next) => {
  res.redirect('/books');
});


module.exports = router;
