import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import dashboardReducer from './dashboardReducer';
import scheduleReducer from './scheduleReducer';
import userSchedulesReducer from './userSchedulesReducer';
import bookingsReducer from './bookingsReducer';

/**
 * combines reducers
 * @module index
 */

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  dashboard: dashboardReducer,
  schedules: scheduleReducer,
  userSchedules: userSchedulesReducer,
  bookings: bookingsReducer
});
