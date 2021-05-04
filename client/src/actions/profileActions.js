import axios from 'axios';

import { GET_ERRORS, GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';

/**
 * @module ProfileActions
 */


/**
 * Get the Profile for the current user
 * @private
 */

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('api/profile/current')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS, // TODO 046, what to do if no profile found for this user or db error?
        payload: {}
      })
    );
};


/**
 * @name    setProfileLoading
 * @desc   loading feature used for spinner when 
 *         the profile is fetching from api request
 */
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};


/**
 * @name    clearProfile
 * @desc   clear the current profile from state
 */
export const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};