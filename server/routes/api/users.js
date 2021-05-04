/**
 * Users
 * @desc API for registering and Authentication (not profiles)
 */
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys.js');
const smtpInfo = require('../../config/smtpInfo.js');
const Schedule = require('../../models/ScheduleData');
const passport = require('passport');

//mongodb+srv://e-appointment:eapphacktt@cluster0-mkt28.mongodb.net/test

// Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// User model
const User = require('../../models/User');

//bookings model
const Bookings = require('../../models/Bookings');

/**
 *
 * @desc    test this route package
 * @access  Public
 */
router.get('/test/', (req, res) => {});

/**
 *
 * @desc    Register a Citizen
 * @access  Public
 */
router.post('/register', (req, res) => {
  // validate data
  const { errors, isValid } = validateRegisterInput(req.body);

  // if not valid data: send errors obj to client with status 400
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // if valid data: check if email already exists...
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // if email already exits, then send error response
      errors.email =
        'This Email already exists. Try logging in if you already have an account.';
      return res.status(400).json(errors);
    } else {
      // Email is unique

      // create new citizen user from form data
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
      });

      //creating a new appoitment manager user

      // encrypt and save password
      bcrypt.genSalt(10, (err, salt) => {
        // generate salt...
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          // then create hash
          if (err) {
            errors.server = 'Internal Server Error';
            return res.status(500).json(errors);
          } else {
            // set password to hashed password, then save.
            newUser.password = hash;
            newUser
              .save()
              .then(User => {
                res.status(201).json(User);

                //creating an encrypted token for email confirmation URL
                bcrypt.hash(User.id, salt, (err, hash) => {
                  //email body

                  //ConfirmationLink
                  //**---------------MAY NEED TO BE EDITED BEFORE HOSTING---------------------**
                  const confirmLink =
                    'https://protected-everglades-12082.herokuapp.com/confirm/' +
                    User.email +
                    '/' +
                    hash.replace(/\//g, 'slash'); // if the token has any / "slashes" we will replace it with the word slash to prevent errors

                  let mailOptions = {
                    to: User.email,
                    from: 'adrianjohn1997@gmail.com',
                    subject: '* Email Verification *',
                    html: `<h1>Welcome to bookin.</h1>
                      <hr/><br/>
                      <h2>Please verify your account by clicking the link: </h2> \n 
                      <a href='${confirmLink}' target='_blank'>${confirmLink}</a>
                      <br/><br/>
                      <small>Thank you for choosing us.</small>
                      `
                  };

                  //sending the email
                  transporter.sendMail(mailOptions, err => {
                    if (err) {
                      return res.status(500).send({ errors });
                    }
                  });
                });
              })
              .catch(err => {
                errors.server = 'Internal Server Error';
                res.status(500).json(errors);
              });
          }
        });
      });
    }
  });
});

/**
 *
 * @desc    Email confirmation for user account
 * @access  Public (only accessible to user of the email)
 */
router.get('/confirm/:user_email/:secretToken', (req, res) => {
  //check to see if user email in params exist
  User.findOne({ email: req.params.user_email })
    .then(user => {
      // if user in database

      if (user) {
        //check hashed token against the id
        bcrypt
          .compare(user.id, req.params.secretToken.replace(/slash/g, '/'))
          .then(isMatch => {
            if (isMatch) {
              //updating the email confirmation variable to true
              User.findOneAndUpdate(
                { email: req.params.user_email },
                { $set: { email_confirmation: true } }
              ).then(profile => res.status(201).json({ success: true }));
            }
          });
      }
    })
    .catch(err => console.log('error occured'));
});

/**
 *
 * @desc    Login and return a Json Web Token
 * @access  Public
 */
router.post('/login', (req, res) => {
  // validate data
  const { errors, isValid } = validateLoginInput(req.body);

  // test 500
  // errors.server = 'Internal Server Error';
  // return res.status(500).json(errors);

  // if not valid data: send errors obj to client with status 400
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // find if user is in database
  User.findOne({ email: req.body.email }).then(user => {
    // if user in database
    if (user) {
      //checking to see if user confirm with email
      if (!user.email_confirmation) {
        errors.login = 'Please confirm your email.';
        return res.status(401).json(errors);
      } else {
        // verify the password
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
          if (isMatch) {
            // successful login.. create jwt payload first
            // payload contains data that is immediatley available in each login session
            const payload = {
              id: user.id,
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
              role: user.role,
              all_office_information: user.all_office_information
            };

            // sign token, with payload, secret key (config/keys), expires in 24hrs
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 86400 },
              (err, token) => {
                if (!err) {
                  return res.json({
                    success: 'true',
                    token: 'Bearer ' + token
                  });
                } else {
                  // send internal server error if jwt fails for some reason
                  errors.server = 'Internal Server Error';
                  return res.status(500).json(errors);
                }
              }
            );
          } else {
            // password not matched...
            errors.login = 'invalid password';
            return res.status(401).json(errors);
          }
        });
      }
    } else {
      // username not matched...
      errors.login = 'Email does not exist';
      return res.status(401).json(errors);
    }
  });
});

/**
 *
 * @desc    Returns all appointment a user can book
 * @access  Public
 */
router.get('/viewSchedules', (req, res) => {
  //array holds schedules
  let schedulesInfo = [];

  //get all schedules
  Schedule.find({ active: true }, (err, schedules) => {
    //push (name,user,description) in array to be returned
    schedules.forEach(s => {
      schedulesInfo.push({
        name: s.name,
        description: s.description
      });
    });
    //response
    res.json(schedulesInfo);

    //error checking
  }).catch(err => res.status(500).send({ err }));
});

/**
 *
 * @desc    Returns a schedule to a citizen user by params (name of schedule)
 * @access  Public
 */
router.get('/viewSchedules/details/:scheduleName', (req, res) => {
  //object to hold schedule data details
  let fullSchedule = {};

  //finds a schedule based on param
  Schedule.findOne({ name: req.params.scheduleName }, (err, schedule) => {
    //finds the appointment manager office details attached to the schedule

    if (schedule) {
      User.findById(schedule.user, (err, office) => {
        fullSchedule = {
          //schedule info
          name: schedule.name,
          description: schedule.description,
          requirements: schedule.requirements,
          length_of_appointment: schedule.length_of_appointment,
          //office info
          office: office.all_office_information,
          schedule_owner: schedule.user
        };
        res.json(fullSchedule);
      });
    } else {
      return res
        .status(401)
        .json({ noSchedule: 'This schedule does not exist.' });
    }
  });
});

/**
 *
 * @desc    Books a service for a citizen user
 * @access  Private
 */

router.post(
  '/book',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //grabbing email and name from state
    req.body.email = req.user.email;
    req.body.name = req.user.firstname + ' ' + req.user.lastname;

    //ensuring th espot isn't taken
    Bookings.findOne({
      schedule_name: req.body.schedule_name,
      booked_for: req.body.booked_for
    }).then(booking => {
      if (booking) {
        // if this spot is already booked
        return res
          .status(400)
          .json({ errors: 'Sorry, this spot is already booked' });
      } else {
        //adds a new record to the database
        new Bookings(req.body)
          .save()
          .then(booking => res.json(booking))
          .catch(err => console.log(err));
      }
    });
  }
);

/**
 *
 * @desc    Returns all bookings made by a citizen user
 * @access  Private
 */
router.get(
  '/myBookings',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //searching based on user email
    Bookings.find({ email: req.user.email })
      .sort([['date_of_book', -1]])
      .then(booking => {
        //if the user has one or more bookings
        if (booking) {
          //returning the data
          res.json(booking);
        } else {
          //if the user dont have any bookings
          return res.status(404).json({ errors: 'No appointments was booked' });
        }
      });
  }
);

//Sending email setup
const transporter = nodemailer.createTransport({
  host: smtpInfo.smtpHost,
  port: smtpInfo.smtpPort,
  secure: smtpInfo.smtpSecure,
  auth: {
    user: smtpInfo.smtpUser,
    pass: smtpInfo.smtpPass
  }
});

//Appointment Manager

module.exports = router;
