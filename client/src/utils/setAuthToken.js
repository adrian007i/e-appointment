import axios from 'axios';

const setAuthToken = token => {
  // if token exists, then apply token to all requests, if not then delete
  if (token) {
    // Apply to every future request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth from any future request
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;