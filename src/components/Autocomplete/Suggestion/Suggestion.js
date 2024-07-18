import React from 'react';
import PropTypes from 'prop-types';

import Link from '../../Link';

/**
 * Suggestion
 * This compononent renders a single auto-complete suggestion
 * It's purpose is to act as the default auto-complete SuggestionField
 */

const Suggestion = (props) => {
  const { suggestion, testSection } = props;
  return (
    <Link
      testSection={ testSection }>
      { suggestion }
    </Link>
  );
};

Suggestion.defaultProps = {
  suggestion: '',
  testSection: '',
};

Suggestion.propTypes = {
  /** Autocomplete suggestion */
  suggestion: PropTypes.string,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

export default Suggestion;
