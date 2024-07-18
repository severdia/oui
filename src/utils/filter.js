/**
 * Returns true if item is not a valid string or is empty when trimmed
 * @param {string} itemToCheck
 * - The item to check and evaluate for filter function validity. Must be of
 *   type string and truthy when trimmed
 * @returns {boolean}
 */
function isNotValidString(itemToCheck) {
  return typeof itemToCheck !== 'string' || (typeof itemToCheck === 'string' && !itemToCheck.trim());
}

/**
 * Searches a string for an occurrence of a filtering string (case insensitive)
 *  - Filtering a complex object? Consider implementing a filter with an
 *    approach similar to FilterPicker, where item key values are joined
 *    in a string and passed in as contentToSearch
 * @param {string} stringToFind
 * - The term to find, split into separate search terms by spaces
 * @param {string} contentToSearch
 * - The content to search for the filter term
 * @returns {boolean}
 */
export function isFilterTermInItem(stringToFind, contentToSearch) {
  if (isNotValidString(contentToSearch)) {
    return false;
  }

  if (isNotValidString(stringToFind)) {
    return true;
  }

  const filters = stringToFind.match(/\S+/g) || [];
  for (let i = 0; i < filters.length; i++) {
    if (contentToSearch.toLocaleLowerCase().indexOf(filters[i].toLocaleLowerCase()) === -1) {
      return false;
    }
  }
  return true;
}
