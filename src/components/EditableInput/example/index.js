/* eslint-disable react/jsx-key */
import React from 'react';
import EditableInput from '../index';

export default [
  {
    examples: [
      <EditableInput
        label="Field label"
        placeholder="Just a placeholder"
        type="text"
        isOptional={ true }
      />,
    ],
  },
  {
    examples: [
      <EditableInput
        label="Field label with error"
        displayError={ true }
        placeholder="Just a placeholder"
        type="text"
        isEditing={ true }
      />,
    ],
  },
];
