/**
 * Map a color class to a human readable word that explains the context of when
 * the class is used. This is helpful for screen readers.
 * @param {String} className - an OUI class
 * @returns {String} English word describing the class provided
 */
export const getAssistiveTextFromColorClass = (className) => {
  const classMapping = {
    'bad-news': 'Error',
    'brand': 'Info',
    'good-news': 'Success',
    'warning': 'Alert',
  };

  let text = classMapping[className];

  if (!text) {
    throw new Error('Provided class name does not map to a word.');
  }

  return text;
};
