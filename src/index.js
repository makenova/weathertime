import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import DateTime from './Components/DateTime';
import Weather from './Components/Weather';

class App extends Component {
  constructor() {
    super();

    this.state = { weather: null };
  }

  componentDidMount() {
    let query = '/get/forecast';
    query = Boolean(location.search) ? query + location.search : query;
    console.log('query', query);

    axios.get(query)
      .then(response => {
        console.log('local response', response.data);
        this.setState({ weather: response });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <DateTime />
        <Weather weather={this.state.weather} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
