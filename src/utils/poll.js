/**
 * Method to detect when a given selector appears in the DOM
 * using a recursive setTimeout.
 *
 * NOTE: For performance reasons, this should only be used
 * when an element is certain to appear.
 *
 * @param {String} selector - CSS selector for an element that will appear
 * @returns {Promise}
 */
export function waitForSelector(selector) {
  const getElement = () => document.querySelector(selector);
  return new Promise((resolve) => {
    const checkForElement = () => {
      if (getElement()) {
        resolve(getElement());
      } else {
        setTimeout(checkForElement, 5);
      }
    };
    checkForElement();
  });
}
