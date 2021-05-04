const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose Database Model for User Accounts
 * @module Models/User
 */

/**
 * List of User Roles (Enum)
 * @property {String} Citizen - A regular citizen. They can book and update appointments.
 * @property {String} AppointmentManager  - A Government Office Worker. They can create and update schedules for booking at their office
 * @property {String} Admin - Application administrator. They create and modify user permissions and maintain the website.
 */
const Roles = Object.freeze({
  Citizen: 'Citizen',
  AppointmentManager: 'Appointment Manager',
  Admin: 'Administrator'
});

/**
 * List of User Permissions (Enum).
 *
 * Note: There are two ways you can add the 'Full Access' permission to an admin account.
 * An existing Admin with the 'Full Access' permission can apply it to another account,
 * or you can create a new Admin account via the Server environment. For security reasons,
 * it is recommended that you only give this permission to a few key owners of the application.
 *
 * @property {String} FullAccess - Can perform all actions from all permissions at any level. (warning)
 * @property {String} ManageUsers - Create, Modify or Delete Backend Users. Modify their permissions.
 * @property {String} ManageContent - Create, Modify or Delete Backend Users. Modify their permissions.
 */
const Permissions = Object.freeze({
  FullAccess: 'Full Access',
  ManageUsers: 'Manage Users',
  ManageContent: 'Manage Content'
});

/**
 * User Account Schema.
 *
 * @property {String} firstname - First Name. (Required)
 * @property {String} lastname - Last Name. (Required)
 * @property {String} handle - Alternative name to be shown on website instead of real name.
 * @property {String} email - Valid email address. (Required)
 * @property {String} password - Encrypted password. (Required)
 * @property {String} role - Type of User. Refer to Roles enum. (Default: Citizen)
 * @property {Array|String} permissions - List of Permissions granted to user. Refer to Permissions enum.
 * @property {Object|boolean} all_office_information - Info about the appointment manager.  If it is a citizen user, this would be false.
 * @property {Date} last_login - Last time the user has logged in.
 * @property {Date} created - Date the account was created. (Default: Now)
 *
 */
const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    requried: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: Object.values(Roles),
    default: 'Citizen'
  },
  permissions: [
    {
      type: String,
      enum: Object.values(Permissions),
      required: false
    }
  ],
  last_login: {
    type: Date,
    required: false
  },
  created: {
    type: Date,
    default: Date.now
  },
  email_confirmation: {
    type: Boolean,
    default: false
  },
  //only for appointment managers
  all_office_information: {
    type: {
      office_name: {
        type: String,
        required: true
      },

      office_location: {
        type: String,
        required: true
      },

      office_phone: {
        type: String,
        required: true
      },

      office_times: {
        day_from: {
          type: String,
          default: 'Monday'
        },
        day_to: {
          type: String,
          default: 'Friday'
        },
        time_from: {
          type: Number,
          default: 9
        },
        time_to: {
          type: Number,
          default: 4
        }
      },
      required: false
    },
    default: false
  }
});

// assign enums to schema
Object.assign(UserSchema.statics, {
  Roles,
  Permissions
});

// export schema
const User = mongoose.model('users', UserSchema);
module.exports = User;
