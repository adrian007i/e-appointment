import axios from 'axios';

// import types for use when dispatching
import {
  GET_ERRORS,
  GET_BOOKINGS_DATA,
  BOOKINGS_DATA_LOADING,
  CLEAR_CURRENT_BOOKINGS_DATA
} from './types';

/**
 * @name    getBookingsData
 * @Desc    makes axios request to /api/schedule/bookings/all
 *
 */
export const getBookingsData = () => dispatch => {
  // set the loading state of the component
  dispatch(setBookingsDataLoading());
  // get the data
  axios
    .get('/api/schedule/bookings/all')
    .then(res => {
      dispatch({
        type: GET_BOOKINGS_DATA,
        payload: res.data
      });
    })
    .catch(err => {
      // if 404 not found, send the error object in the response.data to the reducer
      // if 500 or any other, create and send a new error object.
      let errors;
      if (err.response.status === 404) {
        errors = err.response.data;
      } else {
        errors = { server: 'Internal Server Error' };
      }
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};

/**
 * @name    setBookingsDataLoading
 * @desc   set loading to be true for Schedules component
 */
export const setBookingsDataLoading = () => {
  return {
    type: BOOKINGS_DATA_LOADING
  };
};

/**
 * @name    clearBookingsData
 * @desc   clear the current schedule data from state
 */
export const clearBookingsData = () => {
  return {
    type: CLEAR_CURRENT_BOOKINGS_DATA
  };
};
