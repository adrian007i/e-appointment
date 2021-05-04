/**
 * Action Types for use in Redux Actions
 * These are standard and should not change.
 */

// User
export const GET_ERRORS = 'GET_ERRORS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

// user profile
export const GET_PROFILE = 'GET_PROFILE';
export const PROFILE_LOADING = 'PROFILE_LOADING';
export const PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND'; // not used yet
export const CLEAR_CURRENT_PROFILE = 'CLEAR_CURRENT_PROFILE';

// not used TODO delete?
export const GET_PROFILES = 'GET_PROFILES';

// dashboard
export const SET_ACTIVE_BUTTON = 'SET_ACTIVE_BUTTON';
export const SET_DASHBOARD_COLLAPSE = 'SET_DASHBOARD_COLLAPSE';

// schedules
export const GET_SCHEDULE = 'GET_SCHEDULE';
export const GET_SCHEDULEDATA = 'GET_SCHEDULEDATA';
export const GET_SCHEDULEDATA_ERROR = 'GET_SCHEDULEDATA_ERROR';
export const SCHEDULEDATA_LOADING = 'SCHEDULEDATA_LOADING';
export const CLEAR_CURRENT_SCHEDULEDATA = 'CLEAR_CURRENT_SCHEDULEDATA';

//user schedules/bookings
export const GET_SCHEDULES_AVAILABLE = 'GET_SCHEDULES_AVAILABLE';

//Bookings
export const GET_BOOKINGS_DATA = 'GET_BOOKINGS_DATA';
export const BOOKINGS_DATA_LOADING = 'BOOKING_DATA_LOADING';
export const CLEAR_CURRENT_BOOKINGS_DATA = 'CLEAR_CLEAR_BOOKING_DATA';
