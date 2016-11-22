const moment = require('moment');
const debug = require('debug');
const info = debug('info');
const weather = require('../services/weather');

function pastFiveMins (timestamp) {
  const lastCall = moment.unix(timestamp);
  info(`lastcall was ${moment().diff(lastCall, 'minutes')} mins ago`)
  return moment().diff(lastCall, 'minutes') >= 5;
}

function getForecast (app, req, res, next) {
  info(moment().format('h:mm:ss a'),'client area request');

  const latitude = req.query.lat || '35.4381759';
  const longitude = req.query.long || '-97.4529094';
  const areaKey = `${latitude},${longitude}`;
  let inMap = app.locals.areaMap[areaKey];
  debug('extra')('locals', app.locals)

  if (!inMap) {
    info(moment().format('h:mm:ss a'), 'respond with new request')
    weather.get(app, latitude, longitude, (err, data) => {
      if (err) return next(err);
      app.locals.areaMap[areaKey] = data;
      res.send(data);
    });
  } else if (inMap && pastFiveMins(inMap.timestamp)) {
    info(moment().format('h:mm:ss a'), 'time elapsed, respond with fresh request')
    weather.get(app, latitude, longitude, (err, data) => {
      if (err) return next(err);
      app.locals.areaMap[areaKey] = data;
      res.send(data);
    });
  } else {
    // in the map and not past time
    info(moment().format('h:mm:ss a'), 'respond from locals')
    res.send(app.locals.areaMap[areaKey]);
  }
}

function routes (app) {
  app.locals.areaMap = {}; //initialize areaMap
  app.get('/', (req, res) => res.sendFile(require('path').join(__dirname, '..', 'client', 'build', 'index.html')));
  app.get('/get/forecast', getForecast.bind(null, app));
  app.get('*', (req, res, next) => {
    err.status = 404;
    return next(err);
  });
};

module.exports = routes;
