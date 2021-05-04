import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Title
 * @desc    Title of the current dashboard tab
 * 
 * @prop    value: The title string to display
 */
class Title extends Component {
  render() {
    return (
      <div className='dashboard-title mb-4' >
        <h1>{this.props.value}</h1>
      </div >
    );
  }
}


// set the prop types for debugging
Title.propTypes = {
  value: PropTypes.string.isRequired
};

export default Title;