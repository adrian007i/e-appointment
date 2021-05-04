import axios from 'axios';

// import types for use when dispatching
import {
  GET_ERRORS,
  GET_SCHEDULEDATA,
  SCHEDULEDATA_LOADING,
  CLEAR_CURRENT_SCHEDULEDATA,
  GET_SCHEDULEDATA_ERROR
} from './types';

/**
 * @name    createSchedule
 * @Desc    Save a schedule to the database
 *
 * @param {*} scheduleData : object containing schedule data
 * @param {*} history  : used for routing and redirecting
 */
export const createSchedule = (scheduleData, history) => dispatch => {
  // post data to the api
  axios
    .post('/api/schedule/create', scheduleData)
    .then(res => {
      //after the user create a schedule, they are redirected to homepage
      history.push('/dashboard');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

/**
 * @name    updateSchedule
 * @Desc    Saving updatated schedule data to the database
 *
 * @param {*} scheduleData : object containing new schedule data
 * @param {*} history  : used for routing and redirecting
 */
export const updateSchedule = (scheduleData, history) => dispatch => {
  // post data to the api
  axios
    .post('/api/schedule/update', scheduleData)
    .then(res => {
      //after the user update a schedule, they are redirected to dashboard
      history.replace('/dashboard/');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

/**
 * @name    getSchedules
 * @Desc    get all schedule data for a specific appointment manager
 *
 */
export const getSchedules = () => dispatch => {
  // set the loading state of the component
  dispatch(setScheduleDataLoading());
  // get the data
  axios
    .get('/api/schedule/all')
    .then(res => {
      dispatch({
        type: GET_SCHEDULEDATA,
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
        type: GET_SCHEDULEDATA_ERROR,
        payload: errors
      });
    });
};

/**
 * @name    setScheduleDataLoading
 * @desc   set loading to be true for Schedules component
 */
export const setScheduleDataLoading = () => {
  return {
    type: SCHEDULEDATA_LOADING
  };
};

/**
 * @name    clearScheduleData
 * @desc   clear the current schedule data from state
 */
export const clearScheduleData = () => {
  return {
    type: CLEAR_CURRENT_SCHEDULEDATA
  };
};
