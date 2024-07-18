import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-oui-icons';

const CalendarNavButton = ({ type }) => {
  const title = type === 'previous' ? 'Previous Month' : 'Next Month';
  const style = type === 'previous' ? { left: '10px' } : { right: '10px' };
  const icon = type === 'previous' ? <Icon name="arrow-left"/> : <Icon name="arrow-right"/>;
  return (
    <button
      title={ title }
      style={{
        backgroundColor: '#fff',
        color: '#484848',
        fontSize: 24,
        padding: '5px',
        position: 'absolute',
        top: '15px',
        border: 'none',
        ...style,
      }}>
      {icon}
    </button>
  );
};

CalendarNavButton.propTypes = {
  type: PropTypes.oneOf(['previous', 'next']),
};

export default CalendarNavButton;
