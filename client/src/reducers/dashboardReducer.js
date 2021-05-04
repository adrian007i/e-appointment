import { SET_ACTIVE_BUTTON, SET_DASHBOARD_COLLAPSE } from '../actions/types';

const initialState = {
  activeTab: 0,
  collapse: false,
  schedule: {}
};

/**
 * Redux Reducer for Dashboard Actions
 * @module DashboardReducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_BUTTON:
      return {
        ...state,
        activeTab: action.payload
      };
    case SET_DASHBOARD_COLLAPSE:
      return {
        ...state,
        collapse: action.payload
      };
    default:
      return state;
  }
};