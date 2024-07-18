import React from 'react';
import { css } from 'glamor';

const styles = {
  hero: css({
    backgroundColor: '#f7f7f7',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '400px',
    display: 'flex',
  }),
  textContainer: css({
    maxWidth: '1040px',
    width: '100%',
    margin: 'auto',
    padding: '1.5rem',
  }),
  wrap: css({
    width: '40%',
  }),
  title: css({
    fontSize: '4rem',
    color: '#0081BA',
    fontWeight: 300,
  }),
  description: css({
    fontSize: '1.25rem',
  }),
};

const Hero = (props) => {
  return (
    <div { ...styles.hero }>
      <div { ...styles.textContainer }>
        <div { ...styles.textWrap }>
          <div { ...styles.title }>
            { props.title }
          </div>
          <p { ...styles.description }>
            { props.description }
          </p>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {
  description: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
};

export default Hero;
