import React, { Component } from 'react';

/**
 * Denied
 * @desc    This Component displays when a user is trying to
 *          access a route they don't have permission to view
 */
class Denied extends Component {
  render() {
    return (
      <div className='content'>
        <div className='text-center'>
          <h1>Permission Denied.</h1>
          <p>You do not have permission to access this feature.</p>
        </div>

      </div>
    );
  }
}

export default Denied;
