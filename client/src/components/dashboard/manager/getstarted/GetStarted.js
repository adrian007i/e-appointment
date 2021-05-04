import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import Title from '../../common/title/Title';

class GetStarted extends Component {
  render() {
    //display some info to help appointment managers.

    return (
      <div className='dashboard-content p-3'>
        <Title value='Get Started' />

        <div className='dashboard-inner-content border rounded'>
          <nav
            aria-label='breadcrumb'
            className='dashboard-inner-title px-3 rounded-top d-flex align-items-center justify-content-between'
          >
            <ol className='breadcrumb bg-black m-0'>
              <li className='breadcrumb-item active' aria-current='page'>
                Admin Help
              </li>
            </ol>
          </nav>
          <div className='p-4' style={{ overflowX: 'auto' }}>
            <div className='my-4 border-top p-4'>
              <h2 className='m-0 d-flex align-content-center'>
                <i className='material-icons mr-2'>help_outline</i> Need Help
                creating a schedule?
                <br />
                <br />
              </h2>
              <div>Step 1: Fill out the form details</div>
              <table className='table' style={{ minWidth: '800px' }}>
                <thead className='thead-dark'>
                  <tr>
                    <th scope='col'>Field</th>
                    <th scope='col'>Information about field</th>
                    <th scope='col'>Form data</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: '#bd2025', fontWeight: 'bold' }}>
                      Appointment Timing
                    </td>
                    <td>
                      - This refers to how long each appontment block will be{' '}
                      <br />- For smooth operation, add an additional 5 minutes
                      for slack time.
                    </td>
                    <td>numbers only greater than 0</td>
                  </tr>

                  <tr>
                    <td style={{ color: '#bd2025', fontWeight: 'bold' }}>
                      Name and Description
                    </td>
                    <td>
                      - This refers to the name and brief description of the
                      schedule.
                    </td>
                    <td>Mandatory Field </td>
                  </tr>

                  <tr>
                    <td style={{ color: '#bd2025', fontWeight: 'bold' }}>
                      Requirements
                    </td>
                    <td>
                      - List all Requirements a citizen is required to bring
                      <br />
                      - Mention any additional info a citizen may need to know
                      before attending.
                      <br />
                      - For now form links are being placed in here from
                      external source. e.g. google drive.
                      <br /> - We are working on making files uploadable.
                    </td>
                    <td>Any </td>
                  </tr>

                  <tr>
                    <td style={{ color: '#bd2025', fontWeight: 'bold' }}>
                      Bookin Policy
                    </td>
                    <td>
                      - You must state the length of time needed for a user to
                      cancel a schedule.
                    </td>
                    <td>numbers only greater than 0 </td>
                  </tr>

                  <tr>
                    <td style={{ color: '#bd2025', fontWeight: 'bold' }}>
                      Links and Embed
                    </td>
                    <td>
                      - This is a non-editable section that would provide code
                      and links to be embeded into offices website.
                    </td>
                    <td>Automatically Generated </td>
                  </tr>

                  <tr>
                    <td style={{ color: '#bd2025', fontWeight: 'bold' }}>
                      Notifications
                    </td>
                    <td>
                      - Allows you to set a custom reminder to citizens who
                      book.
                      <br />- If you don't we will sent a default message
                      reminder.
                    </td>
                    <td>Any </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <div>
                Step 2: Select if you wish to allow booking now or another time.
              </div>
              <br />
              <div>Step 3: There is no step 3 {':)'}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dashboard: state.dashboard
});

export default connect(mapStateToProps)(GetStarted);
