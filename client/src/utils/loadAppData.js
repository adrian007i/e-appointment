import store from '../store';

// user actions 
import jwtDecode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from '../actions/authActions';

// active tab
import { setActiveTab, setDashboardCollapse } from '../actions/dashboardActions';

/**
 * @name    loadAppData
 * @desc    Function, Check Local Storage for saved information, 
 *          then load that info into Redux state.
 *          Also check if user login has expired and remove data if true
 */
const loadAppData = () => {

  // check for login token, load user data, logout if expired
  if (localStorage.jwtToken) {

    // set token to Auth header
    setAuthToken(localStorage.jwtToken);
    // Decode token, save user data
    const decoded = jwtDecode(localStorage.jwtToken);
    // set user to Authenticated in Redux
    store.dispatch(setCurrentUser(decoded));

    // check for expired token, 
    // if expired: logout then redirect to login
    const currentTime = Date.now() / 1000; // get now to the minute

    // decoded.exp = 0; // quick test by setting it to zero

    if (decoded.exp < currentTime) {

      // logout if time has expired
      // also clears the user data from state
      store.dispatch(logoutUser());

      // Redirect to login
      window.location.href = '/login';
    }

  }

  // check for dashboard related properties

  // last active dashboard tab
  if (localStorage.dashboard_active_tab) {
    store.dispatch(setActiveTab(localStorage.dashboard_active_tab));
  } else {
    store.dispatch(setActiveTab('0'));
  }

  // collapsed state of the dashboard
  if (localStorage.dashboard_collapse) {
    store.dispatch(setDashboardCollapse(localStorage.dashboard_collapse));
  } else {
    store.dispatch(setDashboardCollapse('false'));
  }

};

export default loadAppData;