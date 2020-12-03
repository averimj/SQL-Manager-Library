const express = require('express');
const router = express.Router();

// not sure if I need both nor which syntax is most up-to-date AND I have in index.js
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

/* GET users listing. */
router.get('/', asyncHandler(async(req, res, next) => {
  const books = await Book.findAll();
  res.send('respond with a resource');
}));

// error message WIP //
// router.get('/error', (reg, res, next) => {
//   console.log('Custom error route called');
//
//   const err = new Error();
//   err.message = 'Custom 500 error thrown'
//   err.status = 500;
//   throw err;
// });


module.exports = router;
