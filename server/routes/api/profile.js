/**
 * Profile (Account) related requests
 * @module routes/api/profile
 */

const express = require('express');
const router = express.Router();
const passport = require('passport');

// Validation
const { validateUserList } = require('../../validation/profile');

/**
 * Test if route works. Returns a success message.
 *
 * @name test
 */
router.get('/test', (req, res) => {
  res.json({ msg: 'Test Passed' });
});

/**
 * Retreive the current logged in user's profile.
 *
 * #### details
 * Property | Value
 * --- | ---
 * Method | Get
 * Route | /profile/current
 * Access | private
 *
 * @name current
 */
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // passport passes in user as part of req
    const currentUser = {
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      email: req.user.email,
      role: req.user.role,
      all_office_information: req.user.all_office_information
    };
    return res.json(currentUser);
  }
);

/**
 * Retreive paginated list of backend users.
 *
 * #### details
 * Property | Value
 * --- | ---
 * Method | Post
 * Route | /profile/userlist
 * Access | private
 *
 * #### Post Values
 * Name | Description
 * --- | ---
 * field | name of field to sort by (warning, slow on unindexed fields).
 * lastValue | value of the last item in previous page (if null performs first page query instead).
 * pageLimit | (Integer) number of items per page.
 *
 * @name userlist
 */
router.get(
  '/userlist',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // ensure valid data
    const criteria = validateUserList(req.body);
    const { field, lastValue, pageLimit } = criteria;

    // run query

    return res.json({ msg: 'userlist' });
  }
);

module.exports = router;
