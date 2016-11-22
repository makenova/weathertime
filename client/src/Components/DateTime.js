import React, { PropTypes } from 'react';

const DateTime = ({ date, time }) =>
  <div>
    <div id="date">{date}</div>
    <div id="time-row">
      <div id="time">{time}</div>
    </div>
  </div>;

DateTime.propTypes = {
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default DateTime;
