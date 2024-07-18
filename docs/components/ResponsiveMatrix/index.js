import React from 'react';
import { css } from 'glamor';

const margin = '1em';

const styles = css({
  display: 'flex',
  flexWrap: 'wrap',
  marginLeft: `-${margin}`,
  marginRight: `-${margin}`,
  '> *': {
    paddingLeft: margin,
    paddingRight: margin,
    paddingBottom: `calc(${margin} / 2)`,
    paddingTop: `calc(${margin} / 2)`,
    width: '25%',
    '@media(max-width: 980px)': {
      width: 'calc(100% / 3)',
    },
    '@media(max-width: 770px)': {
      width: '50%',
    },
    '@media(max-width: 480px)': {
      width: '100%',
    },
  },
});

const ResponsiveMatrix = (props) => (
  <div { ...styles }>
    { props.children.map((child, i) => {
      if (child) {
        return (
          <div key={ i }>
            { child }
          </div>
        );
      }
    }) }
  </div>
);

ResponsiveMatrix.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default ResponsiveMatrix;
