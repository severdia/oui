import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';

import Sidebar from './Sidebar';

const stories = storiesOf('Sidebar', module);

stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      { story() }
    </div>
  ));

stories
  .add('Default', (() => (
    <div className="flex">
      <div className="flex--1 soft">
        <h2>Content</h2>
        <p>
          {
            text('content', `Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Nam ac velit eu nibh sagittis laoreet. Nullam et purus vel
            metus pellentesque sodales. Proin auctor sagittis justo. Nam ipsum
            turpis, sollicitudin sed pellentesque a, scelerisque ac nisi. Cras
            arcu tortor, ultrices id fringilla id, venenatis eu lectus. Sed quis
            turpis eu neque auctor tempus at in sapien. Nunc venenatis ex vitae
            malesuada volutpat. Aenean non metus quam. Curabitur a dapibus sapien,
            sit amet tincidunt lacus.`)
          }
        </p>
      </div>
      <Sidebar
        border={ boolean('border', true) }
        isOpen={ boolean('isOpen', true) }
        width={ number('width', 200) }>
        <div className="soft">
          <h2>Sidebar</h2>
          <div>item 1</div>
          <div>item 2</div>
          <div>item 3</div>
        </div>
      </Sidebar>
    </div>
  )))
  .add('Anchor left', (() => (
    <div className="flex">
      <div className="flex--1 soft">
        <h2>Content</h2>
        <p>
          {
            text('content', `Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Nam ac velit eu nibh sagittis laoreet. Nullam et purus vel
            metus pellentesque sodales. Proin auctor sagittis justo. Nam ipsum
            turpis, sollicitudin sed pellentesque a, scelerisque ac nisi. Cras
            arcu tortor, ultrices id fringilla id, venenatis eu lectus. Sed quis
            turpis eu neque auctor tempus at in sapien. Nunc venenatis ex vitae
            malesuada volutpat. Aenean non metus quam. Curabitur a dapibus sapien,
            sit amet tincidunt lacus.`)
          }
        </p>
      </div>
      <Sidebar
        anchor={ select('anchor', { left: 'left', right: 'right' }, 'left') }
        border={ boolean('border', true) }
        isOpen={ boolean('isOpen', true) }
        width={ number('width', 200) }>
        <div className="soft">
          <h2>Sidebar</h2>
          <div>item 1</div>
          <div>item 2</div>
          <div>item 3</div>
        </div>
      </Sidebar>
    </div>
  )))
  .add('Docked', (() => (
    <div className="flex">
      <div className="flex--1 soft">
        <h2>Content</h2>
        <p>
          {
            text('content', `Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Nam ac velit eu nibh sagittis laoreet. Nullam et purus vel
            metus pellentesque sodales. Proin auctor sagittis justo. Nam ipsum
            turpis, sollicitudin sed pellentesque a, scelerisque ac nisi. Cras
            arcu tortor, ultrices id fringilla id, venenatis eu lectus. Sed quis
            turpis eu neque auctor tempus at in sapien. Nunc venenatis ex vitae
            malesuada volutpat. Aenean non metus quam. Curabitur a dapibus sapien,
            sit amet tincidunt lacus.`)
          }
        </p>
      </div>
      <Sidebar
        border={ boolean('border', true) }
        docked={ boolean('docked', true) }
        isOpen={ boolean('isOpen', true) }
        width={ number('width', 200) }>
        <div className="soft">
          <h2>Sidebar</h2>
          <div>item 1</div>
          <div>item 2</div>
          <div>item 3</div>
        </div>
      </Sidebar>
    </div>
  )))
  .add('Docked with box shadow', (() => (
    <div className="flex">
      <div className="flex--1 soft">
        <h2>Content</h2>
        <p>
          {
            text('content', `Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Nam ac velit eu nibh sagittis laoreet. Nullam et purus vel
            metus pellentesque sodales. Proin auctor sagittis justo. Nam ipsum
            turpis, sollicitudin sed pellentesque a, scelerisque ac nisi. Cras
            arcu tortor, ultrices id fringilla id, venenatis eu lectus. Sed quis
            turpis eu neque auctor tempus at in sapien. Nunc venenatis ex vitae
            malesuada volutpat. Aenean non metus quam. Curabitur a dapibus sapien,
            sit amet tincidunt lacus.`)
          }
        </p>
      </div>
      <Sidebar
        boxShadow={ boolean('boxShadow', true) }
        docked={ boolean('docked', true) }
        isOpen={ boolean('isOpen', true) }
        width={ number('width', 200) }>
        <div className="soft">
          <h2>Sidebar</h2>
          <div>item 1</div>
          <div>item 2</div>
          <div>item 3</div>
        </div>
      </Sidebar>
    </div>
  )));
