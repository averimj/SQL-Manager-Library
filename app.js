const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// import sequelize and the model
const { sequelize, Book } = require('./models');
const routes = require('./routes/index');
const books = require('./routes/books');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/books', books);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error();
  error.status === 404;
  error.message = 'Houston we have a 404 problem';

  // got from error handle video with the exception of { error }
  res.status(404).render('page-not-found', { error });
});

// error handler
app.use((err, req, res, next) => {

  // got from error handle video
  if (err.status === 404) {
    res.status(404).render('page-not-found', { error });
  } else {
    err.message = err.message || 'Houston, we have a problem with the server!'
    res.status(err.status || 500).render('error', { err });
  }
});


module.exports = app;
