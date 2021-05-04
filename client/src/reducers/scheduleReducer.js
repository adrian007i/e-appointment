import {
  GET_SCHEDULEDATA,
  SCHEDULEDATA_LOADING,
  CLEAR_CURRENT_SCHEDULEDATA,
  GET_SCHEDULEDATA_ERROR
} from '../actions/types';

const initialState = {
  scheduleData: null,
  errors: null,
  loading: false
};

/**
 * Redux Reducer for scheduleReducer Actions
 * @module scheduleReducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SCHEDULEDATA_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SCHEDULEDATA:
      return {
        ...state,
        scheduleData: action.payload,
        loading: false,
        errors: null
      };
    case CLEAR_CURRENT_SCHEDULEDATA:
      return {
        ...state,
        scheduleData: null,
        errors: null
      };
    case GET_SCHEDULEDATA_ERROR:
      return {
        ...state,
        scheduleData: null,
        errors: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
