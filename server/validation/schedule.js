const Validator = require('validator');
const isEmpty = require('./is-empty.js');

/**
 * Validate Schedule Input
 *
 * expected values:
 *  name
 *  TODO other values
 *
 * @param   data containing input from form
 * @return  errors {} contaning all errors and isValid
 */

module.exports = function validateScheduleInput(data) {
  let errors = {};

  // check if values are empty first (for required fields),
  // ensure the data is a string,
  // then use Validator to validate content

  /**
   * name, required
   */
  if (isEmpty(data.name)) {
    errors.name = '* Name Required';
  }

  if (isEmpty(data.description)) {
    errors.description = '* Description Required';
  }

  if (isEmpty(data.length_of_appointment)) {
    errors.length_of_appointment = '* Length of Appointment Required ';
  } else {
    if (!Validator.isInt(data.length_of_appointment)) {
      errors.length_of_appointment = '* Numbers Only';
    }

    if (data.length_of_appointment < 1) {
      errors.length_of_appointment = '* Cannot Be 0';
    }
  }

  if (isEmpty(data.cancelation_days_notice)) {
    errors.cancelation_days_notice = '* Required';
  } else {
    if (!Validator.isInt(data.cancelation_days_notice)) {
      errors.cancelation_days_notice = '* Numbers Only';
    }

    if (data.cancelation_days_notice < 1) {
      errors.cancelation_days_notice = '* Cannot Be 0';
    }
  }

  // TODO other fields

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
