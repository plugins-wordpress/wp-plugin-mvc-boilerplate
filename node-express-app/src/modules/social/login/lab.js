const express = require('express');
const passport = require('passport');
const session = require('express-session');

const app = express();

app.use(session({ secret: 'your_secret_key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Twitter Authentication
app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect to the profile page or handle user data as needed
    res.redirect('/profile');
  });

// Profile Page
app.get('/profile', (req, res) => {
  // Access user data from req.user
  res.send(req.user);
});

// Logout
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
