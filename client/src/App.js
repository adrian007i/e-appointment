import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// load app data from local storage function
import loadAppData from './utils/loadAppData';

// Private Route protection
import PrivateRoute from './components/common/PrivateRoute';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Help from './components/help/Help';
import Profile from './components/profile/Profile';
import Dashboard from './components/dashboard/Dashboard';
import ConfirmEmail from './components/auth/emailConfirmed';
import Error404 from './components/common/Error404';
import Bookings from './components/bookings/bookings';
import myBookings from './components/bookings/myBookings';

// User Roles
import { UserRoles } from './utils/UserRoles';

/**
 * Load and set current user from localstorage token
 * Load all other app data such as UI history etc.
 */
loadAppData();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/help' component={Help} />
            <Route path='/bookings/:scheduleName' component={Bookings} />
            <Route
              path='/confirm/:email/:secretToken'
              component={ConfirmEmail}
            />
            <PrivateRoute
              exact
              path='/profile'
              component={Profile}
              roles={UserRoles}
              redirect='/login'
            />
            <PrivateRoute
              exact
              path='/myBookings'
              component={myBookings}
              roles={UserRoles}
              redirect='/login'
            />

            <PrivateRoute
              path='/dashboard'
              component={Dashboard}
              roles={{
                [UserRoles.AppointmentManager]: UserRoles.AppointmentManager,
                [UserRoles.Admin]: UserRoles.Admin
              }}
              redirect='/'
            />
            <Route component={Error404} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
