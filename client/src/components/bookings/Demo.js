import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Demo extends Component {

  render() {

    return (
      <div className='content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-4 p-2 bg-black'>
              <iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.9391890263696!2d-61.516345684740095!3d10.66182826421284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c36080a0f804a1b%3A0x11c2f4517d9910bc!2sCollege+of+Science%2C+Technology+and+Applied+Arts+of+Trinidad+and+Tobago%2C+9-11+Melville+Ln%2C+Port+of+Spain!5e0!3m2!1sen!2stt!4v1559026784815!5m2!1sen!2stt'
                title='map' height='100%' width='100%' frameBorder='0' style={{ border: '0' }} allowFullScreen />
            </div>
            <div className='col-8 bg-black p-4 white'>
              <h2>Custom Help and Information for this schedule.</h2>
              <p>Dev notes:</p>
              <ul>
                <li>Either admins or schedule managers will be able to set up sub categories.</li>
                <li>Intermediate navigation has not been set up yet.</li>
                <li>This interface is currently not mobile friendly and may change at a later date.</li>
              </ul>
              <small>More useful information and links.</small>
            </div>
          </div>

          <div className='row'>
            <nav aria-label='breadcrumb'>
              <ol className='breadcrumb bg-white m-0'>
                <li className='breadcrumb-item'><Link to='/'>Home</Link></li>
                <li className='breadcrumb-item'><a href='#nowhere'>Department</a></li>
                <li className='breadcrumb-item active' aria-current='page'>Apply for a card</li>
              </ol>
            </nav>
          </div>

          {/* bookings */}
          <div className='border rounded p-4'>
            <div className='text-center mb-4'>
              <h1>Book Your Appointment:</h1>
            </div>
            <div className='text-center'>

              <div className='dropdown'>
                <button className='btn btn-danger dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                  April 05 2019 - April 11 2019
                </button>
                <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                  <a className='dropdown-item' href='#poop'>April xx 2019 - April xx 2019</a>
                  <a className='dropdown-item' href='#poop'>April xx 2019 - April xx 2019</a>
                  <a className='dropdown-item' href='#poop'>April xx 2019 - April xx 2019</a>
                </div>
              </div>

            </div>

            <div className='d-flex px-4 justify-content-between'>
              <i className='material-icons' style={{ fontSize: '40px' }}>arrow_back_ios</i>  <i className='material-icons' style={{ fontSize: '40px' }}>arrow_forward_ios</i>
            </div>

            {/* many buttons for the week */}
            <div className='bookings row justify-content-center mt-4'>
              <div className='col-2 text-center'>
                <p>Mon 05/05</p>

                <div className=''>
                  <button className='btn btn-sm btn-secondary my-1' disabled>08:00 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>08:30 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>09:00 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>09:30 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>10:00 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>10:30 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>11:00 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>11:30 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>01:00 pm</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>01:30 pm</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>02:00 pm</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>02:30 pm</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>03:00 pm</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>03:30 pm</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>04:00 pm</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>04:30 pm</button><br />
                </div>

              </div>
              <div className='col-2 text-center'>
                <p>Tue 06/05</p>

                <div className=''>
                  <button className='btn btn-sm btn-secondary my-1' disabled>08:00 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>08:30 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>09:00 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>09:30 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>10:00 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>10:30 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>11:00 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>11:30 am</button><br />
                  <button className='btn btn-sm btn-success my-1'>01:00 pm</button><br />
                  <button className='btn btn-sm btn-success my-1'>01:30 pm</button><br />
                  <button className='btn btn-sm btn-success my-1'>02:00 pm</button><br />
                  <button className='btn btn-sm btn-success my-1'>02:30 pm</button><br />
                  <button className='btn btn-sm btn-success my-1'>03:00 pm</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>03:30 pm</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>04:00 pm</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>04:30 pm</button><br />
                </div>

              </div>
              <div className='col-2 text-center'>
                <p>Wed 07/05</p>

                <div className=''>
                  <button className='btn btn-sm btn-secondary my-1' disabled>08:00 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>08:30 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>09:00 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>09:30 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>10:00 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>10:30 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>11:00 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>11:30 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>01:00 pm</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>01:30 pm</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>02:00 pm</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>02:30 pm</button><br />
                  <button className='btn btn-sm btn-success my-1'>03:00 pm</button><br />
                  <button className='btn btn-sm btn-success my-1'>03:30 pm</button><br />
                  <button className='btn btn-sm btn-success my-1'>04:00 pm</button><br />
                  <button className='btn btn-sm btn-success my-1'>04:30 pm</button><br />
                </div>

              </div>
              <div className='col-2 text-center'>
                <p>Thu 08/05</p>

                <div className=''>
                  <button className='btn btn-sm btn-success my-1'>08:00 am</button><br />
                  <button className='btn btn-sm btn-success my-1'>08:30 am</button><br />
                  <button className='btn btn-sm btn-success my-1'>09:00 am</button><br />
                  <button className='btn btn-sm btn-success my-1'>09:30 am</button><br />
                  <button className='btn btn-sm btn-success my-1'>10:00 am</button><br />
                  <button className='btn btn-sm btn-success my-1'>10:30 am</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>11:00 am</button><br />
                  <button className='btn btn-sm btn-success my-1'>11:30 am</button><br />
                  <button className='btn btn-sm btn-success my-1'>01:00 pm</button><br />
                  <button className='btn btn-sm btn-secondary my-1' disabled>01:30 pm</button><br />
                  <button className='btn btn-sm btn-success my-1'>02:00 pm</button><br />
                  <button className='btn btn-sm btn-success my-1'>02:30 pm</button><br />
                  <button className='btn btn-sm btn-success my-1'>03:00 pm</button><br />
                  <button className='btn btn-sm btn-success my-1'>03:30 pm</button><br />
                  <button className='btn btn-sm btn-success my-1'>04:00 pm</button><br />
                  <button className='btn btn-sm btn-success my-1'>04:30 pm</button><br />
                </div>

              </div>
              <div className='col-2 text-center'>
                <p>Fri 09/05</p>

                <div className=''>
                  <button className='btn btn-sm btn-success my-1'>08:00 am</button><br />
                  <button className='btn btn-sm btn-success my-1'>08:30 am</button><br />
                  <button className='btn btn-sm btn-success my-1'>09:00 am</button><br />
                  <button className='btn btn-sm btn-success my-1'>09:30 am</button><br />
                  <button className='btn btn-sm btn-success my-1'>10:00 am</button><br />
                  <button className='btn btn-sm btn-success my-1'>10:30 am</button><br />
                  <button className='btn btn-sm btn-success my-1'>11:00 am</button><br />
                  <button className='btn btn-sm btn-success my-1'>11:30 am</button><br />
                  <button className='btn btn-sm btn-success my-1'>01:00 pm</button><br />
                  <button className='btn btn-sm btn-success my-1'>01:30 pm</button><br />
                  <button className='btn btn-sm btn-success my-1'>02:00 pm</button><br />
                  <button className='btn btn-sm btn-danger my-1' disabled>closed</button><br />
                  <button className='btn btn-sm btn-danger my-1' disabled>closed</button><br />
                  <button className='btn btn-sm btn-danger my-1' disabled>closed</button><br />
                  <button className='btn btn-sm btn-danger my-1' disabled>closed</button><br />
                  <button className='btn btn-sm btn-danger my-1' disabled>closed</button><br />
                </div>

              </div>

              <div className='my-4 text-center'>
                <small>Note: UI for creating and rescheduling bookings have not been implemented yet.<br />Resposnive UI for mobile has also not been implemented yet.</small>
              </div>
            </div>

          </div>
          {/* end bookings */}

          <div className='p-4 reviews'>
            <h2 className='red-h2 my-4'>Reviews</h2>

            <div className='mb-4'>
              <p>Post your own review</p>
              <button className='btn btn-secondary d-flex align-items-center mr-4'><i className='material-icons mr-2'>question_answer</i>New</button>
            </div>

            <div className='review'>
              <p className='rev-name'>Gene Kelley</p>
              <div className='rev-stars'>
                <i className='material-icons'>star</i>
                <i className='material-icons'>star</i>
                <i className='material-icons'>star</i>
                <i className='material-icons'>star_border</i>
                <i className='material-icons'>star_border</i>
              </div>
              <p className='rev-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt mauris tortor, sed cursus nibh maximus nec. Morbi non neque porta, bibendum felis ac, vulputate metus. Aliquam erat volutpat.</p>
              <div className='d-flex flex-row justify-content-end align-items-center mb-2'>
                <i className='material-icons red mr-2'>thumb_up</i><span className='mr-2'>24</span>
                <i className='material-icons red mr-2'>thumb_down</i><span className='mr-2'>2</span>
                <a className='rev-reply' href='#nowhere'>Reply</a>
              </div>
            </div>

            <div className='review mt-4'>
              <p className='rev-name'>Dean Martin</p>
              <div className='rev-stars'>
                <i className='material-icons'>star</i>
                <i className='material-icons'>star</i>
                <i className='material-icons'>star</i>
                <i className='material-icons'>star_border</i>
                <i className='material-icons'>star_border</i>
              </div>
              <p className='rev-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt mauris tortor, sed cursus nibh maximus nec. Morbi non neque porta, bibendum felis ac, vulputate metus. Aliquam erat volutpat.</p>
              <div className='d-flex flex-row justify-content-end align-items-center mb-2'>
                <i className='material-icons red mr-2'>thumb_up</i><span className='mr-2'>24</span>
                <i className='material-icons red mr-2'>thumb_down</i><span className='mr-2'>2</span>
                <a className='rev-reply' href='#nowhere'>Reply</a>
              </div>
            </div>

            <div className='review mt-4'>
              <p className='rev-name'>Frank Sinatra</p>
              <div className='rev-stars'>
                <i className='material-icons'>star</i>
                <i className='material-icons'>star</i>
                <i className='material-icons'>star</i>
                <i className='material-icons'>star_border</i>
                <i className='material-icons'>star_border</i>
              </div>
              <p className='rev-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt mauris tortor, sed cursus nibh maximus nec. Morbi non neque porta, bibendum felis ac, vulputate metus. Aliquam erat volutpat.</p>
              <div className='d-flex flex-row justify-content-end align-items-center mb-2'>
                <i className='material-icons red mr-2'>thumb_up</i><span className='mr-2'>24</span>
                <i className='material-icons red mr-2'>thumb_down</i><span className='mr-2'>2</span>
                <a className='rev-reply' href='#nowhere'>Reply</a>
              </div>
            </div>

          </div>

          <div className='p-4 reviews'>
            <h2 className='red-h2 my-4'>Ask A Question</h2>
            <div className='d-flex flex-row'>
              <button className='btn btn-secondary d-flex align-items-center mr-4'><i className='material-icons mr-2'>chat</i>Chat</button>
              <button className='btn btn-secondary d-flex align-items-center'><i className='material-icons mr-2'>call</i>Call</button>
            </div>

          </div>
          <div className='spacer' />




        </div> {/* end container-fluid */}

      </div >
    );
  }
}

// Map all properties to PropTypes for React good practice
Demo.propTypes = {
  // getCurrentProfile: PropTypes.func.isRequired,
  // auth: PropTypes.object.isRequired,
  // profile: PropTypes.object.isRequired
};

// Map state to props 
const mapStateToProps = (state) => ({
  // auth: state.auth,
  // profile: state.profile
});

export default connect(mapStateToProps)(Demo);