import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import Error404 from '../common/Error404';
import SideBar from './common/sidebar/SideBar';
import GetStarted from './manager/getstarted/GetStarted';
import Schedules from './manager/schedules/Schedules';
import officeBookings from './manager/officeBookings/officeBookings';
import Calendar from './manager/calendar/Calendar';
import Statistics from './manager/statistics/Statistics';
import Feedback from './manager/feedback/Feedback';
import ManageUsers from './admin/manage-users/ManageUsers';
import { getBookingsData } from '../../actions/bookingsAction';

/**
 * Dashboard
 * @desc    This is comprised of a side navigation and inner page component
 *          Each inner component will be responsible or retrieving its own content
 */
class Dashboard extends Component {
  componentDidMount() {
    this.props.getBookingsData();
  }

  render() {
    // const { user } = this.props.auth;

    // get match prop which contains url and route path
    const { match } = this.props;

    // On dashboard load, check which tab was previously selected and
    // set that tab to load if no other path specified.
    const { activeTab } = this.props.dashboard;

    /**
     * Always show Sidebar,
     * Links to Routes are contained in the Sidebar component
     */
    return (
      <div className='content d-flex flex-row'>
        <div>
          {/* Side bar is always shown, 
                        since it is not inside a route, 
                        we pass match so it is aware of its path and url 
                    */}
          <SideBar match={match} />
        </div>

        <div className='flex-grow-1'>
          <Switch>
            <Route path={`${match.path}/get-started`} component={GetStarted} />
            <Route
              path={`${match.path}/manage-schedules`}
              component={Schedules}
            />
            <Route
              path={`${match.path}/manage-users`}
              component={ManageUsers}
            />
            <Route path={`${match.path}/view-schedules`} component={officeBookings} />
            <Route path={`${match.path}/calendar`} component={Calendar} />
            <Route path={`${match.path}/statistics`} component={Statistics} />
            <Route path={`${match.path}/feedback`} component={Feedback} />
            <Route
              exact
              path={match.path}
              render={() => <Redirect to={`/dashboard/${activeTab}`} />}
            />
            <Route component={Error404} />
          </Switch>
        </div>
      </div>
    );
  }
}

// Declare property types
Dashboard.propTypes = {
  // auth: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

// Map state to props
const mapStateToProps = state => ({
  // auth: state.auth,
  dashboard: state.dashboard
});

export default connect(
  mapStateToProps,
  {
    getBookingsData
  }
)(Dashboard);
