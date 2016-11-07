var moment = require('moment');
var weather = require('../services/weather');
var winston = require('winston');

const areaTimeMap = {};

function pastFiveMins (app) {
  if (!app.locals.weather) return true;

  var lastCall = moment.unix(app.locals.weather.timestamp);
  return moment().diff(lastCall, 'minutes') >= 5;
}

function renderIndex (req, res) {
  res.render('index');
}

function getForecast (app, req, res) {
  winston.info(moment().format('h:mm:ss a'),'client request');

  if (pastFiveMins(app)){
    weather.get(app, function (data) {
      app.locals.weather = data;
      res.send(data);
    });
  } else {
    res.send(app.locals.weather);
  }
}

function getAreaForecast (app, req, res) {
  winston.info(moment().format('h:mm:ss a'),'client area request');

  let latitude = req.params.lat;
  let longitude = req.params.long;
  let inMap = app.locals[`${latitude}${longitude}`];

  if(inMap && pastFiveMins(inMap)) {
    weather.getArea(app, latitude, longitude, (data) => {

    });
  }

  if (pastFiveMins(app)){
    weather.get(app, function (data) {
      app.locals.weather = data;
      res.send(data);
    });
  } else {
    res.send(app.locals.weather);
  }
}

function pick (app, req, res) {
  console.log('params', req.url);
  var query = req.query.slice(req.query.indexOf('?'))

  return getAreaForecast(app, req, res);
}

function routes (app) {
  app.get('/', renderIndex);
  app.get('/get/forecast', pick.bind(null, app));
  app.get('/get/areaforecast', getAreaForecast.bind(null, app));
};

module.exports = routes;
