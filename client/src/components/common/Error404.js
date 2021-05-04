import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Sleep Image
import sleeping from '../../img/brand/sleep.png';

/**
 * (React Component) This Component displays A friendly 404 page
 */
class Error404 extends Component {

  /**
   * Render the React Componeent
   * @returns {JSX}  - Code to be rendered
   */
  render() {
    return (
      <div className='content'>
        <div className='text-center my-4 d-flex justify-content-center'>
          <div className='border rounded p-4'>
            <img src={sleeping} style={{ width: '150px' }} alt='Tired Worker' />
            <h1>Sorry.</h1>
            <p>We could not find what you were looking for.</p>
            <div className='text-left'>
              <p>One of the following might help:</p>
              <ul>
                <li>Check for typos in the address bar.</li>
                <li>Try the <Link to='/help'>Help page.</Link></li>
                <li>Go back to the <Link to='/'>Home page.</Link></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Error404;
