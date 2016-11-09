import React, { PropTypes } from 'react';

const DateTime = ({ date, time }) =>
  <div>
    <p>{date}</p>
    <p>{time}</p>
  </div>;

DateTime.propTypes = {
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default DateTime;
