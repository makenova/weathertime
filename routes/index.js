var moment = require('moment');
var weather = require('../services/weather');
var winston = require('winston');

function pastFiveMins (app, timestamp) {
  if (!app.locals.weather) return true;
  timestamp = timestamp ? timestamp : app.locals.weather.timestamp
  var lastCall = moment.unix(timestamp);
  return moment().diff(lastCall, 'minutes') >= 5;
}

function renderIndex (req, res) {
  res.render('index');
}

function getForecast (app, req, res, next) {
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

function getAreaForecast (app, req, res, next) {
  winston.info(moment().format('h:mm:ss a'),'client area request');

  let latitude = req.query.lat;
  let longitude = req.query.long;
console.log('locals', app.locals)
  let areaKey = `${latitude},${longitude}`;
  let inMap = app.locals.areaMap[areaKey];

  if(!inMap) {
    weather.getArea(app, latitude, longitude, (data) => {
      winston.info('respond with new request')
      app.locals.areaMap[areaKey] = data;
      res.send(data);
    });
  }else if (inMap && pastFiveMins(app, inMap.timestamp)) {
    winston.info('time elapsed, respond with fresh request')
    weather.getArea(app, latitude, longitude, (data) => {
      app.locals.areaMap[areaKey] = data;
      res.send(data);
    });
  } else {
    // in the map and not past time
    winston.info('respond from locals')
    res.send(app.locals.areaMap[areaKey]);
  }
}

function pickWeatherFunction (app, req, res, next) {
  let { lat, long } = req.query;

  return (lat && long)
    ? getAreaForecast(app, req, res, next)
    : getForecast(app, req, res, next)
}

function routes (app) {
  console.log('init areaMap')
  app.locals.areaMap = {}; //initialize areaMap
  app.get('/', renderIndex);
  app.get('/get/forecast', pickWeatherFunction.bind(null, app));
};

module.exports = routes;
