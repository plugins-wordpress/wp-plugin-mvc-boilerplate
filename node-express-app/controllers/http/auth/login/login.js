'use strict';
/*
|------------------------------------------------------------------------------------
| Login Controller
|------------------------------------------------------------------------------------
|
| This code is a typical setup for handling user authentication and login using the Passport library
| in a Node.js application. It renders login pages, processes login attempts, and allows users to log out
| while handling errors as needed.

*/

// Import the 'passport' library for authentication
const passport = require('passport');

// Controller function to render the login page
exports.showLogin = (req, res, next) => res.render('auth-login-cover', { error: req.query.error });

// Controller function to handle user login
exports.login = () => passport.authenticate('local', {
    successRedirect: '/',                // Redirect to the home page upon successful login
    failureRedirect: '/login?error=true', // Redirect to the login page with an error query parameter on login failure
    failureFlash: true                   // Enable flash messages for login failures
});

// Controller function to handle user logout
exports.logout = (req, res, next) => req.logout(err => err ? next(err) : res.redirect('/'));
