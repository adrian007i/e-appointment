
// import types for use when dispatching
import { SET_ACTIVE_BUTTON, SET_DASHBOARD_COLLAPSE } from './types';

/**
 * All Redux actions for the dashboard
 * @module DashboardActions
 */


/**
 * Save the 'active' tab (sidebar button) when it is selected. 
 * The active button id is saved to state and localstorage. 
 * When the user revisits the dashboard, it will remember the last 'tab' they were on. 
 * @param {String} activeTab - id of active tab.
 */
export const setActiveTab = (activeTab) => dispatch => {
  // save the active button into local storage, 
  // On page load, it will check for this value and load it (utils/loadAppData.js)
  localStorage.setItem('dashboard_active_tab', activeTab);
  dispatch({
    type: SET_ACTIVE_BUTTON,
    payload: activeTab
  });
};

/**
 * Save the collapse state of the dashboard to state and localstorage.
 * When the user revisits the dashboard, it will remember the collapsed state.
 * @param {String} collapse - state of dashboard, collaped or not. (boolean as string).
 */
export const setDashboardCollapse = (collapse) => dispatch => {
  // save to local storage, see utils/loadAppData
  localStorage.setItem('dashboard_collapse', collapse);
  dispatch({
    type: SET_DASHBOARD_COLLAPSE,
    payload: collapse
  });
};