'use strict'

var request = require('request');
var moment = require('moment');
var config = require('../config');
var winston = require('winston');

const API_KEY = process.env.DARK_SKY_API_KEY;
const DARKSKYURL = 'https://api.darksky.net/forecast/';
const APIURL = `${DARKSKYURL}${API_KEY}/${config.latitude},${config.longitude}`;

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
  callback(formatApiResponse(data));
}

function weatherRequest(callback) {
  request(APIURL, function(err, res, body){
console.log(APIURL);
    winston.info(moment().format('h:mm:ss a'), 'forecastIO request');

    if (err || res.statusCode != 200)
      return callback(err);

    if (!err && res.statusCode == 200)
      return callback(formatApiResponse(body));
  });
}

function getWeather(app, callback){
  if (app.get('env') === 'development')
    fakeWeatherRequest(callback);
  else
    weatherRequest(callback);
}

function getAreaWeather(app, lat, long, callback) {
console.log('getAreaWeather')
  return getWeather(app, callback);
}

module.exports.get = getWeather;
module.exports.getArea = getAreaWeather;
