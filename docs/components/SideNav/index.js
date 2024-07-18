import React from 'react';
import { css } from 'glamor';
import LinkActive from '../LinkActive';

const styles = {
  text: css({
    fontSize: '1.1rem',
  }),
  category: css({
    marginBottom: '1em',
  }),
};

const SideNav = (props) => (
  <nav>
    <h2 { ...css(styles.category, styles.text) }>
      <LinkActive
        to={ props.category.href }
        currentRoute={ props.currentRoute }>
        { props.category.name }
      </LinkActive>
    </h2>
    <ul { ...styles.text }>
      { props.items.map(item => (
        <li key={ item.name }>
          <LinkActive
            to={ item.href }
            currentRoute={ props.currentRoute }>
            { item.name }
          </LinkActive>
        </li>
      ))}
    </ul>
  </nav>
);

SideNav.propTypes = {
  category: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    href: React.PropTypes.string.isRequired,
  }).isRequired,
  currentRoute: React.PropTypes.string.isRequired,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    href: React.PropTypes.string.isRequired,
  })).isRequired,
};

export default SideNav;
