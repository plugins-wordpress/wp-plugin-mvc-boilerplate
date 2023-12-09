require('dotenv').config();
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

exports.twitterStrategy = () => new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL,
  }, (token, tokenSecret, profile, done) => {
    // Handle Twitter authentication
    // Store or retrieve user data in your database
    return done(null, profile);
  })

exports.authTwitter = () => passport.authenticate('twitter');

exports.authTwitterCallback= () => [ passport.authenticate('twitter', { failureRedirect: '/' }),
(req, res) => {
  // Redirect to the profile page or handle user data as needed
  res.redirect('/profile');
}]