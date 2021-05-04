// const validator = require('validator');
const isEmpty = require('./is-empty.js');

/**
 * Validate Login Input
 * 
 * expected values: 
 *  email 
 *  password 
 * 
 * @param   data containing input from login form
 * @return  errors {} contaning all errors and isValid
 */

module.exports = function validateLoginInput(data) {

  let errors = {};

  // check if values are empty first (for required fields), 
  // ensure the data is a string,
  // then use Validator to validate content

  /**
   * password (required) 
   * is not empty string
   */
  if (!isEmpty(data.password)) {

    // nothing

  } else {
    errors.password = 'Please type in your password.';
  }

  /**
   * email (required) 
   * is not empty string
   */
  if (!isEmpty(data.email)) {

    // nothing

  } else {
    errors.email = 'Please enter your email address.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};