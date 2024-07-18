/* eslint-disable react/jsx-key */
import React from 'react';
import Attention from '../index';

export default [
  {
    examples: [
      <Attention
        isDismissible={ true }
        alignment="center"
        type="warning"
        testSection="attention-foo">
        Hello! This is a short attention bar.
      </Attention>,
    ],
  },
  {
    examples: [
      <Attention alignment="left" type="bad-news">
        Hello! This is a short attention bar.
      </Attention>,
    ],
  },
  {
    examples: [
      <Attention type="brand">
        Hello! This is a short attention bar.
      </Attention>,
    ],
  },
  {
    examples: [
      <Attention type="good-news">
        Hello! This is a short attention bar.
      </Attention>,
    ],
  },
  {
    examples: [
      <Attention type="warning">
        Hello! This is a short attention bar.
      </Attention>,
    ],
  },
  {
    examples: [
      <Attention alignment="center">
        Hello! This is a short attention bar.
      </Attention>,
    ],
  },
];
