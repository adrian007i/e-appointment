import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// components
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';

/**
 * @module    MyBookings
 * @desc    Returns all the bookings of a specific user
 */

class MyBookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  /**
   * @desc   on mount Fetches all bookings of a user
   */
  componentDidMount() {
    axios
      .get('/api/users/myBookings')
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => {});
  }

  render() {
    let showContent;

    const dataFromState = this.state.data;
    if (dataFromState === null) {
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
      const myBookingsList = [];

      //if there is bookings
      if (dataFromState) {
        //loop each booking
        for (const book of dataFromState) {
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

          //inserting bookings in myBookingsList array
          myBookingsList.push(
            <tr
              key={book.email + book.booked_for}
              style={{ background: rowColor }}
            >
              <td>{book.schedule_name}</td>
              <td>{book.booked_for}</td>
              <td>{book.date_of_book.substring(0, 10)}</td>
              <td>{book.length_of_appointment}</td>
              <td>
                <Link to={'/bookings/' + book.schedule_name}>click here</Link>
              </td>
              <td>Print Details</td>
            </tr>
          );
        }
        // sets rows of booking to show content
        showContent = myBookingsList;
      }
      //if the user has made no bookings
      if (myBookingsList.length === 0) {
        showContent = (
          <tr>
            <td>
              <h2>No Bookings Made So Far ...</h2>
            </td>
          </tr>
        );
      }
    }

    return (
      <div>
        <h1>My Bookings</h1>
        <hr />
        <div className='container-fluid' style={{ overflowX: 'auto' }}>
          <table style={{ minWidth: '800px', width: '100%' }}>
            <thead>
              <tr>
                <th scope='col'>Appointment</th>
                <th scope='col'>Booked For</th>
                <th scope='col'>Booked On</th>
                <th scope='col'>Time of Service</th>
                <th scope='col'>More Info</th>
                <th scope='col'>Print</th>
              </tr>
            </thead>

            <tbody>{showContent}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

MyBookings.propTypes = {};

// Map state to props
const mapStateToProps = state => ({});
export default connect(mapStateToProps)(MyBookings);
