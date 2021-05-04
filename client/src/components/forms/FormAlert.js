import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Form Alert
 * @desc    Displays a form-wide error (if provided) on the form
 *  
 * Expected Properties include:
 * error:  String that contains an error message 
 *       
 */
class FormAlert extends Component {

  render() {
    return (
      <div className='form-group'>
        <div className='col-sm-12'>
          <input
            type='hidden'
            className={'form-control ' + (this.props.error ? 'is-invalid' : '')}
            name='nothing'
          />
          <div className='invalid-feedback text-center'>
            {this.props.error}
          </div>
        </div>
      </div>
    );
  }
}

// Map propTypes
FormAlert.propTypes = {
  error: PropTypes.string
};

export default FormAlert;