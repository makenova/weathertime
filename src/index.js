import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import DateTime from './Components/DateTime';
import Weather from './Components/Weather';

class App extends Component {
  render() {
    return (
      <div>
        <DateTime />
        <Weather />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
