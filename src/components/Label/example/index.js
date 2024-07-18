/* eslint-disable react/jsx-key */
import React from 'react';
import Label from '../index';

export default [
  {
    examples: [
      <Label>I'm a Label</Label>,
    ],
  },
  {
    examples: [
      <Label isRequired={ true }>I'm a Required Label</Label>,
    ],
  },
  {
    examples: [
      <Label isOptional={ true }>I'm an Optional Label</Label>,
    ],
  },
  {
    examples: [
      <Label>
        <div>When I have nodes,</div>
        <div>I'm unstyled</div>
      </Label>,
    ],
  },
];
