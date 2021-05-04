/**
 * User Related utility functions.
 * 
 * Use whenever you need to test for user roles in components.
 * @module UserRoles
 * 
 */

/**
 * List of valid user roles for application. This is based on the enum used for User.role in database.
 * 
 * @property {String} Citizen - A regular citizen. They can book and update appointments.
 * @property {String} AppointmentManager  - A Government Office Worker. They can create and update schedules for booking at their office
 * @property {String} Admin - Application administrator. They create and modify user permissions and maintain the website.
 */
export const UserRoles = {
  Citizen: 'Citizen',
  AppointmentManager: 'Appointment Manager',
  Admin: 'Administrator'
};


/**
 * List of valid User Permissions. This is based on the enum used for User.role in database.
 * 
 * @property {String} FullAccess - Can perform all actions from all permissions at any level. (warning)
 * @property {String} ManageUsers - Create, Modify or Delete Backend Users. Modify their permissions
 * @property {String} ManageContent - Create, Modify or Delete Backend Users. Modify their permissions
 */
export const Permissions = {
  FullAccess: 'Full Access',
  ManageUsers: 'Manage Users',
  ManageContent: 'Manage Content'
};
