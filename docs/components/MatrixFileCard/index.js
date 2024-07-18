import React from 'react';
import { css } from 'glamor';
import { Link } from 'react-router';
import Badge from '../../../src/components/Badge';

const styles = {
  header: css({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  }),
  title: css({
    fontSize: '1.25rem',
  }),
  badges: css({
    marginLeft: '0.5em',
  }),
};

const MatrixFileCard = (props) => (
  <div>
    <div { ...styles.header }>
      <Link
        to={ props.link }
        title={ `View documentation for “${props.children}”` }>
        <h3 { ...styles.title }>
          { props.children }
        </h3>
      </Link>
      <div { ...styles.badges }>
        { props.languages && props.languages.map(language => (
          <Link
            to={ `${props.link}/${language.toLowerCase()}` }
            key={ language }
            title={ `View ${language} documentation for “${props.children}”` }>
            <Badge color="plain">
              { language }
            </Badge>
          </Link>
        )) }
      </div>
    </div>
  </div>
);

MatrixFileCard.propTypes = {
  children: React.PropTypes.string.isRequired,
  languages: React.PropTypes.array,
  link: React.PropTypes.string.isRequired,
};

export default MatrixFileCard;
