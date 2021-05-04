// password encryption
const bcrypt = require('bcryptjs');

// Models
const User = require('../models/User');
const keys = require('../config/keys');

// validatation
const isEmpty = require('../validation/is-empty.js');


/**
 * Adds a root administrator user to the database on startup.  
 * The email and password for this root admin should be configured as server environment variables before initial run in production.  
 * * ROOT_ADMIN_EMAIL  
 * * ROOT_ADMIN_PASSWORD  
 * 
 * The root admin will be added on server startup. If a user of any kind already exists with the same email, the database will not be modified.    
 * 
 * Note: initially configure the application and have your various users set up, you can remove the email and password from the environment.
 * 
 * @module db_initializer/dbinit 
 * @see config/keys 
 */
module.exports = () => {

  // get email and password from keys  
  const email = keys.rootAdminEmail;
  const password = keys.rootAdminPassword;
  
  // test if values are empty
  if (isEmpty(email) || isEmpty(password)) {
    console.warn('No root admin data specified.');
  } else {

    // create admin user object
    const admin = {
      firstname: 'root',
      lastname: 'admin',
      email: email,
      password: password,
      role: 'Administrator',
      permissions: ['Full Access']
    };

    // create mongoose user 
    const newUser = new User(admin);

    // add user to database if it doesn't already exist
    // same method used in users route... 
    // modified to work from here on server instead of via a post request
    User.findOne({ email: newUser.email })
      .then(user => {
        if (user) {
          console.info('root admin already exists. No change.');
        } else {
          // hash password and save
          bcrypt.genSalt(10, (err, salt) => { // generate salt... 
            bcrypt.hash(newUser.password, salt, (err, hash) => { // then create hash
              if (err) {
                console.error('encryption error saving root admin');
              } else {
                // set password to hashed password, then save.
                newUser.password = hash;
                newUser.save()
                  .then(user =>
                    console.info('root admin added to database.')
                  )
                  .catch(err =>
                    console.error('database error saving root admin.')
                  );
              }
            });
          }); // end hash and save user
        }// end if user else
      })
      .catch(err => console.log('database error saving root admin.'));

  } // end if is empty

};