var path = require('path');
var express = require('express');
var app = express();

var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var errorHandler = require('errorhandler');
var logger = require('morgan');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

require('./routes')(app);

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
  app.use(logger('dev'));
}

app.listen(app.get('port'), function(){
  console.log(`Express server listening on port ${app.get('port')}`);
  console.log(`NODE_ENV: ${app.get('env')}`);
});
