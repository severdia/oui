/* eslint-disable react/jsx-key */
import React from 'react';
import Textarea from '../index';

const mockFunction = () => {};

export default [
  {
    examples: [
      <Textarea
        placeholder="Enter a comment…"
      />,
    ],
  },
  {
    examples: [
      <Textarea
        isDisabled={ true }
        defaultValue="This textarea is disabled."
      />,
    ],
  },
  {
    examples: [
      /* eslint-disable no-console */
      <Textarea
        defaultValue="This textarea has many event listeners."
        onBlur={ mockFunction }
        onChange={ mockFunction }
        onFocus={ mockFunction }
        onInput={ mockFunction }
        onKeyDown={ mockFunction }
      />,
    /* eslint-enable no-console */
    ],
  },
  {
    examples: [
      <Textarea
        focus={ true }
        placeholder="This text area is auto focused."
      />,
    ],
  },
];
