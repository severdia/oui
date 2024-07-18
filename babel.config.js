/**
 * Babel Config OVERRIDE for COMMONJS ES5 exports.
 * This config is only used by the npm script "babel-es5".
 *
 * @type {module:fs}
 * See https://babeljs.io/docs/en/options#primary-options
 */
const fs = require('fs');

module.exports = function(api) {
  const babelrcString = fs.readFileSync('./.babelrc', 'utf8');
  const babelrc = JSON.parse(babelrcString);
  babelrc.presets[0] = [
    '@babel/preset-env',
    {
      'modules': 'commonjs',
    },
  ];
  api.cache.never();
  return babelrc;
};
