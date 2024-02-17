const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const pool = require('./config/db');

function initializePassport(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        //console.log(username, password);
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        //thconsole.log(result);
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const match = await bcrypt.compare(password, user.password);
          //console.log(user);
          if (match) {
            //console.log("USER XXX\n");
            //console.log(user);
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect password.' });
          }
        } else {
          return done(null, false, { message: 'User not found.' });
        }
      } catch (error) {
        return done(error);
      }
    })
  );

  // Decides what data to attach to the session
  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });

  // Subsequent requests run deserializeUser instead of the full authenticate strategy
  passport.deserializeUser((user_id, done) => {
    pool.query('SELECT * FROM users WHERE user_id = $1', [user_id], (error, results) => {
      if (error) {
        done(error);
      }
      done(null, results.rows[0]); // Getting users information
    });
  });

};


/*
passport.use(
  new GoogleStrategy(
    {
      clientID: 'your-google-client-id',
      clientSecret: 'your-google-client-secret',
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // Implement Google OAuth authentication logic
    }
  )
);
*/

module.exports = initializePassport;