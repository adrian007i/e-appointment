const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * Bookings Schedule Schema.
 *
 * @property {String} name - name of person booking
 * @property {String} email - email of person who booked
 * @property {Number} length_of_appointment - how long this service will take
 * @property {String} schedule_name - name of the schedule
 * @property {String} description - description of the schedule
 * @property {String} requirements - requirements for the schedule
 * @property {String} booked_for - date/time the appointment was booked for
 * @property {String} date_of_book - date/time the appointment was booked
 */
const BookingsSchema = new Schema({
  schedule_owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  length_of_appointment: {
    type: Number,
    required: true
  },
  schedule_name: {
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

  booked_for: {
    type: String,
    required: true
  },
  date_of_book: {
    type: Date,
    default: new Date()
  }
});
module.exports = Bookings = mongoose.model('bookings', BookingsSchema);
