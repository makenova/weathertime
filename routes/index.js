const moment = require('moment');
const weather = require('../services/weather');

function pastFiveMins (timestamp) {
  const lastCall = moment.unix(timestamp);
  console.log(`lastcall was ${moment().diff(lastCall, 'minutes')} mins ago`)
  return moment().diff(lastCall, 'minutes') >= 5;
}

function getForecast (app, req, res, next) {
  console.log(moment().format('h:mm:ss a'),'client area request');

  const latitude = req.query.lat || '35.4381759';
  const longitude = req.query.long || '-97.4529094';
  const areaKey = `${latitude},${longitude}`;
  let inMap = app.locals.areaMap[areaKey];
  // console.log('locals', app.locals)

  if (!inMap) {
    console.log(moment().format('h:mm:ss a'), 'respond with new request')
    weather.get(app, latitude, longitude, (err, data) => {
      if (err) return next(err);
      app.locals.areaMap[areaKey] = data;
      res.send(data);
    });
  } else if (inMap && pastFiveMins(inMap.timestamp)) {
    console.log(moment().format('h:mm:ss a'), 'time elapsed, respond with fresh request')
    weather.get(app, latitude, longitude, (err, data) => {
      if (err) return next(err);
      app.locals.areaMap[areaKey] = data;
      res.send(data);
    });
  } else {
    // in the map and not past time
    console.log(moment().format('h:mm:ss a'), 'respond from locals')
    res.send(app.locals.areaMap[areaKey]);
  }
}

function routes (app) {
  app.locals.areaMap = {}; //initialize areaMap
  app.get('/', (req, res) => res.sendFile(require('path').join(__dirname, '..', 'public', 'dist', 'index.html')));
  app.get('/get/forecast', getForecast.bind(null, app));
  app.get('*', (req, res, next) => {
    err.status = 404;
    return next(err);
  });
};

module.exports = routes;
