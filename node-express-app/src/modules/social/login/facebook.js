require('dotenv').config();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

exports.facebookStategy  = () =>new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL:process.env.FACEBOOK_CALLBACK_URL ,
  }, (accessToken, refreshToken, profile, done) => {
    // Handle Facebook authentication
    // Store or retrieve user data in your database
    return done(null, profile);
  })

  exports.authFacebook = ()=>  passport.authenticate('facebook');
  exports.authFacebookCallback = () => [passport.authenticate('facebook', { failureRedirect: '/' }),
   (req, res) => {
    res.redirect('/profile'); // Redirect to the profile page
  }]



