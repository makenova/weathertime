import React, { Component } from 'react';

import DateDisplay from './DateDisplay';
import TimeDisplay from './TimeDisplay';

export default class Weather extends Component {
  render() {
    return (
      <div>
        <DateDisplay />
        <TimeDisplay />
      </div>
    );
  }
}
