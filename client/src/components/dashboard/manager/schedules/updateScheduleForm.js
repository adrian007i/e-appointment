import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Spinner from '../../../common/Spinner';

// actions
import { updateSchedule } from '../../../../actions/scheduleActions';

/**
 * ScheduleForm
 * @desc    Creates a new schedule for an appointment manager
 *
 */
class UpdateScheduleForm extends Component {
  /**
   * Construtor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      active: null,
      length_of_appointment: null,
      description: null,
      requirements: null,
      cancelation_days_notice: null,
      email_reminder_message: null,
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // on submit the data will be store in the mongoDB or errors will be returned if any
  onSubmit(e) {
    // prevent default action
    e.preventDefault();

    // create Schedule object
    const scheduleData = {
      name: this.state.name,
      active: this.state.active,
      length_of_appointment: this.state.length_of_appointment + '',
      description: this.state.description,
      requirements: this.state.requirements,
      cancelation_days_notice: this.state.cancelation_days_notice + '',
      email_reminder_message: this.state.email_reminder_message
    };

    this.props.updateSchedule(scheduleData, this.props.history);
  }

  // onchange events for fields, updates state and their values
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    //checks to see whether the appointment managers set the schedule to active or not.
    if (!document.getElementById('active').checked) {
      this.setState({ active: false });
    } else {
      this.setState({ active: true });
    }
  }

  // what to do when new props recieved
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors }); // get errors and add it to state
    }
  }

  componentDidMount() {
    const { scheduleData } = this.props.schedules;
    if (scheduleData === null || scheduleData === undefined) {
      this.props.history.push('/dashboard/manage-schedules');
    } else {
      for (let i = 0; i < scheduleData.length; i++) {
        if (this.props.match.params.scheduleName === scheduleData[i].name) {
          this.setState({
            name: scheduleData[i].name,
            active: scheduleData[i].active,
            length_of_appointment: scheduleData[i].length_of_appointment,
            description: scheduleData[i].description,
            requirements: scheduleData[i].requirements,
            cancelation_days_notice: scheduleData[i].cancelation_days_notice,
            email_reminder_message: scheduleData[i].email_reminder_message
          });
          break;
        }
      }
    }
  }

  render() {
    const { errors } = this.state;
    const { params } = this.props.match;

    let showContent;
    if (this.state.active === null) {
      // display spinner until content is loaded
      showContent = <Spinner />;
    } else {
      showContent = (
        <div className='dashboard-inner-content border rounded'>
          <nav
            aria-label='breadcrumb'
            className='dashboard-inner-title px-3 rounded-top d-flex flex-row align-items-center justify-content-between'
          >
            <ol className='breadcrumb bg-black m-0'>
              <li className='breadcrumb-item'>
                <Link to='/dashboard/manage-schedules'>My Schedules</Link>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                {params.scheduleName}
              </li>
            </ol>
          </nav>

          {/* Under Nav */}

          <div className='p-4'>
            <form style={{ width: '100%' }} noValidate onSubmit={this.onSubmit}>
              {/* Appointment Timing*/}
              <button
                className='btn btn-light btn-lg btn-block d-flex border-radius-0'
                data-toggle='collapse'
                data-target='.open-hours'
                type='button'
              >
                <i className='material-icons mr-2'>access_time</i>Appointment
                Timing<i className='material-icons'>arrow_drop_down</i>
              </button>
              <div className='p-4 collapse show open-hours border rounded'>
                <div className='pl-4'>
                  <div className='pl-4'>
                    <div className='form-group row'>
                      <div className='col-2 col-form-label text-right'>
                        <label htmlFor='length_of_appointment'>
                          Length of Appointment{' '}
                        </label>
                      </div>
                      <div className='col-10'>
                        <input
                          type='text'
                          className={classnames(
                            'form-control form-control-lg',
                            {
                              'is-invalid': errors.length_of_appointment
                            }
                          )}
                          id='length_of_appointment'
                          name='length_of_appointment'
                          value={this.state.length_of_appointment}
                          onChange={this.onChange}
                        />
                        {errors.length_of_appointment && (
                          <div className='invalid-feedback'>
                            {' '}
                            {errors.length_of_appointment}{' '}
                          </div>
                        )}

                        <small>Please specify in minutes.</small>
                        <br />
                        <small>
                          <font color='darkgrey'>
                            Tip: include an extra 5 minutes to make things run
                            smoothly.
                          </font>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Appointment Timing ends*/}

              {/* Name and desc */}
              <button
                className='btn btn-light btn-lg btn-block d-flex border-radius-0 mt-4'
                data-toggle='collapse'
                data-target='.name-desc'
                type='button'
              >
                <i className='material-icons mr-2'>description</i>Name and
                Description<i className='material-icons'>arrow_drop_down</i>
              </button>
              <div className='p-4 collapse name-desc border rounded'>
                <div className='pl-4'>
                  <div className='form-group row'>
                    <div className='col-2 col-form-label text-right'>
                      <label htmlFor='name'>Name</label>
                    </div>
                    <div className='col-10'>
                      <input
                        type='text'
                        className={classnames('form-control form-control-lg', {
                          'is-invalid': errors.name
                        })}
                        name='name'
                        value={params.scheduleName}
                        readOnly
                      />

                      {errors.name && (
                        <div className='invalid-feedback'> {errors.name} </div>
                      )}
                    </div>
                  </div>
                  <div className='form-group row'>
                    <div className='col-2 col-form-label text-right'>
                      <label htmlFor='description'>Description</label>
                    </div>
                    <div className='col-10'>
                      <textarea
                        className={classnames('form-control form-control-lg', {
                          'is-invalid': errors.description
                        })}
                        id='description'
                        rows='3'
                        name='description'
                        value={this.state.description}
                        onChange={this.onChange}
                      />
                      {errors.description && (
                        <div className='invalid-feedback'>
                          {' '}
                          {errors.description}{' '}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Name and desc ends */}

              {/* Requirements */}
              <button
                className='btn btn-light btn-lg btn-block d-flex border-radius-0 mt-4'
                data-toggle='collapse'
                data-target='.requirements'
                type='button'
              >
                <i className='material-icons mr-2'>playlist_add_check</i>
                Requirements<i className='material-icons'>arrow_drop_down</i>
              </button>
              <div className='p-4 collapse requirements border rounded'>
                <div className='pl-4'>
                  <textarea
                    className='form-control form-control-md'
                    id='cancelation_days_notice'
                    style={{ height: '300px', background: 'lightgrey' }}
                    name='requirements'
                    value={this.state.requirements}
                    onChange={this.onChange}
                  />
                  <small>
                    Requirements should consist of a detailed list of what
                    appointees should do or obtain before appointments, as well
                    as any other helpful information that can make the process
                    go smoother.
                  </small>
                </div>
              </div>
              {/* Requirements ends */}

              {/* Cancelation policy */}
              <button
                className='btn btn-light btn-lg btn-block d-flex border-radius-0 mt-4'
                data-toggle='collapse'
                data-target='.cancel-policy'
                type='button'
              >
                <i className='material-icons mr-2'>restore</i>Booking Policy
                <i className='material-icons'>arrow_drop_down</i>
              </button>
              <div className='p-4 collapse cancel-policy border rounded'>
                <div className='pl-4'>
                  <div className='form-group row'>
                    <div className='col-2 col-form-label text-right'>
                      <label htmlFor='cancelation_days_notice'>
                        Cancelation Notice
                      </label>
                    </div>
                    <div className='col-10'>
                      <textarea
                        className={classnames('form-control form-control-lg', {
                          'is-invalid': errors.cancelation_days_notice
                        })}
                        id='cancelation_days_notice'
                        rows='3'
                        name='cancelation_days_notice'
                        value={this.state.cancelation_days_notice}
                        onChange={this.onChange}
                      />
                      {errors.cancelation_days_notice && (
                        <div className='invalid-feedback'>
                          {' '}
                          {errors.cancelation_days_notice}{' '}
                        </div>
                      )}
                      <small>
                        I need this amount of time before someone is allowed to
                        cancel or reschedule.
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              {/* Cancelation policy ends*/}

              {/* Links & embedded */}
              <button
                className='btn btn-light btn-lg btn-block d-flex border-radius-0 mt-4'
                data-toggle='collapse'
                data-target='.golive'
                type='button'
              >
                <i className='material-icons mr-2'>code</i>Links and Embed
                <i className='material-icons'>arrow_drop_down</i>
              </button>
              <div className='p-4 collapse golive border rounded'>
                <div className='pl-4'>
                  <div className='form-group row'>
                    <div className='col-2 col-form-label text-right'>
                      <label htmlFor='linklive'>Link to your schedule</label>
                    </div>

                    <div className='col-10'>
                      <input
                        type='text'
                        className='form-control'
                        readOnly
                        id='linklive'
                        value={
                          window.location.host +
                          '/bookings/' +
                          params.scheduleName
                        }
                      />
                      <small>
                        Place this link on any webpage to direct people to your
                        service
                      </small>
                    </div>
                  </div>
                  <div className='form-group row'>
                    <div className='col-2 col-form-label text-right'>
                      <label htmlFor='embed'>Embed Code</label>
                    </div>
                    <div className='col-10'>
                      <textarea
                        className='form-control'
                        id='embed'
                        rows='3'
                        readOnly
                        value={`<script src="${window.location.host}/dashboard/manage-schedules"></script>`}
                      />
                      <small>
                        Paste this code into any webpage to embed your schedule
                        onto that page.
                      </small>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
              {/* Links & embedded ends */}

              {/* Notifications */}
              <button
                className='btn btn-light btn-lg btn-block d-flex border-radius-0 mt-4'
                data-toggle='collapse'
                data-target='.notifications'
                type='button'
              >
                <i className='material-icons mr-2'>email</i>Notifications
                <i className='material-icons'>arrow_drop_down</i>
              </button>
              <div className='p-4 collapse notifications border rounded'>
                <div className='pl-4'>
                  <div className='form-group row'>
                    <div className='col-2 col-form-label text-right'>
                      <label htmlFor='email'>Email</label>
                    </div>

                    <div className='col-10'>
                      <textarea
                        className='form-control'
                        id='email'
                        rows='3'
                        name='email_reminder_message'
                        value={this.state.email_reminder_message}
                        onChange={this.onChange}
                      />
                      <small>
                        Insert a custom email notification for your appointees.
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              {/* Notifications end */}

              {/* Create Schedule Button & check to for active to be turned on/off  */}
              <div className='p-4 m-4'>
                <div className='my-4 text-center'>
                  <div className='custom-control custom-switch'>
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='active'
                      name='active'
                      onChange={this.onChange}
                      checked={this.state.active}
                    />
                    <label className='custom-control-label' htmlFor='active'>
                      Turn on/off the status of the schedule
                    </label>
                  </div>
                  <br />
                  <button
                    className='btn btn-small btn-dark d-inline-flex ml-2'
                    type='submit'
                  >
                    * Update Schedule *
                  </button>
                </div>
              </div>
              {/* Create Schedule Button & check to for active to be turned on/off ends */}
            </form>
          </div>
          {/* End Under Nav */}
        </div>
      );
    }

    return showContent;
  }
}

// set the prop types for debuging
UpdateScheduleForm.propTypes = {
  updateSchedule: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// Map state props ...
const mapStateToProps = state => ({
  errors: state.errors,
  schedules: state.schedules
});

export default connect(
  mapStateToProps,
  { updateSchedule }
)(UpdateScheduleForm);
