/* eslint-disable react/jsx-key */
import React from 'react';
import ProgressBar from '../index';

export default [
  {
    examples: [
      <ProgressBar
        max="100"
        min="0"
        progress="60"
        topLabel="hola esto es un label"
      />,
    ],
  },
  {
    examples: [
      <ProgressBar
        max="80"
        min="0"
        progress="20"
      />,
    ],
  },
  {
    examples: [
      <ProgressBar
        leftLabel="Allocated traffic"
        max="250"
        min="0"
        progress="90"
        rightLabel="Available traffic"
      />,
    ],
  },
  {
    examples: [
      <ProgressBar
        leftLabel="Allocated traffic"
        min="20"
        max="80"
        progress="30"
        rightLabel="Available traffic"
        topLabel="hola esto es un label"
      />,
    ],
  },
  {
    examples: [
      <ProgressBar
        displayError={ true }
        leftLabel="Allocated traffic"
        min="20"
        max="80"
        progress="30"
        rightLabel="Available traffic"
        topLabel="hola esto es un label"
      />,
    ],
  },
  {
    examples: [
      <ProgressBar
        displayError={ true }
        min="0"
        max="100"
        progress="60"
      />,
    ],
  },
];
