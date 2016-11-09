import React, { PropTypes } from 'react';

import WeatherIcon from './WeatherIcon';

const Weather = ({ weather }) =>
  <div>
    <div>
      <WeatherIcon icon={weather.icon} />: {weather.temperature || "80"}
    </div>
    <div>Feels Like: {weather.feelsLike || "82"}</div>
  </div>;

Weather.propTypes = {
  weather: PropTypes.object.isRequired,
}

export default Weather;
