import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// actions
import { loginUser } from "../../actions/authActions";

// form components
import TextFieldGroup from "../forms/TextFieldGroup";
import FormAlert from "../forms/FormAlert";

class Login extends Component {
  /**
   * Construtor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // what do do when submit
  onSubmit(e) {
    // prevent default action
    e.preventDefault();

    // create user object
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    // call login user action, passing history
    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // what to do on mount
  componentDidMount() {
    // if already logged in, then redirect to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  // what to do when new props recieved
  componentWillReceiveProps(nextProps) {
    // if authenticated, then redirect to
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/"); // TODO push to different urls depending on user?
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="content">
        <div className="info">
          <h1>Login</h1>
          <hr width="90%" />
        </div>

        <form
          noValidate
          onSubmit={this.onSubmit}
          className="simple-form border rounded mx-auto"
        >
          <TextFieldGroup
            name="email"
            type="email"
            label="Email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />
          <TextFieldGroup
            name="password"
            type="password"
            label="Password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
            hideable
          />
          <FormAlert error={errors.login} />
          <FormAlert error={errors.server} />
          <div className="form-group">
            <div className="col-sm-12 mt-4">
              <small className="form-text text-muted">
                <Link to="/passwordreset">Forgot password?</Link> <br />
                <Link to="/register">Create Account</Link>{" "}
              </small>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-right mt-4">
              <button type="submit" className="btn btn-success">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// Map all properties to PropTypes for React good practice
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

// Map state props ...
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
