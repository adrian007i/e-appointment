import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import Title from '../../common/title/Title';

class Statistics extends Component {
  render() {

    // const { activeTab } = this.props.dashboard;

    return (
      <div className='dashboard-content p-3'>
        <Title value='Statistics' />

        <div className='dashboard-inner-content border rounded'>
          <div className='p-4'>
            <div className='my-4 p-4'>
              <h2 className='mb-2 d-flex'>Statistics</h2>

              <small>This feature will allow to to gain an overview of how well your appointment system is working and so on.</small>
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
Statistics.propTypes = {
};
*/

// Map state to props 
const mapStateToProps = (state) => ({
  dashboard: state.dashboard
});

export default connect(mapStateToProps)(Statistics);