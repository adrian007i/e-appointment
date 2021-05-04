const validator = require('validator');
const isEmpty = require('./is-empty.js');

/**
 * Validate Register Input
 * 
 * expected values: 
 *  username 
 *  password (unhashed) 
 *  email
 * 
 * @param   data containing input from register form
 * @return  errors {} contaning all errors and isValid
 */

module.exports = function validateRegisterInput(data) {

  let errors = {};

  // check if values are empty first (for required fields), 
  // ensure the data is a string,
  // then use Validator to validate content

  /**
   * firstname and lastname (required)
   * should not be empty
   */
  if (isEmpty(data.firstname)) {
    errors.firstname = 'A first name is required.';
  }
  if (isEmpty(data.lastname)) {
    errors.lastname = 'A last name is required.';
  }

  /**
   * password (required) 
   * only one password field is needed, because we use a hide and 
   *   show feature instead of confirm password
   * 8 - 30 characters
   * On Client side, there should be a password strenght meter
   */
  if (!isEmpty(data.password)) {

    // ensure it is a string
    data.password = data.password + '';

    if (!validator.isLength(data.password, { min: 8, max: 30 })) {
      errors.password = 'Password must be between 8 and 30 characters.';
    }

  } else {
    errors.password = 'A password is required.';
  }

  /**
   * email (required) 
   * is valid email 
   */
  if (!isEmpty(data.email)) {

    data.email = data.email + '';

    if (!validator.isEmail(data.email)) {
      errors.email = 'Invalid email address. e.g. yourname@email.com';
    }

  } else {
    errors.email = 'An email address is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};