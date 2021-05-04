const isEmpty = require('./is-empty.js');

/**
 * Validation functions for profile API
 * @module validation/profile
 */


/**
 * Validation for /profile/userlist
 * @param {Object} data - post data from request body.
 * @returns {Object} - object containing all fields with guarranteed valid value.
 */
exports.validateUserList = (data) => { 

  // expected data: field, lastValue , pageLimit

  let validated = {};

  // change empty values to null
  if (isEmpty(data.field)) {
    validated.field = null;
  }
  if (isEmpty(data.lastValue)) {
    validated.lastValue = null;
  }
  // page limit defaults to 5
  if (isEmpty(data.pageLimit) || Number.isInteger(data.pageLimit) === false) {
    validated.pageLimit = 5;
  } else {
    if (data.pageLimit < 5) {
      validated.pageLimit = 5;
    }
  }

  return validated;
}

