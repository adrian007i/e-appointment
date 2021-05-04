import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// actions
import { registerUser } from '../../actions/authActions';

// form components
import TextFieldGroup from '../forms/TextFieldGroup';
import FormAlert from '../forms/FormAlert';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // what do do when submit
  onSubmit(e) {
    // prevent default action
    e.preventDefault();
    // create new user
    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password
    };
    // call registerUser Redux action, passing history
    this.props.registerUser(newUser, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // what to do on mount
  componentDidMount() {
    // if already logged in, then redirect to home
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  // what to do when new props recieved
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    // get errors from state
    const { errors } = this.state;

    return (
      <div className='content'>
        <h1>Create a New Account</h1>
        <hr width='90%' />
        <div className='info' />

        <form
          noValidate
          onSubmit={this.onSubmit}
          className='simple-form border rounded mx-auto'
        >
          <TextFieldGroup
            name='firstname'
            type='text'
            label='First Name'
            value={this.state.firstname}
            onChange={this.onChange}
            error={errors.firstname}
          />

          <TextFieldGroup
            name='lastname'
            type='text'
            label='Last Name'
            value={this.state.lastname}
            onChange={this.onChange}
            error={errors.lastname}
          />

          <TextFieldGroup
            name='email'
            type='email'
            label='Email'
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />

          <TextFieldGroup
            name='password'
            type='password'
            label='Password'
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
            hideable
          />

          <FormAlert error={errors.login} />
          <FormAlert error={errors.server} />

          <div className='form-group'>
            <div className='col-sm-12 text-right mt-4'>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// Set PropTypes for React good practice
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

// Map state to props ... state will now be properties of this component
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
