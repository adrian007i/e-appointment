import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index.js';

// initial state is empty
const initialState = {};

// thunk is used for async interactions with the store. 
const middleware = [thunk];

// devtools enhancer.
// first we test to see if the devtools functions exist (these are available from window, as in your browser), if not we use a dumb function instead.
const devFunc = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  : function (a) { return a; };

// create the store, use our combined reducers, empty initial state, thunk middleware and if avaialable: the devtools enhancer.    
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    devFunc
  )
);

export default store;