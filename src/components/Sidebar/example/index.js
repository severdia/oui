/* eslint-disable react/jsx-key */
import React from 'react';
import Sidebar from '../index';

export default [
  {
    examples: [
      <Sidebar
        anchor='left'
        docked={ true }
        isOpen={ true }
        width={ 300 }>
        <p>Sidebar content</p>
      </Sidebar>,
    ],
  },
];
