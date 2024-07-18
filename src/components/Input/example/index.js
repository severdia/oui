/* eslint-disable react/jsx-key */
import React from 'react';
import Input from '../index';

const mockFunction = () => {};

export default [
  {
    examples: [
      <Input
        type="text"
        placeholder="This is a placeholder"
      />,
    ],
  },
  {
    examples: [
      <Input
        type="text"
        label="Test"
        displayError={ true }
        placeholder="This is a placeholder"
      />,
    ],
  },
  {
    examples: [
      <Input
        type="text"
        defaultValue="isReadOnly Example"
        label="Test"
        isReadOnly={ true }
      />,
    ],
  },
  {
    examples: [
      <Input
        type="text"
        placeholder="Browse by Name"
        isFilter={ true }
      />,
    ],
  },
  {
    examples: [
      <Input
        type="text"
        defaultValue="onChange Example"
        onChange={ mockFunction }
      />,
    ],
  },
  {
    examples: [
      <Input
        type="text"
        defaultValue="onBlur Example"
        onBlur={ mockFunction }
      />,
    ],
  },
  {
    examples: [
      <Input
        type="text"
        defaultValue="onKeyDown Example"
        onKeyDown={ mockFunction }
      />,
    ],
  },
  {
    examples: [
      <Input
        type="text"
        label="Label with Optional"
        isOptional={ true }
      />,
    ],
  },
  {
    examples: [
      <Input
        type="password"
        label="Password"
        testSection="input"
      />,
    ],
  },
  {
    examples: [
      <Input type="number" min={ 10 } max={ 50 } />,
    ],
  },
  {
    examples: [
      <Input type="number" textAlign="right" min={ 10 } max={ 50 } />,
    ],
  },
  {
    examples: [
      <Input type="date" />,
    ],
  },
];
