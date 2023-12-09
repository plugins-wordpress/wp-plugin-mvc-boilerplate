require('dotenv').config();
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

exports.githubStrategy = () => new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  }, (accessToken, refreshToken, profile, done) => {
    // Handle GitHub authentication
    // Store or retrieve user data in your database
    return done(null, profile);
  })

  exports.authGithub = () => passport.authenticate('github');
  exports.authGithubCallback = () => [passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile'); // Redirect to the profile page
  }]
