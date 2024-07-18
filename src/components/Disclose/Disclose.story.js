import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Disclose from './index.js';
import Checkbox from '../Checkbox';

const stories = storiesOf('Disclose', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories.add('Default', (() => {
  return (
    <Disclose title='default title'>
      <h3>Some Title</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi id voluptas vitae eius
      expedita alias iste deserunt rndis earum voluptatibus quae, numquam dolorum perspiciatis
      accusantium corporis, beatae maxime quasi. Tempora.</p>
    </Disclose>
  );
}));

stories.add('Multiple stacked', (() => {
  return (
    <div>
      <Disclose headerStyle='header-bordered' title='Some Title' childrenStyle='border'>
        <div className='soft--left'>
          <h3>Some Title</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi id voluptas vitae eius
          expedita alias iste deserunt rndis earum voluptatibus quae, numquam dolorum perspiciatis
          accusantium corporis, beatae maxime quasi. Tempora.</p>
        </div>
      </Disclose>
      <Disclose headerStyle='header-bordered' title='Some Title'>
        <div className='soft--left'>
          <h3>Some Title</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi id voluptas vitae eius
          expedita alias iste deserunt rndis earum voluptatibus quae, numquam dolorum perspiciatis
          accusantium corporis, beatae maxime quasi. Tempora.</p>
        </div>
      </Disclose>
    </div>
  );
}));

stories.add('Header style', (() => {
  return (
    <div>
      <Disclose headerStyle='header' title='Browsers'>
        <div className='soft--left'><a>Safari</a></div>
        <div className='soft--left'><a>Chrome</a></div>
        <div className='soft--left'><a>Opera</a></div>
        <div className='soft--left'><a>IE</a></div>
      </Disclose>
      <Disclose headerStyle='header' title='Some Title' childrenStyle='border'>
        <div className='soft--left'>
          <h3>Some Title</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi id voluptas vitae eius
          expedita alias iste deserunt rndis earum voluptatibus quae, numquam dolorum perspiciatis
          accusantium corporis, beatae maxime quasi. Tempora.</p>
        </div>
      </Disclose>
    </div>
  );
}));

stories.add('With divider', (() => {
  return (
    <div>
      <Disclose childrenStyle='divider' title='Some Title'>
        <h3>Some Title</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi id voluptas vitae eius
        expedita alias iste deserunt rndis earum voluptatibus quae, numquam dolorum perspiciatis
        accusantium corporis, beatae maxime quasi. Tempora.</p>
      </Disclose>
      <Disclose childrenStyle='divider' title='Some Title'>
        <h3>Some Title</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi id voluptas vitae eius
        expedita alias iste deserunt rndis earum voluptatibus quae, numquam dolorum perspiciatis
        accusantium corporis, beatae maxime quasi. Tempora.</p>
      </Disclose>
    </div>
  );
}));

stories.add('With ul', (() => {
  return (
    <div>
      <Disclose childrenStyle='divider' title='Some Title'>
        <ul className="push-half oui-input-list">
          <li>
            <Checkbox
              label="When triggered, deactivate if conditions are not met"
              testSection="configure-view-smart-deactivation_enabled"
            />
          </li>
          <li className="push-double--left">
            <Checkbox
              label="Undo changes when page activates"
              testSection="configure-view-smart-undo_on_deactivation"
            />
            <div className="push-triple--left muted">
              Undoing changes during page activation allows your single page app
              to dynamically apply and remove changes. Learn more about when to
              use this, and why this might be useful.
            </div>
          </li>
        </ul>
      </Disclose>
    </div>
  );
}));
