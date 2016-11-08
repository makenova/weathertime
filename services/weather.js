var request = require('request');
var moment = require('moment');
var winston = require('winston');

const API_KEY = process.env.DARK_SKY_API_KEY;
const DARKSKYURL = 'https://api.darksky.net/forecast/';
const APIURL = `${DARKSKYURL}${API_KEY}`;

function formatApiResponse(response) {
  let data = JSON.parse(response)

  let weatherObj = {
    temperature: data.currently.temperature,
    feelsLike: data.currently.apparentTemperature,
    icon: data.currently.icon,
    timestamp: data.currently.time
  };

  return weatherObj;
}

function fakeWeatherRequest (callback) {
  let data = require('../sample');
  callback(null, formatApiResponse(data));
}

function weatherRequest(lat, long, callback) {
  let request_url = `${APIURL}/${lat},${long}`;

  request(request_url, (err, res, body) => {
    winston.info('request url:', request_url);

    if (err || res.statusCode != 200)
      return callback(err);

    if (!err && res.statusCode == 200)
      return callback(null, formatApiResponse(body));
  });
}

function getWeather(app, lat, long, callback) {
  if (app.get('env') === 'development')
    fakeWeatherRequest(callback);
  else
    weatherRequest(lat, long, callback);
}

module.exports.get = getWeather;
