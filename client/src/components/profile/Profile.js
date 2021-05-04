import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import Logo from '../../img/propic.png';

/**
 * Renders the user profile e.g (first name, last name, email and email)
 * @module Profile
 */
class Profile extends Component {
  /**
   * On Mount:
   * @desc    Get Current Profile when component is loaded, and insert into a list element
   *
   */
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  /**
   * Render
   */
  render() {
    const { profile, loading } = this.props.profile;

    /**
     * Profile Content changes depending on state (loading or not)
     * If loading, or required content is empty, then show spinner instead
     */
    let ProfileContent;
    if (profile === null || loading) {
      ProfileContent = <Spinner />;
    } else {
      if (!profile.all_office_information) {
        //the profile content for a normal citizen user
        ProfileContent = (
          <div className='col-xs-1 text-center'>
            <img src={Logo} alt='propic' width='25%' />
            <br />
            <br />
            <ul className='list-group'>
              <li className='list-group-item active'>
                {profile ? profile.firstname : 'loading'}{' '}
                {profile ? profile.lastname : 'loading'}
              </li>
              <li className='list-group-item'>
                Email: {profile ? profile.email : 'loading'}
              </li>
              <li className='list-group-item'>
                Role: {profile ? profile.role : 'loading'}
              </li>
            </ul>
          </div>
        );
      } else {
        //the profile content for a appointment manager
        ProfileContent = (
          <div className='col-xs-1 text-center'>
            <img src={Logo} alt='propic' width='25%' />
            <br />
            <br />
            <ul className='list-group'>
              <li className='list-group-item active'>
                {profile
                  ? profile.all_office_information.office_name
                  : 'loading'}
              </li>
              <li className='list-group-item'>
                {profile
                  ? profile.all_office_information.office_phone
                  : 'loading'}
              </li>

              <li className='list-group-item'>
                {profile ? profile.firstname : 'loading'}
                {profile ? profile.lastname : 'loading'}
              </li>
              <li className='list-group-item'>
                {profile ? profile.email : 'loading'}
              </li>
              <li className='list-group-item'>
                {profile ? profile.role : 'loading'}
              </li>
              <li className='list-group-item'>
                {profile
                  ? profile.all_office_information.office_times.day_from +
                    ' - ' +
                    profile.all_office_information.office_times.day_to +
                    ' ( ' +
                    profile.all_office_information.office_times.time_from +
                    ' to ' +
                    profile.all_office_information.office_times.time_to +
                    ' )'
                  : 'loading'}
              </li>

              <li className='list-group-item'>
                <iframe
                  src={profile.all_office_information.office_location}
                  title='map'
                  height='100%'
                  width='100%'
                  frameBorder='0'
                  style={{ border: '0' }}
                  allowFullScreen
                />
              </li>
            </ul>
          </div>
        );
      }
    }

    return (
      <div className='content my-4 p-4'>
        <div className='container mx-auto border rounded p-4 shadow'>
          <div className='text-center'>
            <h1>Profile</h1>
          </div>
          {ProfileContent}
        </div>
      </div>
    );
  }
}

// Map all properties to PropTypes for React good practice
Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

// Map state to props
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Profile);
