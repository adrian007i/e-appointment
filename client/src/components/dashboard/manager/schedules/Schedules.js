import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { getSchedules } from '../../../../actions/scheduleActions';

// components
import Error404 from '../../../common/Error404';
import Title from '../../common/title/Title';
import SelectSchedule from './SelectSchedule';
import ScheduleForm from './ScheduleForm';
import UpdateScheduleForm from './updateScheduleForm';

/**
 * Shedules
 * @desc    Find schedules belonging to user,
 *          Allow navigation between them
 *          CRUD functions for each schedule on each form (sub component)
 */
class Schedules extends Component {
  /**
   * On Mount, the component should find the schedules associated with user.
   */
  componentDidMount() {
    this.props.getSchedules();
  }

  render() {
    // get match for url and path
    const { match } = this.props;

    return (
      <div className='dashboard-content p-3'>
        <Title value='Manage Schedules' />

        <Switch>
          <Route
            exact
            path={`${match.path}/schedule/create`}
            component={ScheduleForm}
          />
          <Route
            path={`${match.path}/updateSchedule/:scheduleName`}
            component={UpdateScheduleForm}
          />
          <Route exact path={match.path} component={SelectSchedule} />
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }
}

// set the prop types
Schedules.propTypes = {
  getSchedules: PropTypes.func,
  match: PropTypes.object.isRequired
};

export default connect(
  null,
  { getSchedules }
)(Schedules);
