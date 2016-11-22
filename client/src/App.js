import React, { Component } from 'react';
import axios from 'axios';
import './index.css';


import DateTime from './Components/DateTime';
import Weather from './Components/Weather';
import DarkSky from './Components/DarkSky';

import Trice from 'trice';

class App extends Component {
  constructor() {
    super();

    this.state = {
      weaterTimer: null,
      dateTimer: null,
      weather: null,
      date: '...',
      time: '...',
    };

    this.setWeather = this.setWeather.bind(this);
    this.setTime = this.setTime.bind(this);
  }

  componentDidMount() {
    this.setTime();
    this.setWeather();

    let dateTimer = setInterval(this.setTime, 5 * 1000);
    let weatherTimer = setInterval(this.setWeather, 3 * 60 * 1000);

    this.setState({ weatherTimer, dateTimer });
  }

  componentWillUnmount() {
    clearInterval(this.state.weatherTimer);
    clearInterval(this.state.dateTimer);
  }

  setWeather() {
    let query = '/get/forecast';
    query = Boolean(location.search) ? query + location.search : query;

    axios.get(query)
      .then(response => this.setState({ weather: response.data }))
      .catch(err => console.log(err));
  }

  setTime() {
    let trice = new Trice()

    let date  = trice.getDate()
    let time  = trice.getTime()

    this.setState({ date, time })
  }


  render() {
    let weather = this.state.weather ?
      <Weather weather={this.state.weather} /> :
      <p> ... </p>;

    return (
      <div>
        <DateTime date={this.state.date} time={this.state.time} />
        {weather}
        <DarkSky />
      </div>
    );
  }
}

export default App;
