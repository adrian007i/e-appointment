import {
  GET_BOOKINGS_DATA,
  BOOKINGS_DATA_LOADING,
  CLEAR_CURRENT_BOOKINGS_DATA,
  GET_ERRORS
} from '../actions/types';

const initialState = {
  bookingData: null,
  errors: null,
  loading: false
};

/**
 * Redux Reducer for bookingActions
 * @module bookingReducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case BOOKINGS_DATA_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_BOOKINGS_DATA:
      return {
        ...state,
        bookingData: action.payload,
        loading: false,
        errors: null
      };
    case CLEAR_CURRENT_BOOKINGS_DATA:
      return {
        ...state,
        bookingData: null,
        errors: null
      };
    case GET_ERRORS:
      return {
        ...state,
        bookingData: null,
        errors: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
