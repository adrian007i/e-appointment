import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '../../img/brand/Logo.png';
import Spinner from '../../components/common/Spinner';
import { getSchedulesAvailable } from '../../actions/userSchedulesActions';

/**
 * Landing
 * @desc    The home page for the application. It should contain
 *          some help info and links to areas the user is allow
 *          to visit.
 */
class Landing extends Component {
  componentDidMount() {
    this.props.getSchedulesAvailable();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    //const { match } = this.props;

    // get userSchedules from state

    const { userSchedules, errors, loading } = this.props.userSchedules;
    let showContent;
    if ((userSchedules === null && errors === null) || loading) {
      // display spinner until content is loaded
      showContent = <Spinner />;
    } else {
      // get the name and description of all schedules
      const userScheduleLinks = [];
      if (userSchedules) {
        for (const schedule of userSchedules) {
          const scheduleUrl = '/bookings/' + schedule.name;
          userScheduleLinks.push(
            <div
              key={schedule.name}
              className='col-sm-4 landing-category p-4'
              style={{ borderBottom: '3px solid #bd2025' }}
            >
              <div className='d-flex flex-row align-items-center'>
                <div className='text-left'>
                  <h2>
                    <Link to={scheduleUrl}>{schedule.name}</Link>
                  </h2>
                  <small>{schedule.description}</small>
                </div>
              </div>
            </div>
          );
        }
        // set content
        showContent = (
          <div className='row'>
            {/* List of Locations */}

            {userScheduleLinks}
          </div>
        );
      } else {
        // No schedule data has been created yet. For this user.
        showContent = (
          <div>
            <p>No Schedules to book at the moment</p>
          </div>
        );
      }
    }

    let actionsContent;
    if (isAuthenticated) {
      actionsContent = <div>&nbsp;</div>;
    } else {
      actionsContent = (
        <div>
          <Link className='btn btn-sm btn-success ml-2' to='/login'>
            Login
          </Link>
          <Link className='btn btn-sm btn-primary ml-2' to='/register'>
            Register
          </Link>
        </div>
      );
    }

    return (
      <div className='content'>
        {/* Carousel */}
        <div
          id='carouselIndicators'
          className='carousel slide'
          data-ride='carousel'
        >
          <ol className='carousel-indicators'>
            <li
              data-target='#carouselIndicators'
              data-slide-to='0'
              className='active'
            />
            <li data-target='#carouselIndicators' data-slide-to='1' />
          </ol>
          <div className='carousel-inner'>
            <div className='carousel-item active'>
              <div className='d-flex align-items-center justify-content-center'>
                <div className='whitebox text-center w-50 rounded p-4'>
                  <img
                    src={logo}
                    className='mx-auto text-center'
                    style={{ width: '150px' }}
                    alt='logo'
                  />
                  <h1>Book In</h1>
                  <p>Book appointments for Government Services.</p>
                </div>
              </div>
            </div>
            <div className='carousel-item'>
              <div className='d-flex align-items-center justify-content-center'>
                <div className='whitebox w-50 rounded p-4'>
                  <h2>Welcome to Bookin</h2>
                  <p>Tthe best way to book</p>
                </div>
              </div>
            </div>
          </div>
          <a
            className='carousel-control-prev'
            href='#carouselIndicators'
            role='button'
            data-slide='prev'
          >
            <span className='carousel-control-prev-icon' aria-hidden='true' />
            <span className='sr-only'>Previous</span>
          </a>
          <a
            className='carousel-control-next'
            href='#carouselIndicators'
            role='button'
            data-slide='next'
          >
            <span className='carousel-control-next-icon' aria-hidden='true' />
            <span className='sr-only'>Next</span>
          </a>
        </div>
        {/* End Carousel */}

        <div className='container mx-auto text-right my-4'>
          <form className='form-inline my-4'>
            <div className='input-group ml-auto'>
              <div className='input-group-prepend'>
                <span className='input-group-text' id='search-text'>
                  <i className='material-icons'>search</i>
                </span>
              </div>
              <input
                type='text'
                className='form-control'
                placeholder='search'
                aria-label='search for'
                aria-describedby='search-text'
              />
            </div>
            <div className='input-group'>{actionsContent}</div>
          </form>

          <div className='text-center'>
            <h1>Appointments you can book today!</h1>
          </div>

          <div className='landing-links'>
            {/*Content for schedules available for booking*/}

            {showContent}
          </div>

          <div className='text-center mt-4'>
            <button>View all</button>
          </div>
        </div>
      </div>
    );
  }
}

// set Proptypes
Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  userSchedules: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// Map state to props
const mapStateToProps = state => ({
  auth: state.auth,
  userSchedules: state.userSchedules,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getSchedulesAvailable }
)(Landing);
