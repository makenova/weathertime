import React, { PropTypes } from 'react';

import WeatherIcon from './WeatherIcon';

const Weather = ({ weather }) =>
  <div id="weather">
    <div>
      <WeatherIcon icon={weather.icon} /> : {weather.temperature || "80"} °F
    </div>
    <div>Feels Like : {weather.feelsLike || "82"} °F</div>
  </div>;

Weather.propTypes = {
  weather: PropTypes.object.isRequired,
}

export default Weather;
