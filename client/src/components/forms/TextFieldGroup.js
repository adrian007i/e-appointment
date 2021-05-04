import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * (React Component) Text Field input Group Using Bootstrap styles
 *  
 * @property {String} type        - Input type. (should either be 'text' or 'password')
 * @property {String} name        - Name and id of input.
 * @property {String} label       - Label of input.
 * @property {String} value       - Value of the input.
 * @property {String} placeholder - Value of the placeholder.
 * @property {Boolean} disabled   - Boolean, if input is disabled.
 * @property {String} info        - Text appears at bottom of input field in small font.
 * @property {Boolean} hideable   - Hideable fields have a toggle to hide content (used for passwords).
 * @property {Function} onchange  - Onchange event (event should update the input data).
 * @property {String} error       - An error associated with this field, returned by server api
 */

class TextFieldGroup extends Component {

  // constructor
  constructor(props) {
    super(props);
    this.state = {
      toggleContentVisible: false // remains false if hideable not passed as prop
    };
  }

  /**
   * Render the React Componeent
   * @returns {JSX}  - Code to be rendered
   */
  render() {

    return (
      <div className='form-group'>

        <label
          htmlFor={this.props.name}
          className='col-sm-6 col-form-label'>
          {this.props.label}
        </label>

        <div className='col-sm-12 input-group'>

          <input
            type={this.state.toggleContentVisible ? 'text' : this.props.type}
            className={'form-control' + (this.props.error ? ' is-invalid' : '')}
            placeholder={this.props.placeholder}
            name={this.props.name}
            id={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            disabled={this.props.disabled} // This is fine, React will remove the =true/false part 
          />

          {this.props.hideable &&
            <div className='input-group-append'>
              <div className='input-group-text link-cursor'
                onClick={() => {
                  this.state.toggleContentVisible === true
                    ? this.setState({ toggleContentVisible: false })
                    : this.setState({ toggleContentVisible: true });
                }}
              >
                <i className='material-icons'>{this.state.toggleContentVisible ? 'visibility_off' : 'visibility'}</i>
              </div>
            </div>
          }

          <div className='invalid-feedback'>
            {this.props.error}
          </div>
          <div>
            {this.props.info && <small id={this.props.name + '-info'}
              className='form-text text-muted'>{this.props.info}</small>}
          </div>
        </div>
      </div>
    );
  }
}

//  Map Proptypes for typechecking
TextFieldGroup.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  hideable: PropTypes.bool
};

export default TextFieldGroup;