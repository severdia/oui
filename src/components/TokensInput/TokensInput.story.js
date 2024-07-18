import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import TokensInputCore from './index.js';

const SAMPLE_DATA = [
  { name: 'error', style: 'error' },
  { name: 'no-style' },
  { name: 'primary', style: 'primary' },
  { name: 'secondary', style: 'secondary' },
  { name: 'tertiary', style: 'tertiary' },
];

const SAMPLE_DATA_WITH_SPACES = [
  { name: 'errors present', style: 'error' },
  { name: 'primary token', style: 'primary' },
  { name: 'secondary token', style: 'secondary' },
  { name: 'tertiary token', style: 'tertiary' },
];

// Helper wrapper class to store the state so the stories are usable/interactive
class TokensInput extends React.Component {
  state = {
    tokens: this.props.tokens,
  };

  onChange = (tokens) => {
    this.setState({ tokens });
    this.props.onChange(tokens);
  };

  render() {
    const { tokens, onChange, ...rest } = this.props; //eslint-disable-line
    return <TokensInputCore tokens={ this.state.tokens } onChange={ this.onChange } { ...rest } />;
  }
}

TokensInput.propTypes = TokensInputCore.propTypes;
TokensInput.defaultProps = TokensInputCore.defaultProps;

storiesOf('TokensInput', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ))
  .add('Default', (() => {
    return <TokensInput onChange={ action('tokens changed') } tokens={ SAMPLE_DATA }/>;
  }))
  .add('With extraAddKeys', (() => {
    return (
      <TokensInput
        onChange={ action('tokens changed') }
        tokens={ SAMPLE_DATA_WITH_SPACES }
        extraAddKeys={ [' ', '_', ';', '|', '.'] }
      />
    );
  }));
