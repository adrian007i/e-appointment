import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// components
import Spinner from '../../../common/Spinner';

/**
 * @name    SelectLocation
 * @desc    From a list of Schedule locations,
 *          Go to schedules for that location or create a new one.
 */
class SelectLocation extends Component {
  render() {
    // match for url and path
    const { match } = this.props;

    // get scheduledata from state
    const { scheduleData, errors, loading } = this.props.schedules;

    let showContent;

    if ((scheduleData === null && errors === null) || loading) {
      // display spinner until content is loaded
      showContent = <Spinner />;
    } else {
      // get location names from scheduleData and create links from them
      const scheduleLinks = [];
      if (scheduleData) {
        for (const schedule of scheduleData) {
          let colorOfIcon = 'red';
          if (schedule.active) {
            colorOfIcon = 'green';
          }

          scheduleLinks.push(
            <Link
              key={schedule.name} // React requires key attribute in lists for consistency
              to={`${match.url}/updateSchedule/${schedule.name}`}
              className='list-group-item list-group-item-action'
            >
              <div className='d-flex flex-row align-items-center'>
                <div>
                  <i
                    className='material-icons mr-2'
                    style={{ color: colorOfIcon }}
                  >
                    play_arrow
                  </i>
                </div>
                <div>
                  {schedule.name}
                  <div>
                    <small>{schedule.description}</small>
                  </div>
                </div>
              </div>
            </Link>
          );
        }
        // set content to be list of locations and create new location option
        showContent = (
          <div>
            {/* List of Locations */}
            <div className='list-group dashboard-selection-list'>
              {scheduleLinks}
            </div>
          </div>
        );
      } else {
        // No schedule data has been created yet. For this user.
        showContent = (
          <div>
            <p>No Schedules have been created yet. get started ...</p>
          </div>
        );
      }
    }

    return (
      <div className='dashboard-inner-content border rounded'>
        <nav
          aria-label='breadcrumb'
          className='dashboard-inner-title px-3 rounded-top d-flex align-items-center justify-content-between'
        >
          <ol className='breadcrumb bg-black m-0'>
            <li className='breadcrumb-item active' aria-current='page'>
              Schedules
            </li>
          </ol>
        </nav>
        <div className='p-4 mt-2'>
          <button className='btn btn-small btn-dark d-flex my-2'>
            <Link
              to={`${match.path}/schedule/create`}
              style={{ color: 'white' }}
            >
              <i
                className='material-icons white'
                style={{ verticalAlign: 'middle', paddingRight: '10px' }}
              >
                add
              </i>
              Create a New Schedule
            </Link>
          </button>

          <br />
          {showContent}
        </div>
      </div>
    );
  }
}

// set the prop types
SelectLocation.propTypes = {
  schedules: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

// Map state to props
const mapStateToProps = state => ({
  schedules: state.schedules,
  errors: state.errors
});

export default connect(mapStateToProps)(SelectLocation);
