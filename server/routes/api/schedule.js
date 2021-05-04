/**
 * schedule.js
 * Routing for Manage Schedules
 */

const express = require('express');
const router = express.Router();
const passport = require('passport');

// Validation
const validateScheduleInput = require('../../validation/schedule');

// Model
const Schedule = require('../../models/ScheduleData');
const Bookings = require('../../models/Bookings');

// Test Dashboard
router.get('/test', (req, res) => {
  res.json({ msg: 'Test Passed' });
});

/**
 *
 * @desc    Create a schedule
 * @access  Private
 */

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateScheduleInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // Get fields for schedule
    let scheduleFields = {};
    scheduleFields.user = req.user.id;

    Schedule.findOne({ name: req.body.name }).then(user => {
      if (user) {
        // A schedule with this name already exist
        errors.name =
          'A schedule with this name already exist. Try adding another name e.g Dental 2';
        return res.status(400).json(errors);
      }
      scheduleFields.active = req.body.active;
      if (req.body.length_of_appointment)
        scheduleFields.length_of_appointment = parseInt(
          req.body.length_of_appointment
        );
      if (req.body.name) scheduleFields.name = req.body.name;
      if (req.body.description)
        scheduleFields.description = req.body.description;
      if (req.body.requirements)
        scheduleFields.requirements = req.body.requirements;
      if (req.body.cancelation_days_notice)
        scheduleFields.cancelation_days_notice = parseInt(
          req.body.cancelation_days_notice
        );

      if (req.body.email_reminder_message)
        scheduleFields.email_reminder_message = req.body.email_reminder_message;

      new Schedule(scheduleFields)
        .save()
        .then(schedule => res.json(schedule))
        .catch(err => res.status(500));
    });
  }
);

/**
 *
 * @desc    Return the current appointment manager schedule data (all of them)
 * @access  Private
 */
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Schedule.find({ user: req.user })
      .then(scheduleData => {
        if (!scheduleData) {
          errors.noScheduleData = 'No Schedules have been created yet.';
          return res.status(404).json(errors);
        }
        res.json(scheduleData);
      })
      .catch(err => {
        errors.server = 'Internal Server Error';
        res.status(500).json(errors);
      });
  }
);
/**
 *
 * @desc    Returns all bookings belonging to a specific administrator
 * @access  Private
 */
router.get(
  '/bookings/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Bookings.find({ schedule_owner: req.user })
      .sort([['schedule_name'], ['date_of_book', -1]])
      .then(bookingsData => {
        if (!bookingsData) {
          errors.noScheduleData = 'No Citizen Booked this service yet';
          return res.status(404).json(errors);
        }
        res.json(bookingsData);
      })
      .catch(err => {
        errors.server = 'Internal Server Error';
        res.status(500).json(errors);
      });
  }
);

/**
 *
 * @desc    Updates a schedule for a user
 * @access  Private
 */

router.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //revalidate fields
    const { errors, isValid } = validateScheduleInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // Get new fields for schedule
    let scheduleFields = {};

    scheduleFields.active = req.body.active;
    if (req.body.length_of_appointment)
      scheduleFields.length_of_appointment = parseInt(
        req.body.length_of_appointment
      );
    if (req.body.description) scheduleFields.description = req.body.description;
    if (req.body.requirements)
      scheduleFields.requirements = req.body.requirements;
    if (req.body.cancelation_days_notice)
      scheduleFields.cancelation_days_notice = parseInt(
        req.body.cancelation_days_notice
      );

    if (req.body.email_reminder_message)
      scheduleFields.email_reminder_message = req.body.email_reminder_message;

    //update
    Schedule.findOneAndUpdate(
      { name: req.body.name },
      { $set: scheduleFields }
    ).then(() => {
      res.status(201).json({ success: true });
    });
  }
);
module.exports = router;
