import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * (React Component) Search Text Field
 *  
 * @property {String} name         - Name and id of input field
 * @property {String} label        - Label of input
 * @property {String} value        - (optional) Value of the input field
 * @property {String} placeholder  - (optional) Value of the placeholder
 * @property {Boolean} disabled    - (optional) boolean, if input is disabled  
 * @property {Function} onchange   - onchange event (event should update the input data)
 *       
 */
class SearchInput extends Component {

  /**
   * Render the React Componeent
   * @returns {JSX}  - Code to be rendered
   */
  render() {

    // get values from props passed in.
    const { name, label, value, placeholder, disabled, onChange } = this.props;

    return (
      <div className='form-group'>

        <label
          htmlFor={name}
          className='col-sm-6 col-form-label'>
          {label}
        </label>

        <div className='col-sm-12 input-group'>

          <input
            type='text'
            className='form-control'
            placeholder={placeholder}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            disabled={disabled} // This is fine, React will remove the =true/false part 
          />

          <div className='input-group-append'>
            <div className='input-group-text link-cursor'
              onClick={() => {
                // perform the search event??
              }}
            >
              <i className='material-icons'>search</i>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

//  Map Proptypes for typechecking
SearchInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default SearchInput;