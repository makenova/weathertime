var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client', 'build')));

require('./routes')(app);

// development only
if ('development' == app.get('env')) {
  app.use(logger('dev'));
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error');
  });
}

console.log(`NODE_ENV: ${app.get('env')}`);

module.exports = app;
