const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const jwt = require('express-jwt');

// Configure our environment variables
dotenv.config();

const publicPaths = require('./controller/publicPaths');
const api = require('./controller/index');

const app = express();

// Initialize our DB
require('./model/index').initialize();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Allow cross origin requests in dev
if (process.env.NODE_ENV === 'development') {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });
}

app.use(express.static(path.join(__dirname, 'public')));

// Setup authenticated API paths
app.use('/api', jwt({
  secret: process.env.JWT_SECRET || 'd3f@u1t%2053cr3t'
}).unless({
  path: publicPaths
}))

// First handle an API path
app.use('/api', api);
// All other requests go to index.html
app.use('*', express.static(path.join(__dirname, 'public', 'index.html')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Log the error
  console.error(err);

  // Send an error response
  res.status(err.status || 500);
  res.send({ error: 'Server Error' });
});

module.exports = app;
