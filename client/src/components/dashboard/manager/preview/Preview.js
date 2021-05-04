import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import Title from '../../common/title/Title';

class Preview extends Component {
  render() {

    // const { activeTab } = this.props.dashboard;

    return (
      <div className='dashboard-content p-3'>
        <Title value='Bookings' />


        <div className='dashboard-inner-content border rounded'>
          <div className='p-4'>
            <div className='my-4 p-4'>
              <h2 className='mb-2 d-flex'>Veiw Bookings</h2>

              <small>This feature will allow you to view/cancel bookings or otherwise communicate with appointees. It will inlcude the ability to send broadcast messages in case of emergency situations.
                <br />For expample: If you are unable to open your office on a particular day, you can shift appointments for that day into the future and send a friendly apology via email.</small>
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
Preview.propTypes = {
};
*/

// Map state to props 
const mapStateToProps = (state) => ({
  dashboard: state.dashboard
});

export default connect(mapStateToProps)(Preview);