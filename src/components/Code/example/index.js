/* eslint-disable react/jsx-key, react/jsx-indent */
import React from 'react';
import Code from '../index';

export default [
  {
    examples: [
      <Code type="block">
        { `var foo = 'bar';
var bat = 'baz';` }
      </Code>,
    ],
  },
  {
    examples: [
      <Code type="block" isHighlighted={ true } language="javascript">
        { `var highlightedFoo = 'bar';
var highlightedBat = 'baz';` }
      </Code>,
    ],
  },
  {
    examples: [
      <Code type="block" hasCopyButton={ true } testSection="code">
        { `var copyableFoo = 'bar';
var copyableBat = 'baz';` }
      </Code>,
    ],
  },
  {
    examples: [
      <Code type="inline">{ 'var foo;' }</Code>,
    ],
  },
];
