import React from 'react';
import Code from '../../../src/components/Code';
import classNames from 'classnames';
import { css } from 'glamor';

const styles = css({
  '> *:not(:first-child)': {
    marginLeft: '3px',
  },
  '> *:not(:last-child)': {
    marginRight: '3px',
  },
});

const ComponentExample = (props) => {
  const classes = classNames([
    'border--all',
    'no-border--bottom',
    'soft-double',
  ]);
  // Replace the namespace for code block.
  const codeWithLego = props.component.code.replace(/\#\{\$namespace\}/g, 'lego-');
  const codeWithoutNamespace = props.component.code.replace(/\#\{\$namespace\}/g, '');

  return (
    <div className="push-triple--bottom">
      <div
        className={ `${classes} ${styles}` }
        dangerouslySetInnerHTML={{ __html: codeWithoutNamespace }}>
      </div>
      <Code
        type="block"
        hasCopyButton={ true }
        isHighlighted={ true }
        language="html">
        { codeWithLego }
      </Code>
    </div>
  );
};

ComponentExample.propTypes = {
  component: React.PropTypes.object,
};

export default ComponentExample;
