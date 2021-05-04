import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../../common/Spinner';

class OfficeBookings extends Component {
  render() {
    const { bookingData, errors, loading } = this.props.bookings;

    let showContent;

    if ((bookingData === null && errors === null) || loading) {
      // display spinner until content is loaded
      showContent = (
        <tr>
          <td>
            {' '}
            <Spinner />
          </td>
        </tr>
      );
    } else {
      //create an array to hold user bookings
      const citizenBookings = [];
      //if there is bookings
      if (bookingData) {
        let seporator = '';
        for (const book of bookingData) {
          let rowColor = '#CAFFCC';
          const dateBookArray = book.booked_for.split(' ')[1].split('-');

          //checking to see if booking has passed to set the background to pink
          if (
            new Date() >
            new Date(
              parseInt(dateBookArray[2]),
              parseInt(dateBookArray[1]) - 1,
              parseInt(dateBookArray[0])
            )
          )
            rowColor = '#FFCAD2';
          //this seporates bookings categories e.g dental, flu shots
          let seporatorSpacer = 'none';
          if (seporator !== book.schedule_name) {
            seporatorSpacer = '30px solid #fff';
            seporator = book.schedule_name;
          }

          //inserting bookings in myBookingsList array
          citizenBookings.push(
            <tr
              key={book.email + book.booked_for}
              style={{ background: rowColor, borderTop: seporatorSpacer }}
            >
              <td>{book.schedule_name}</td>
              <td>{book.name}</td>
              <td>{book.email}</td>

              <td>{book.booked_for}</td>
              <td>
                {book.date_of_book.substring(0, 19).replace('T', '  -  ')}
              </td>
            </tr>
          );
        }
        // sets rows of booking to show content
        showContent = citizenBookings;
      }
      //if the user has made no bookings
      if (citizenBookings.length === 0) {
        showContent = (
          <tr>
            <td>
              {' '}
              <h2>
                <br />
                <br /> No Bookings Made So Far ...
              </h2>
            </td>
          </tr>
        );
      }
    }

    return (
      <div>
        <h1>Citizens Bookings</h1>
        <hr />
        <div className='container-fluid' style={{ overflowX: 'auto' }}>
          <table style={{ minWidth: '800px', width: '100%' }}>
            <thead>
              <tr>
                <th scope='col'>Booked By</th>
                <th scope='col'>Booker Email</th>
                <th scope='col'>Appointment</th>
                <th scope='col'>Booked For</th>
                <th scope='col'>Booked On</th>
              </tr>
            </thead>

            <tbody>{showContent}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

OfficeBookings.propTypes = {
  bookings: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// Map state to props
const mapStateToProps = state => ({
  bookings: state.bookings,
  errors: state.errors
});

export default connect(mapStateToProps)(OfficeBookings);
