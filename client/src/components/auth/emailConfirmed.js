import React, { Component } from 'react';
import axios from 'axios';

//component user is shown after they click the confirmation email
class ConfirmEmail extends Component {
  /**
   * Construtor
   * @param {*} props
   */
  constructor(props) {
    super(props);

    //saves a message variable to display if the email confirmation is valid.
    this.state = {
      message: ''
    };

    const self = this;

    //construct a url to the api
    const myurl =
      '/api/users/confirm/' +
      this.props.match.params.email +
      '/' +
      this.props.match.params.secretToken;

    //axios will get the data to the api
    axios.get(myurl).then(res => {
      if (res.data.success) {
        //assign a value to the message state
        self.setState({
          message: 'Your email has been confirmed login.  You may now login'
        });
      }
    });
  }

  render() {
    //display whether the email confirmation url was successful
    return (
      <div className='text-center'>
        <br />
        <h1> Email Confirm </h1>
        <hr width='90%' />
        <h5>{this.state.message}</h5>
      </div>
    );
  }
}

export default ConfirmEmail;
