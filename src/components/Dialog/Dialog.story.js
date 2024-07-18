import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import noop from 'lodash.noop';

import Dialog, { DialogNew } from './index.js';
import Fieldset from '../Fieldset';
import Button from '../Button';
import Input from '../Input';
import Dropdown from '../Dropdown/index.js';
import BlockList from '../BlockList';
import { action } from '@storybook/addon-actions';
import Label from '../Label/index.js';
import ButtonRow from '../ButtonRow/index.js';

const data = [
  {title: 'JavaScript'},
  {title: 'Java'},
  {title: 'C++'},
];

const LanguageDropdown = (
  <Dropdown
    buttonContent={ text('buttonContent', 'None Selected') }
    width={ 300 }
    arrowIcon='down'>
    <BlockList>
      {
        data.map((item, index) => {
          return (
            <BlockList.Category header={ item.header } key={ index }>
              <BlockList.Item onClick={ action('click on dropdown item') }>
                <div className="flex flex-align--center">
                  <div className="flex--1">
                    <div>{ item.title }</div>
                  </div>
                </div>
              </BlockList.Item>
            </BlockList.Category>
          );
        })
      }
    </BlockList>
  </Dropdown>
);

const stories = storiesOf('Dialog', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => <div id="root-preview">{story()}</div>);

stories
  .add(
    'default', (() => (
      <div>
        <div>
          {' '}
          <p>This is text behind the dialog that is blocked by the overlay.</p>
        </div>
        <DialogNew
          title={ text('title', 'This is a  Dialog') }
          subtitle={ text('subtitle', 'This is an optional subtitle') }
          hasCloseButton={ boolean('hasCloseButton', true) }
          hasOverlay={ boolean('hasOverlay', true) }
          onClose={ action('Dialog was closed') }
          footerButtonList={ [
            <Button style="plain" key={ 0 } onClick={ noop }>
              Cancel
            </Button>,
            <Button style="highlight" key={ 1 } onClick={ noop }>
              Save
            </Button>,
          ] }>
          <Fieldset
            title="Project Settings"
            description="Some quick setup"
            helpIcon={ true }
            popoverTitle="Popover title"
            popoverText="This should help you figure out what to do">
            <Input id="input-01" label="Verify Email" type="email"/>
            <Input id="input-02" label="Confirm Email" type="email"/>
          </Fieldset>
        </DialogNew>
      </div>
    ))
  )
  .add(
    'with a form and dropdown', (() => (
      <div>
        <div>
          {' '}
          <p>This is text behind the dialog that is blocked by the overlay.</p>
        </div>
        <DialogNew
          title={ text('title', 'Welcome to this Feature') }
          subtitle={ <p>Let&apos;s get you up and running with <a href="https://www.optimizely.com/">our feature.</a></p> }
          hasCloseButton={ boolean('hasCloseButton', true) }
          hasOverlay={ boolean('hasOverlay', true) }
          onClose={ action('Dialog was closed') }
          footerButtonList={ [
            <Button style="highlight" key={ 0 } onClick={ noop }>
              Get Started
            </Button>,
          ] }>
          <Fieldset
            title="Project Settings"
            description="Some quick setup"
            helpIcon={ true }
            popoverTitle="Popover title"
            popoverText="This should help you figure out what to do">
            <Input id="input-03" label="Project Name" type="text"/>
            <Input id="input-04" label="Description" type="text"/>
          </Fieldset>
          <Label>Select your language</Label>
          {LanguageDropdown}
        </DialogNew>
      </div>
    ))
  )
  .add(
    'with scrolling', (() => (
      <div>
        <div>
          {' '}
          <p>This is text behind the dialog that is blocked by the overlay.</p>
        </div>
        <DialogNew
          title={ text('title', 'Welcome to this Feature') }
          hasCloseButton={ boolean('hasCloseButton', true) }
          onClose={ action('Dialog was closed') }
          hasOverlay={ boolean('hasOverlay', true) }
          footerButtonList={ [
            <Button style="highlight" key={ 0 } onClick={ noop }>
              Get Started in the Docs
            </Button>,
          ] }>
          <p>
            Content should be kept to small, digestible amounts.
            If you need more space, consider using a <b>Sheet</b>.
            If the content does overflow the space, the dialog will scroll.
          </p>
          <p className="muted">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi id voluptas vitae eius
            expedita alias iste deserunt rndis earum voluptatibus quae, numquam dolorum perspiciatis
            accusantium corporis, beatae maxime quasi. Tempora.
          </p>
          <p className="muted">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi id voluptas vitae eius
            expedita alias iste deserunt rndis earum voluptatibus quae, numquam dolorum perspiciatis
            accusantium corporis, beatae maxime quasi. Tempora.
          </p>
          <p className="muted">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi id voluptas vitae eius
            expedita alias iste deserunt rndis earum voluptatibus quae, numquam dolorum perspiciatis
            accusantium corporis, beatae maxime quasi. Tempora.
          </p>
        </DialogNew>
      </div>
    ))
  )
  .add(
    'with simple text and link', (() => (
      <div>
        <p>This is text behind the dialog that is blocked by the overlay.</p>
        <DialogNew
          title={ text('title', 'This is a Dialog') }
          hasCloseButton={ boolean('hasCloseButton', false) }
          hasOverlay={ boolean('hasOverlay', true) }
          footerButtonList={ [
            <Button style="plain" key={ 0 } onClick={ noop }>
              No Thanks
            </Button>,
            <Button style="highlight" key={ 1 } onClick={ noop }>
              Continue
            </Button>,
          ] }>
          <p>Dialogs can also contain only text in the body, no data input.</p>
          <p>They can also contain links, like <a href="https://www.optimizely.com/">learn more about Optimizely features</a>.</p>
        </DialogNew>
      </div>
    ))
  )
  .add(
    'without overlay', (() => (
      <div>
        <p>This is text behind the dialog that is NOT blocked by the overlay because the overlay is hidden.</p>
        <DialogNew
          title={ text('title', 'This is a Dialog') }
          hasCloseButton={ boolean('hasCloseButton', false) }
          hasOverlay={ boolean('hasOverlay', false) }
          footerButtonList={ [
            <Button style="plain" key={ 0 } onClick={ noop }>
              No Thanks
            </Button>,
            <Button style="highlight" key={ 1 } onClick={ noop }>
              Continue
            </Button>,
          ] }>
          <p>Dialogs can also contain only text in the body, no data input.</p>
          <p>They can also contain links, like <a href="https://www.optimizely.com/">learn more about Optimizely features</a>.</p>
        </DialogNew>
      </div>
    ))
  )
  .add('deprecated dialog', (() => (<div>
    <Dialog.Wrapper>
      <Dialog.Title subtitle="Test Subtitle">This is a Dialog</Dialog.Title>

      <Dialog.Fieldset
        title="Project Name"
        description="Give your project a name"
        isOptional={ false }
        helpIcon={ true }
        popoverTitle="Popover title"
        popoverText="This should help you figure out what to do">
        <Input id="input-05" label="Some data" type="text"/>
      </Dialog.Fieldset>

      <Dialog.Fieldset
        title="Project Description"
        description="Give your project a description"
        isOptional={ true }
        helpIcon={ true }
        popoverTitle="Popover title"
        popoverText="This should help you figure out what to do">
        <Input id="input-06" label="Some data" type="text"/>
      </Dialog.Fieldset>

      <Dialog.Footer>
        <ButtonRow
          rightGroup={ [
            <Button
              style="plain"
              key={ 0 }
              onClick={ noop }>
              Cancel
            </Button>,
            <Button
              style="highlight"
              key={ 1 }
              onClick={ noop }>
              Save
            </Button>,
          ] }
        />
      </Dialog.Footer>
    </Dialog.Wrapper>
  </div>)));
