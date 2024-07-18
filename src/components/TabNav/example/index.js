/* eslint-disable react/jsx-key */
import React from 'react';
import TabNav from '../index';

const mockFunction = () => {};

export default [
  {
    isPadded: true,
    examples: [
      <TabNav activeTab={ 'first' }>
        <TabNav.Tab
          tabId='first'
          onClick={ mockFunction }>
          Tab #1
        </TabNav.Tab>
        <TabNav.Tab
          tabId='second'
          onClick={ mockFunction }>
          Tab #2
        </TabNav.Tab>
        <TabNav.Tab
          tabId='third'
          onClick={ mockFunction }>
          Tab #3
        </TabNav.Tab>
      </TabNav>,
    ],
  },
  {
    isPadded: true,
    examples: [
      <TabNav activeTab={ 'second' } style={ ['small'] }>
        <TabNav.Tab
          tabId='first'
          onClick={ mockFunction }>
          Tab #1
        </TabNav.Tab>
        <TabNav.Tab
          tabId='second'
          onClick={ mockFunction }>
          Tab #2
        </TabNav.Tab>
        <TabNav.Tab
          tabId='third'
          onClick={ mockFunction }>
          Tab #3
        </TabNav.Tab>
      </TabNav>,
    ],
  },
  {
    isPadded: true,
    examples: [
      <TabNav activeTab={ 'first' } style={ ['small', 'center'] }>
        <TabNav.Tab
          tabId='first'
          onClick={ mockFunction }>
          Tab #1
        </TabNav.Tab>
        <TabNav.Tab
          tabId='second'
          onClick={ mockFunction }>
          Tab #2
        </TabNav.Tab>
        <TabNav.Tab
          tabId='third'
          onClick={ mockFunction }>
          Tab #3
        </TabNav.Tab>
      </TabNav>,
    ],
  },
  {
    isPadded: true,
    examples: [
      <TabNav activeTab={ 'first' } style={ ['small', 'sub'] }>
        <TabNav.Tab
          tabId='first'
          onClick={ mockFunction }>
          Tab #1
        </TabNav.Tab>
        <TabNav.Tab
          tabId='second'
          onClick={ mockFunction }>
          Tab #2
        </TabNav.Tab>
        <TabNav.Tab
          tabId='third'
          onClick={ mockFunction }>
          Tab #3
        </TabNav.Tab>
      </TabNav>,
    ],
  },
];
