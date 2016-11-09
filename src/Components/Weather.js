import React, { Component } from 'react';

import WeatherIcon from './WeatherIcon';

export default class Weather extends Component {
  render() {
    return (
      <div>
        <div>
          <WeatherIcon />: {this.props.temp || "80"}
        </div>
        <div>Feels Like: {this.props.feelsLike || "82"}</div>
      </div>
    );
  }
}
