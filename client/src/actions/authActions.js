import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwtDecode from "jwt-decode";

// import types for use when dispatching
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// further actions
import { clearProfile } from "./profileActions";
import { clearScheduleData } from "./scheduleActions";
import { clearBookingsData } from "./bookingsAction";

/**
 * @name    registerUser
 * @Desc    Register a User Action,
 *          Post UserData to api/register,
 *          On Success: redirect to login
 *          On Fail: send errors back to component
 *
 * @param {*} userData : object containing registration data
 * @param {*} history  : used for routing and redirecting
 */
export const registerUser = (userData, history) => dispatch => {
  // post data to the api
  axios
    .post("/api/users/register", userData)
    .then(res => {
      history.push("/login");

      //alerts the user to confirm their email
      setTimeout(() => {
        alert("Please confirm your email at " + userData.email);
      }, 1000);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // save token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // set token to Authorization header in future axios requests
      // now all future requests will automatically include the Authorization token
      // and the backend api can verify if the user is logged in.
      setAuthToken(token);
      // Decode token, save user data
      const decoded = jwtDecode(token);
      // save user data in Redux state
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - logout the user
export const logoutUser = () => dispatch => {
  // clear all sensitive data from state
  dispatch(clearUserDataFromState());

  // remove token from localstorage
  localStorage.removeItem("jwtToken");

  // this will delete the authtoken from future requests
  setAuthToken(false);

  // set current user to empty object,
  // isAuthenticated will be changed to false
  dispatch(setCurrentUser({}));
};

// Login, Set the user in State
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

/**
 * @name    clearUserDataFromState
 * @desc    clears all sensitve data from state when (runs on user user logout)
 */
export const clearUserDataFromState = () => dispatch => {
  // Clear current profile if in state
  dispatch(clearProfile());
  dispatch(clearScheduleData());
  dispatch(clearBookingsData());
};
