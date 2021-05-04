import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions
// import { getCurrentProfile } from '../../actions/profileActions';

// components
import Spinner from '../../../common/Spinner';
import Title from '../../common/title/Title';
import SearchInput from '../../../forms/SearchInput';


/**
 * (React Componenet) Lists Backend users for editing. 
 * Can search for specific users and view their details.
 * 
 */
class ManageUsers extends Component {

  /**
   * Get list of users on mount. based on history search.
   */
  componentDidMount() {
    // this.props.getCurrentProfile();
  }

  /**
   * Render the React Componeent
   * @returns {JSX}  - Code to be rendered
   */
  render() {

    // data stored in state.
    //const { /*profile,*/ loading } = this.props.profile;

    const profile = null; const loading = true;

    // Set list of retreived users to spinner when loading or content when loaded.
    let UserList;
    if (profile === null || loading) {
      UserList = <Spinner />;
    } else {
      UserList = (
        <div>
          <h4>The list:</h4>
          <ul>
            {/*elements.map((value, index) => {
              return <li key={index}>{value}</li>
            })*/}
          </ul>
        </div>
      );
    }

    return (
      <div className='dashboard-content p-3'>

        <Title value='Manage Users' />

        <SearchInput />

        <div className='w-50 mx-auto border rounded p-4 shadow'>
          <div className='text-center'>
            <h1>Users ...</h1>
            {UserList}
          </div>
          <small>TODO List of Backend Users.</small>
        </div>
      </div>
    );
  }
}

// Map Proptypes for typechecking
ManageUsers.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

// Map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  userList: state.userList //this....
});

export default connect(mapStateToProps, { /* getUserList */ })(ManageUsers);