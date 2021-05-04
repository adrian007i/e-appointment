import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import Title from '../../common/title/Title';

class Calendar extends Component {
  render() {

    // const { activeTab } = this.props.dashboard;

    return (
      <div className='dashboard-content p-3'>
        <Title value='Calendar Settings' />


        <div className='dashboard-inner-content border rounded'>
          <div className='p-4'>
            <div className='my-4 p-4'>
              <h2 className='mb-2 d-flex'>Calendar Integrations.</h2>

              <small>This feature will allow you to import your calendar settings from google or outlook. It will also allow you to set up and modify public holidays and so on.</small>
            </div>
            <small className='d-flex align-items-center'><i className='material-icons mr-2'>free_breakfast</i>We haven't got around to designing this feature yet. We will get to work on it soon.</small>

          </div>

        </div>
      </div>
    );
  }
}


// TODO set the prop types
/*
Calendar.propTypes = {
};
*/

// Map state to props 
const mapStateToProps = (state) => ({
  dashboard: state.dashboard
});

export default connect(mapStateToProps)(Calendar);