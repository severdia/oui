'use strict';

const fs = require('fs');
const glob = require('glob');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;
const scribesass = require('scribesass-parser');
const reactDocgen = require('react-docgen');
const doctrine = require('doctrine').parse;
const yaml = require('js-yaml').safeLoad;
const find = require('lodash.find');

const categories = ['components', 'overrides'];

// Grab all of the components
const componentFolders = glob.sync(`src/@(${categories.join('|')})/**/`, {
  ignore: ['src/components/', 'src/overrides/', '**/tests/*', '**/tests/', '**/example/'],
});

const files = {};

categories.map(c => {
  files[c] = {};
});

const writeFile = (path, contents) => {
  mkdirp.sync(getDirName(path));
  fs.writeFileSync(path, contents);
};

const getReactComponentData = (componentPath) => {
  let data = reactDocgen.parse(fs.readFileSync(componentPath).toString());
  const doctrineObj = doctrine(data.description);
  // Figure out if a file has a `@private` tag in the docs
  const privateTag = find(doctrineObj.tags, (o) => {
    return o.title === 'private' && o.description !== false;
  });
  data.private = !!privateTag;
  data.description = doctrineObj.description;
  return data;
};

const getSassComponentData = (componentPath, cb) => {
  scribesass.create(componentPath, (err, res) => {
    let properties = scribesass.getFileProperties(res[0].ast);
    cb(properties);
  });
};

const getYAMLComponentData = (yamlFilePath) => {
  return yaml(fs.readFileSync(yamlFilePath));
};


// Loop through the components to generate an object of data that contains
// information from each component needed to display a component index.
componentFolders.map(filePath => {
  const reactComponentPath = `${filePath}index.js`;
  const yamlPath = `${filePath}index.yaml`;
  const reactExamplesPath = `${filePath}example/index.js`;
  const sassFilePath = `${filePath}index.scss`;

  const categoryName = filePath.split('/')[1];

  // Parse folder name to get the component name
  const componentName = filePath.substring(0, filePath.length - 1).replace(`src/${categoryName}/`, '');

  // Add the components to the array of components that will can be used for
  // the documentation index.
  files[categoryName][componentName] = {
    name: componentName,
    // description: undefined,
    path: {
      react: fs.existsSync(reactComponentPath) ? {
        component: reactComponentPath,
        examples: fs.existsSync(reactExamplesPath) ? reactExamplesPath : null,
      } : null,
      sass: fs.existsSync(sassFilePath) ? sassFilePath : null,
      properties: fs.existsSync(yamlPath) ? yamlPath : null,
    },
    private: null,
  };

  // Write a file with the React documentation JSON if the component has a
  // React file
  const reactComponentPaths = files[categoryName][componentName].path.react;
  if (reactComponentPaths && reactComponentPaths.component) {
    const reactComponentData = getReactComponentData(reactComponentPaths.component);
    files[categoryName][componentName].private = reactComponentData.private;
    writeFile(`data/${categoryName}/${componentName}/react.json`, JSON.stringify(reactComponentData));
  }

  // Write a file with the YAML component properties converted into JSON.
  if (files[categoryName][componentName].path.properties) {
    const yamlComponentData = getYAMLComponentData(files[categoryName][componentName].path.properties);
    writeFile(`data/${categoryName}/${componentName}/properties.json`, JSON.stringify(yamlComponentData));
  }

  // Write a file with the Sass component properties converted into JSON.
  if (files[categoryName][componentName].path.sass) {
    getSassComponentData(files[categoryName][componentName].path.sass, (sassComponentData) => {
      writeFile(`data/${categoryName}/${componentName}/sass.json`, JSON.stringify(sassComponentData));
    });
  }
});

writeFile('data/index.json', JSON.stringify(files));
// console.log(componentFolders);
console.log(files); // eslint-disable-line no-console
