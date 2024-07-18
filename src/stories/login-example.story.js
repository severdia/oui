import React from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';

import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import Input from '../components/Input';
import Spinner from '../components/Spinner';
import TextField from '../components/TextField';

const Or = styled.div`
  color: #a6a6a6 !important;
  text-align: center;
  color: #262626;
  text-transform: uppercase;
  margin: 15px auto;
  position: relative;
  &:before {
    box-sizing: border-box;
    content: '';
    border-top: 1px dotted #e0e0e0;
    width: 40%;
    position: absolute;
    left: 0;
    top: 50%;
  }
  &:after {
    content: '';
    border-top: 1px dotted #e0e0e0;
    width: 40%;
    position: absolute;
    right: 0;
    top: 50%;
  }
`;

const stories = storiesOf('Login', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="login">
      {story()}
    </div>
  ));

stories
  .add('Default state', () => (<div style={ styles.container }>
    <div className="signin-form lego-grid__cell soft-double flex flex--column">
      <form className="flex--1">
        <ol className="lego-form-fields">
          <li className="lego-form-fields__item push--bottom">
            <Input
              label='Email'
              type='text'
              displayError={ boolean('displayError [email]', false) }
            />
          </li>
          <li className="lego-form-fields__item push--bottom">
            <Input
              label='Password'
              type='password'
              displayError={ boolean('displayError [pass]', false) }
            />
          </li>
          <li className="lego-form-fields__item push--bottom">
            <a href="#">Need help loggin in?</a>
          </li>
          <li className="lego-form-fields__item">
            <Checkbox label='Keep me logged in' />
          </li>
        </ol>
        <div style={{ border: 'none' }} className="lego-form__footer text--center push-triple--top">
          <div className="position--relative height--50 flex flex--column flex-align--center">
            <Button
              className="lego-button lego-button--highlight lego-button--full push--bottom"
              style='highlight'
              width='full'>
              Log In
            </Button>
          </div>
          <a className="display--block" href="#" style={ styles.center }>Log in using SSO</a>
        </div>
      </form>
      <div className="flex--1">
        <Or>or</Or>
        <Button
          className="lego-button lego-button--outline lego-button--full"
          style='outline'
          width='full'>
          Try It Free
        </Button>
      </div>
    </div>
  </div>));
stories
  .add('Loading', () => (<div style={ styles.container }>
    <div className="signin-form lego-grid__cell soft-double flex flex--column">
      <form className="flex--1">
        <ol className="lego-form-fields">
          <li className="lego-form-fields__item push--bottom">
            <TextField
              label='Email'
              type='text'
              value='wrong@email.com'
            />
          </li>
          <li className="lego-form-fields__item push--bottom">
            <Input
              label='Password'
              type='password'
              value='12345678'
            />
          </li>
          <li className="lego-form-fields__item push--bottom">
            <a href="#">Need help loggin in?</a>
          </li>
          <li className="lego-form-fields__item">
            <Checkbox label='Keep me logged in' />
          </li>
        </ol>
        <div style={{ border: 'none' }} className="lego-form__footer text--center push-triple--top">
          <div className="position--relative height--50 flex flex--column flex-align--center">
            <Spinner
              size={ select('size', { small: 'small', tiny: 'tiny' }, 'small') }
            />
          </div>
          <a className="display--block" href="#" style={ styles.center }>Log in using SSO</a>
        </div>
      </form>
      <div className="flex--1">
        <Or>or</Or>
        <Button
          className="lego-button lego-button--outline lego-button--full"
          style='outline'
          width='full'>
          Try It Free
        </Button>
      </div>
    </div>
  </div>));
stories
  .add('Error', () => (<div style={ styles.container }>
    <div className="signin-form lego-grid__cell soft-double flex flex--column">
      <form className="flex--1">
        <ol className="lego-form-fields">
          <li className="lego-form-fields__item push--bottom">
            <TextField
              label='Email'
              type='text'
              defaultValue="wrong@email.com"
              note="This is an invalid account address"
              displayError={ true }
            />
          </li>
          <li className="lego-form-fields__item push--bottom">
            <Input
              label='Password'
              type='password'
              value='12345678'
            />
          </li>
          <li className="lego-form-fields__item push--bottom">
            <a href="#">Need help loggin in?</a>
          </li>
          <li className="lego-form-fields__item">
            <Checkbox label='Keep me logged in' />
          </li>
        </ol>
        <div style={{ border: 'none' }} className="lego-form__footer text--center push-triple--top">
          <div className="position--relative height--50 flex flex--column flex-align--center">
            <Button
              className="lego-button lego-button--highlight lego-button--full push--bottom"
              style='highlight'
              width='full'>
              Log In
            </Button>
          </div>
          <a className="display--block" href="#" style={ styles.center }>Log in using SSO</a>
        </div>
      </form>
      <div className="flex--1">
        <Or>or</Or>
        <Button
          className="lego-button lego-button--outline lego-button--full"
          style='outline'
          width='full'>
          Try It Free
        </Button>
      </div>
    </div>
  </div>));

const styles = {
  container: {
    margin: '0 auto',
    background: 'white',
    width: 300,
    height: 480,
  },
};
