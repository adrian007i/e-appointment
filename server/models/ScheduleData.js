const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * User Schedule Schema.
 *
 * @property {ObjectId} user - User. (Required)
 * @property {Boolean} active - status of schedule e.g. on/off
 * @property {Number} length_of_appointment - time per appointment (Required)
 * @property {String} name - Name of schedule (Required)
 * @property {String} description - description of schedule  (Required)
 * @property {String} requirements - documents etc required for the appointment
 * @property {Number} cancelation_days_notice - days before someone is allowed to cancel
 * @property {String} email_reminder_message - custom appointment reminder email_reminder_message
 * @property {Date} created - Date the schedule was created. (Default: Now)
 */
const ScheduleSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  active: {
    type: Boolean
  },
  length_of_appointment: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: false
  },
  cancelation_days_notice: {
    type: Number,
    required: true
  },
  email_reminder_message: {
    type: String,
    default: 'You have an upcoming appontment'
  },
  date_appointment_created: {
    type: Date,
    default: new Date()
  }
});
module.exports = Schedule = mongoose.model('schedule', ScheduleSchema);
