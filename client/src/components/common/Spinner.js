import React, { Component } from 'react';

/**
 * Shows a spinning double arrow icon, Used to indicated something is loading.
 * 
 */
class Spinner extends Component {

  /**
   * Render the React Componeent
   * @returns {JSX}  - Code to be rendered
   */
  render() {
    return (
      <div className='text-center'>
        <i className='spinner material-icons' style={{ fontSize: '2rem' }}>autorenew</i>
        <p><small>Please Wait...</small></p>
      </div>
    );
  }
}

export default Spinner;
