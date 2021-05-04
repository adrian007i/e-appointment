import axios from 'axios';

// import types for use when dispatching
import {
  GET_SCHEDULES_AVAILABLE,
  SCHEDULEDATA_LOADING,
  GET_ERRORS
} from './types';

/**
 * @name    getSchedulesAvailable
 * @Desc    grab all the schedules available to then display
 *
 
 */

export const getSchedulesAvailable = () => dispatch => {
  // set the loading state of the component
  dispatch(setScheduleDataLoading());
  // get the data

  axios
    .get('api/users/viewSchedules')
    .then(res => {
      dispatch({
        type: GET_SCHEDULES_AVAILABLE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const setScheduleDataLoading = () => {
  return {
    type: SCHEDULEDATA_LOADING
  };
};
