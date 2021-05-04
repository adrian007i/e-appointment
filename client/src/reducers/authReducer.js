import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';

//object to track user state
const initialState = {
  isAuthenticated: false,
  user: {}
};
/**
 * Redux Reducer for user authentiation
 * @module authReducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};
