module.exports = {
  'verbose': true,
  'collectCoverage': true,
  'coveragePathIgnorePatterns': [
    'node_modules/',
    'components/Icon/',
    'utils/.*-mock.js$',
    'src/setupTests.js',
    'src/tempPollyfills.js',
  ],
  'moduleNameMapper': {
    '^.+\\.(css)$': '<rootDir>/src/utils/empty-mock.js',
    '^.+\\.(svg)$': '<rootDir>/src/utils/svg-mock.js',
  },
  'testRegex': '(/tests/.*|\\.(test|spec))\\.(js|json|node)$',
  'moduleDirectories': ['node_modules', 'src'],
  'setupTestFrameworkScriptFile': '<rootDir>/src/utils/localstorage-mock.js',
  'setupFiles': ['<rootDir>/src/setupTests.js'],
};
