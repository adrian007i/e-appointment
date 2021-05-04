const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

// options for passport strategy
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrKey
};

/**
 * passport configuration with jwt strategy for use to authenticate Routes.
 * @returns {VerifiedCallback} contains user object if user has been verified.
 * @module config/passport
 */
module.exports = passport => {
  // use jwt strategy
  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    User.findById(jwtPayload.id) // find if User exists in database
      .then(user => {
        if (user) {
          return done(null, user); // user found
        }
        return done(null, false); // no user
      })
      .catch(err => {
        return done(null, false); // nothing to do if fail here
      });
  }));
};
