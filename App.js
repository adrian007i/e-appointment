/**
 * Server application entry point. Serves a RESTful api backend and a React frontend.
 * @module HackTT-E-Appointment-Web-application
 */

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// import routes
const users = require('./server/routes/api/users.js');
const profile = require('./server/routes/api/profile.js');
const admin = require('./server/routes/api/admin.js');
const schedule = require('./server/routes/api/schedule.js');
const smtpInfo = require('./server/config/smtpInfo.js');

// import database initializer
const dbinitializer = require('./server/db_initializer/dbinit.js');

// set up express
const app = express();

// set up body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database connection string
const db = require('./server/config/keys.js').mongoURI;

// Connect to database using Mongoose.
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('MongoDB Connection Success.');
    // initialize the database. adds the root admin user to the database.
    dbinitializer();
  })
  .catch(err => {
    console.log('MongoDB Connection Failed.');
    console.log(err);
  });

// set port to either the production environment port or the develeper server port
const port = process.env.PORT || 5000;

// set up express static files. All static file go to public folder
app.use(express.static('public'));

// Passport middleware and config
app.use(passport.initialize());
require('./server/config/passport.js')(passport);

// API Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/admin', admin);
app.use('/api/schedule', schedule);

// Serve React build application assets in production
if (process.env.NODE_ENV === 'production') {
  // set express to serve static files from build folder
  app.use(express.static('client/build'));
  // any route that is not an API route above, points to client/build/index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// start the sever and listen for requests
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
