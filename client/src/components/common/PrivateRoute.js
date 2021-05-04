import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * (React Component) This component tests if a parameter component is veiwable 
 * by current user. If user does not have permission, they will be redirected to 
 * specified location.
 * 
 * @param {Object} component    - This is the component to test if user has permission.
 * @param {Object} auth         - Current auth in state.
 * @param {Object} routeProps   - Properties of the route, if any.
 * @param {Object} role         - roles with permission for this component.
 * @param {String} redirect     - Where to redirect if failed permission test.
 * @class
 */
const PrivateRoute = ({ component: Component, auth, roles, redirect, ...routeProps }) => (
  <Route
    {...routeProps}
    render={props => auth.isAuthenticated === true && Object.values(roles).includes(auth.user.role) 
      ? (<Component {...props} />)
      : (<Redirect to={redirect} />)
    }
  />
);



// Map all properties to PropTypes for React good practice
PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  roles: PropTypes.object.isRequired,
  redirect: PropTypes.string.isRequired,
  routeProps: PropTypes.object
};

// Map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);