import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// sub components
import SideBarButton from './SideBarButton';

import { setDashboardCollapse } from '../../../../actions/dashboardActions';
import { UserRoles } from '../../../../utils/UserRoles';

/**
 * (React Component) Responsive Navigation Side Bar for Dashboard.
 *
 * @property {Object} match                 - Route match object containing url and route information.
 * @property {Object} auth                  - Authorized user data.
 * @property {Object} dashboard             - Dashboard state data.
 * @property {Action} setDashboardCollapse  - Saves the collapsed state of the dashboard.
 *
 */
class SideBar extends Component {
  /**
   * Render the React Componeent
   * @returns {JSX}  - Code to be rendered
   */
  render() {
    // grab user object
    const { user } = this.props.auth;

    // match is passed in as a property via dashboard (since this component isn't loaded via a route)
    const { match } = this.props;

    // collapse state of the sidebar from state
    const { collapse } = this.props.dashboard;
    //const collapse = collapseStringValue === 'true'; // convert string to boolean

    // set tabs based on user role
    let tabs = <div />;
    //const commonProps = { isCollapsed: collapse, match: match };
    if (user.role === UserRoles.AppointmentManager) {
      tabs = (
        <div>
          <SideBarButton
            title='Get Started'
            icon='assignment_turned_in'
            match={match}
          />
          <SideBarButton
            title='Manage Schedules'
            icon='event_note'
            match={match}
          />
          <SideBarButton title='View Schedules' icon='pageview' match={match} />
          <SideBarButton title='Calendar' icon='today' match={match} />
          <SideBarButton title='Statistics' icon='trending_up' match={match} />
          <SideBarButton title='Feedback' icon='feedback' match={match} />
        </div>
      );
    } else if (user.role === UserRoles.Admin) {
      tabs = (
        <div>
          <SideBarButton title='Manage Users' icon='people' match={match} />
          <SideBarButton title='Statistics' icon='trending_up' match={match} />
          <SideBarButton title='Feedback' icon='feedback' match={match} />
        </div>
      );
    }

    return (
      <div
        className={
          'sidebar bg-black white py-2' + (collapse ? ' sidebar-collapse' : '')
        }
        id='sidebar'
      >
        {/* Top right corner Arrow button */}
        <button
          className='btn btn-sm btn-dark ml-auto mr-2 pb-0 mb-2 d-none d-md-block'
          type='button'
          aria-expanded={collapse ? 'true' : 'false'}
          aria-controls='sidebar'
          onClick={() => {
            // sidebar collapse
            this.props.setDashboardCollapse(!collapse);
          }}
        >
          {/* Rotate This Arrow Icon, looks like: -> in collapse state and: <- when sidebar expanded  */}
          <i
            className='material-icons white'
            style={
              collapse
                ? { transform: 'rotate(0deg)' }
                : { transform: 'rotate(180deg)' }
            }
          >
            forward
          </i>
        </button>
        {/* End Top right corner Arrow button */}

        {/* Navigation tabs based on user role */}
        <div
          className='nav flex-column nav-pills'
          role='navigation'
          aria-label='Dashboard navigation'
        >
          {tabs}
        </div>
      </div>
    );
  }
}

// Set prop types
SideBar.propTypes = {
  match: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
  setDashboardCollapse: PropTypes.func.isRequired
};

// Map state to props
const mapStateToProps = state => ({
  auth: state.auth,
  dashboard: state.dashboard
});

export default connect(
  mapStateToProps,
  { setDashboardCollapse }
)(SideBar);
