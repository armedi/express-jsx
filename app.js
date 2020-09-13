const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const app = express();

app.enable('trust proxy');

app.set('views', './views');
app.set('view engine', 'jsx');
app.engine('jsx', require('./viewEngine'));

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.render('home', { ip: req.ip });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
