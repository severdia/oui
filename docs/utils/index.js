export const supportedLanguages = {
  react: 'React',
  sass: 'Sass',
};

export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const getLanguagesFromComponent = (component) => {
  let languages = [];

  Object.keys(supportedLanguages).map((language) => {
    component.path[language] && languages.push(supportedLanguages[language]);
  });

  return languages;
};
