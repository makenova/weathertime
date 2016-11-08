var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

require('./routes')(app);

// development only
if ('development' == app.get('env')) {
  app.use(logger('dev'));
  app.use(errorHandler());
  app.use(logger('dev'));
}

console.log(`NODE_ENV: ${app.get('env')}`);

module.exports = app;
