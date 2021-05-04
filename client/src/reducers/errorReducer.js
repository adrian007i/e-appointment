import { GET_ERRORS } from '../actions/types';

// nothing for initial state
const initialState = {};

/**
 * Redux Reducer for Errors
 * @module errorReducer
 */

export default (state = initialState, action) => {
  switch (action.type) {
    // on get errors, return the errors object from payload
    case GET_ERRORS:
      return action.payload;
    // by default just return the state
    default:
      return state;
  }
};
