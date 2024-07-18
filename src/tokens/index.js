#!/usr/bin/env node
const _ = require('lodash');
const path = require('path');
const glob = require('glob');
const fse = require('fs-extra');
const formatToES = require('./formatters/javascript-es');
const formatToCJS = require('./formatters/javascript-cjs');
const formatToScss = require('./formatters/scss');

const clean = (outputDir = './forimport') => {
  // Clean `dist` directory before starting.
  fse.removeSync(outputDir);
};

const processFiles = (globPath = path.resolve(__dirname, './src/*.json')) => {
  const files = glob.sync(globPath);

  if (files.length === 0) {
    throw new Error(`No files were found in ${globPath}…`);
  } else {
    // eslint-disable-next-line no-console
    console.log(`Processing (${files.length}) files...`);
  }

  const contents = {
    cjs: [],
    es: [],
    scss: [],
  };

  _.forEach(files, file => {
    const fileText = fse.readFileSync(file).toString();
    const fileJSON = JSON.parse(fileText);

    const cjs = _.trim(_.reduce(fileJSON.tokens, formatToCJS, ''));
    const es = _.trim(_.reduce(fileJSON.tokens, formatToES, ''));
    const scss = _.trim(_.reduce(fileJSON.tokens, formatToScss, ''));

    contents.cjs.push(cjs);
    contents.es.push(es);
    contents.scss.push(scss);
  });

  return {
    cjs: contents.cjs.join('\n'),
    es: contents.es.join('\n'),
    scss: contents.scss.join('\n'),
  };
};

const saveFiles = (contents, dist = path.resolve(__dirname, './forimport')) => {
  if (process.env.NODE_ENV !== 'test') {
    /* eslint-disable no-console */
    let file = `${dist}/index.cjs.js`;
    fse.outputFileSync(file, contents.cjs + '\n');
    console.log(`Saved: ${file}.`);
    file = `${dist}/index.es.js`;
    fse.outputFileSync(file, contents.es + '\n');
    console.log(`Saved: ${file}.`);
    file = `${dist}/_index.scss`;
    fse.outputFileSync(file, contents.scss);
    console.log(`Saved: ${file}.`);
    /* eslint-enable no-console */
  }
};

// Execute the code here.
clean();
const contents = processFiles();
saveFiles(contents);

// Export functions for testing.
module.exports = {
  clean,
  processFiles,
  saveFiles,
};
