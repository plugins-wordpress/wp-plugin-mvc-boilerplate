require('dotenv').config();
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

exports.linkedinStrategy = () => new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: process.env.LINKEDIN_CALLBACK_URL,
    scope: ['r_emailaddress', 'r_liteprofile'], // Adjust scope as needed
  }, (accessToken, refreshToken, profile, done) => {
    // Handle LinkedIn authentication
    // Store or retrieve user data in your database
    return done(null, profile);
  })

  exports.authLinkeIn = () => passport.authenticate('linkedin');
  exports.authLinkeInCallback = () => [ passport.authenticate('linkedin', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile'); // Redirect to the profile page
  }]
