import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Help extends Component {
  render() {
    return (
      <div className='content my-4 p-4'>
        <div className='container rounded p-4 shadow'>
          <div className='text-center'>
            <h1>Help</h1>
            <hr />
          </div>
          <h2>To Book</h2>
          <ol>
            <li>Sign up or login</li>
            <li>Select a schedule on the homepage</li>
            <li>Select an available time and date</li>
            <li>book your appointment</li>
          </ol>
          <br />
          <h2>View Bookings</h2>
          <ol>
            <li>View your bookings from the "my bookings" tab</li>
          </ol>
          <small>
            <br />
            If you stil have questions, contact customer support.
          </small>
        </div>
      </div>
    );
  }
}

// Map all properties to PropTypes for React good practice
Help.propTypes = {};

// Map state to props
const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Help);
