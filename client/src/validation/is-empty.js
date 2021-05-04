/**
 * isEmpty
 * Accepts a value and discovers if it is empty or not
 * (This is needed because Javascript is loosley typed)
 *
 * @param {*} value
 * @returns True if value is undefined or null,
 *          True if value is an empty object {}
 *          True if value is an empty string ""
 */

const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

export default isEmpty;