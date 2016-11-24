import React, { PropTypes } from 'react';

const WeatherIcon = ({ icon }) => {
  function color (icon) {
    let iconMatch = {
      "clear-day": "rgb(226, 226, 76)",
      "clear-night": "rgb(116, 59, 202)",
      "rain": "rgb(92, 148, 162)",
      "snow": "rgb(93, 164, 230)",
      "sleet": "rgb(28, 113, 192)",
      "wind": "rgb(150, 204, 255)",
      "fog": "rgb(87, 94, 109)",
      "cloudy": "rgb(77, 80, 71)",
      "partly-cloudy-day": "rgb(111, 114, 104)",
      "partly-cloudy-night": "rgb(63, 48, 62)",
      "hail": "rgb(235, 19, 62)",
      "thunderstorm": "rgb(235, 19, 62)",
      "tornado": "rgb(235, 19, 62)"
    };
    return { color: iconMatch[icon] };
  }


  function upCase( string ){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return <span id="icon" style={color(icon)}>{upCase(icon)}</span>;
}

WeatherIcon.propTypes = { icon: PropTypes.string.isRequired };

export default WeatherIcon;
