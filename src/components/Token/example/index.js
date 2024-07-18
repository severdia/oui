/* eslint-disable react/jsx-key */
import React from 'react';
import Token from '../index';

const mockFunction = () => {};

export default [
  {
    examples: [
      <Token
        name="Duck"
        testSection="token-test"
      />,
      <Token
        name="Duck"
        style="primary"
      />,
      <Token
        name="Goose"
        style="primary"
        testSection="goose"
        isDismissible={ true }
        onDismiss={ mockFunction }
      />,
    ],
  },
  {
    examples: [
      <Token
        name="Duck Duck Goose"
        description="A popular childhood game."
        isDismissible={ true }
        isDraggable={ true }
        style="primary"
        order={ 1 }
        onDismiss={ mockFunction }
      />,
    ],
  },
];
