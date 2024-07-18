import React from 'react';
import Code from '../../../src/components/Code';
import reactElementToJSXString from 'react-element-to-jsx-string';

const ComponentRowItem = (props) => {
  let classes = '';

  if (props.isInline) {
    classes = 'push--right display--inline';
  }
  return (
    <div className={ classes }>
      { props.children }
    </div>
  );
};

ComponentRowItem.propTypes = {
  children: React.PropTypes.element,
  isInline: React.PropTypes.bool,
};

const ComponentExample = (props) => {
  let codeHTML = '';
  let classes = ['border--all', 'no-border--bottom', 'soft-double'];
  if (props.isPadded) {
    classes.push('soft');
  }
  if (props.backgroundColor) {
    classes.push('background--' + props.backgroundColor);
  }

  return (
    <div className="push-triple--bottom">
      <div className={ classes.join(' ') }>
        {
          props.components.map((exampleComponent, i) => {
            codeHTML += reactElementToJSXString(exampleComponent, {
              showFunctions: true,
              displayName: (ReactElement) => {
                return ReactElement.type.displayName || ReactElement.type.name || ReactElement.type;
              },
            }) + '\n';

            return (
              <ComponentRowItem
                key={ i }
                isInline={ props.components.length > 1 }>
                { exampleComponent }
              </ComponentRowItem>
            );
          })
        }
      </div>
      <Code
        type="block"
        hasCopyButton={ true }
        isHighlighted={ true }
        language="html">
        { codeHTML }
      </Code>
    </div>
  );

};

ComponentExample.propTypes = {
  backgroundColor: React.PropTypes.oneOf([
    'faint',
    'light',
    'muted',
    'medium',
    'charcoal',
    'brand',
    'brand-dark',
    'warning',
    'bad-news',
    'good-news',
    'live',
    'draft',
  ]),
  components: React.PropTypes.array,
  isPadded: React.PropTypes.bool,
};

export default ComponentExample;
