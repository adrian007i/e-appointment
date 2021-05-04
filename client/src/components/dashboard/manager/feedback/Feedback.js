import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import Title from '../../common/title/Title';

class Feedback extends Component {
  render() {

    // const { activeTab } = this.props.dashboard;

    return (
      <div className='dashboard-content p-3'>
        <Title value='Feedback' />


        <div className='dashboard-inner-content border rounded'>
          <div className='p-4'>
            <div className='my-4 p-4'>
              <h2 className='mb-2 d-flex'>Reviews and Feedback.</h2>

              <small>This page will allow you to view and moderate user posts and reviews on each schedule you make. <br />
                Moderation may also be done by site admins, or in some other way as the design of this feature is incomplete at the moment.</small>
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
Feedback.propTypes = {
};
*/

// Map state to props 
const mapStateToProps = (state) => ({
  dashboard: state.dashboard
});

export default connect(mapStateToProps)(Feedback);