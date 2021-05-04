import {
  GET_SCHEDULES_AVAILABLE,
  SCHEDULEDATA_LOADING,
  GET_ERRORS
} from '../actions/types';

const initialState = {
  userSchedules: null,
  errors: null,
  loading: false
};

/**
 * Redux Reducer for profile Actions
 * @module userSchedulesReducers
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SCHEDULEDATA_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SCHEDULES_AVAILABLE:
      return {
        ...state,
        userSchedules: action.payload,
        loading: false,
        errors: null
      };
    case GET_ERRORS:
      return {
        ...state,
        userSchedules: null,
        errors: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
