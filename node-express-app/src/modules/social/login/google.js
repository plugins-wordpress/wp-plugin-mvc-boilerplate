require('dotenv').config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure Google Strategy
exports.googleStrategy = () => new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }, (accessToken, refreshToken, profile, done) => {
    // Handle Google authentication
    // Store or retrieve user data in your database
    return done(null, profile);
  })

  exports.authGoogle = () => passport.authenticate('google', { scope: ['profile', 'email'] })
  exports.authGoogleCallback = () => [passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile'); // Redirect to the profile page
  }]
