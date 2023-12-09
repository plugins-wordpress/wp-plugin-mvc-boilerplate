require('dotenv').config();
const passport = require('passport');
const InstagramStrategy = require('passport-instagram').Strategy;

exports.instagramStrategy = () => new InstagramStrategy({
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: process.env.NSTAGRAM_CALLBACK_URL
  }, (accessToken, refreshToken, profile, done) => {
    // Handle Instagram authentication
    // Store or retrieve user data in your database
    return done(null, profile);
  })
  exports.authInstagram = () => passport.authenticate('instagram');
  exports.authInstagramCallback = () => [passport.authenticate('instagram', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect to the profile page or handle user data as needed
    res.redirect('/profile');
  }]