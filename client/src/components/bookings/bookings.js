import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../common/Spinner';
/**
 * @module    Bookings
 * @desc    Returns the details for s specific schedule
 */

class Bookings extends Component {
  constructor(props) {
    super(props);
    //state to store bookings data
    this.state = {
      data: null
    };
    this.userClickScheduleTimeForBooking = this.userClickScheduleTimeForBooking.bind(
      this
    );
  }

  /**
   * @desc    Fetches all bookings for a schedule
   */
  componentDidMount() {
    const scheduleUrl =
      '/api/users/viewSchedules/details/' +
      this.props.match.params.scheduleName;

    //call to api
    axios
      .get(scheduleUrl)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => {});
  }

  /**
   * @desc    When the user clicks a time block
   */
  userClickScheduleTimeForBooking({ currentTarget }) {
    //formatting the date and time
    const book_for =
      'Date: ' +
      currentTarget.parentElement.parentElement.firstChild.firstChild.data +
      '-' +
      new Date().getFullYear() +
      ' Time: ' +
      currentTarget.value;

    //data to be stored
    const bookingData = {
      length_of_appointment: this.state.data.length_of_appointment,
      schedule_name: this.state.data.name,
      description: this.state.data.description,
      requirements: this.state.data.requirements,
      office_name: this.state.data.office.office_name,
      booked_for: book_for,
      schedule_owner: this.state.data.schedule_owner
    };

    //user must confirm before booking
    const confirmation = window.confirm(
      'Are you sure you wish to book this schedule for ' + book_for
    );
    if (confirmation) {
      axios
        .post('/api/users/book', bookingData)
        .then(res => {})
        .catch(err => {
          //alerts the appropriate error message
          let errorMessage = '';
          if (err.response.status === 401) {
            errorMessage = 'Sorry You must be logged in';
          } else if (err.response.status === 400) {
            errorMessage = 'This time has already been booked';
          } else {
            errorMessage = 'Oops Something went wrong.';
          }
          alert(errorMessage);
        });
    }
  }

  render() {
    //each time block
    const timeLinks = [];

    //each booking days also contains a time block array
    const bookingDays = [];

    let showContent;
    if (this.state.data === null) {
      // display spinner until content is loaded
      showContent = <Spinner />;
    } else {
      //start and end time is dynamically pulled from office info to generate time block withing range
      let startTime = this.state.data.office.office_times.time_from;
      let endTime = this.state.data.office.office_times.time_to;
      let appointmentLength = this.state.data.length_of_appointment;

      //JS dates use 24 hour system
      if (startTime > endTime) {
        endTime += 12;
      }

      //creating blocks from tomorrow onwards
      let beginingOfBookingTimes = new Date();
      beginingOfBookingTimes.setDate(new Date().getDate() + 1);
      beginingOfBookingTimes.setHours(startTime);
      beginingOfBookingTimes.setMinutes(0);

      let endingOfBookingTimes = new Date();
      endingOfBookingTimes.setDate(new Date().getDate() + 1);
      endingOfBookingTimes.setHours(endTime);
      endingOfBookingTimes.setMinutes(0);

      //dynamically create time blocks and add to timeLinks array[]
      while (
        beginingOfBookingTimes.getTime() < endingOfBookingTimes.getTime()
      ) {
        let temp = beginingOfBookingTimes.getHours();
        let amPm = ' AM';

        if (temp > 12) {
          temp -= 12;
          amPm = ' PM';
        }

        let mins = beginingOfBookingTimes.getMinutes();
        if (mins === 0) {
          mins = '00';
        }

        timeLinks.push(
          <div key={beginingOfBookingTimes + ':' + mins + amPm}>
            <button
              data-toggle='modal'
              style={{ width: '98%' }}
              className='btn btn-sm btn-success my-1'
              value={temp + ':' + mins + amPm}
              onClick={this.userClickScheduleTimeForBooking}
            >
              {temp + ':' + mins + amPm}
            </button>
            <br />
          </div>
        );

        beginingOfBookingTimes.setMinutes(
          beginingOfBookingTimes.getMinutes() + appointmentLength
        );
      }

      //how much day we want the appointment to run for (at present it is 5 )
      for (let date = 1; date <= 7; date++) {
        //this excludes saturdays and sundays
        if (
          beginingOfBookingTimes.getDay() !== 0 &&
          beginingOfBookingTimes.getDay() !== 6
        ) {
          bookingDays.push(
            <div className='col-sm-2' key={beginingOfBookingTimes}>
              <h2>
                {beginingOfBookingTimes.getDate() +
                  '-' +
                  parseInt(beginingOfBookingTimes.getMonth() + 1)}
              </h2>
              <br />
              {timeLinks}
            </div>
          );
        }

        beginingOfBookingTimes.setDate(beginingOfBookingTimes.getDate() + 1);
      }

      showContent = (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm-6 p-2 bg-black'>
              <iframe
                src={this.state.data.office.office_location}
                title='map'
                height='100%'
                width='100%'
                frameBorder='0'
                style={{ border: '0' }}
                allowFullScreen
              />
            </div>
            <div className='col-sm-2 bg-black p-4 white'>
              <h2 style={{ color: '#FF6347' }}>
                {this.state.data.office.office_name}
              </h2>
              <p> # {this.state.data.office.office_phone} </p>
            </div>

            <div className='col-sm-4 bg-black p-4 white'>
              <h2 style={{ color: '#FF6347' }}>{this.state.data.name}</h2>
              <p> {this.state.data.description}</p>
              <hr />
              <h2 style={{ color: '#FF6347' }}>Additional Info</h2>
              <pre style={{ color: 'white' }}>
                {this.state.data.requirements}
              </pre>
            </div>
            {}
          </div>
          <br />

          <h1>Select your time to book for {new Date().getFullYear()}</h1>
          <hr />

          <div className='container text-center '>
            <div className='row'>
              <div className='col-sm-1' />
              {bookingDays}
            </div>
          </div>
        </div>
      );
    }

    return <div className='content'>{showContent}</div>;
  }
}

export default Bookings;
