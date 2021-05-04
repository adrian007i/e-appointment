import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearProfile } from '../../actions/profileActions';

// Resources
import logo from '../../img/brand/Logo-w.png';

// Misc
import { UserRoles } from '../../utils/UserRoles';

/**
 * (React Component) The Navbar at the top of the page.
 *
 * @property {Function} logoutUser    - Redux Action, logout the user.
 * @property {Function} clearProfile  - Redux Action, clear profile from state.
 * @property {Object} auth            - Redux State Object, authenticated user.
 *
 */
class Navbar extends Component {
  /**
   * Create Navbar Component
   * @param {object} props - Component properties
   */
  constructor(props) {
    super(props);
    this.onLogoutClick = this.onLogoutClick.bind(this); // bind onlogoutclick
  }

  /**
   * Logout the user.
   * The logout link has a href set to '/logout', but it never goes there,
   * instead we prevent the click event and do our logoutUser action instead.
   * @param {Event} e OnClick event.
   */
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearProfile();
    this.props.logoutUser();
  }

  /**
   * Render the React Componeent
   * @returns {JSX}  - Code to be rendered
   */
  render() {
    // get login data from state
    const { isAuthenticated, user } = this.props.auth;

    // links for when user is logged in
    const authLinks = (
      <ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
        <li className='nav-item'>
          <Link className='nav-link white d-flex p-0 mr-2' to='/myBookings'>
            <i className='material-icons white mr-2'>book</i>My Bookings
          </Link>
        </li>

        <li className='nav-item'>
          {user.role === UserRoles.AppointmentManager ||
          user.role === UserRoles.Admin ? (
            <Link className='nav-link white d-flex p-0 mr-2' to='/dashboard'>
              <i className='material-icons white mr-2'>dashboard</i>Dashboard
            </Link>
          ) : (
            ''
          )}
        </li>
        <li className='nav-item'>
          <Link className='nav-link white d-flex p-0 mr-2' to='/help'>
            <i className='material-icons white mr-2'>help</i>Help
          </Link>
        </li>

        <li className='nav-item dropdown'>
          <a
            className='nav-link dropdown-toggle d-flex align-items-center p-0'
            href='#show-account-info'
            id='accounts'
            role='button'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            <i className='material-icons white mr-2'>account_circle</i>Account
          </a>
          <div
            className='dropdown-menu dropdown-menu-right p-2'
            aria-labelledby='accounts'
          >
            <Link className='dropdown-item' to='/profile'>
              My Profile
            </Link>
            {
              // anchor tag is used here instead of a Link because we want to reload all components
            }
            <a
              className='dropdown-item'
              href='/logout'
              onClick={this.onLogoutClick}
            >
              Logout
            </a>
          </div>
        </li>
      </ul>
    );

    // links for when user in not logged in
    const guestLinks = (
      <ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
        <li className='nav-item'>
          <Link className='nav-link white' to='/login'>
            Login
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link white' to='/register'>
            Register
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className='navbar navbar-expand-sm navbar-dark bg-red py-1'>
        <Link className='navbar-brand' to='/'>
          <img
            src={logo}
            width='30'
            height='30'
            className='d-inline-block align-top mr-2'
            alt='e-appointment logo'
          />
          <span>Book In</span>
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarContent'
          aria-controls='navbarContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='navbarContent'>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

// Map Proptypes for typechecking
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

// Map state to props
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearProfile }
)(Navbar);
