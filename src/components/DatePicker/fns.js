import React from 'react';
import moment from 'moment';

export const getDateString = (date) => {
  return (date && moment.isMoment(date) && date.format('MMM DD, YYYY')) || '';
};

export const getAvailableStartDatePhrase = ({ date }) => `Choose ${date} as your start date.`;
export const getAvailableEndDatePhrase = ({ date }) => `Choose ${date} as your end date.`;

// eslint-disable-next-line react/prop-types
export const getCustomMonthElement = ({ month }) => (
  <p className="oui-date-picker__month-title">
    { month.format('MMMM') } { month.year() }
  </p>
);
