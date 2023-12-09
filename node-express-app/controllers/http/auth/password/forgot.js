'use strict';
/*
|------------------------------------------------------------------------------------
| ForgotPassword Controller
|------------------------------------------------------------------------------------
|
| This code defines middleware and functions for handling user registration, password reset,
| and email validation within a Node.js application. The code utilizes various modules and libraries
| to perform these tasks and provides error handling along the way.

*/

// Import necessary libraries and modules
const passport = require('passport');  // Passport for authentication
const bcrypt = require('bcrypt');      // Bcrypt for password hashing
const { validationResult, check } = require('express-validator');  // Express-validator for input validation
const { expiresIn, makePasswordResetURL } = require('../../../../src/modules/helper')();  // Custom helper functions
const Model = require('../../../../models/User');  // User model
const Mailer = require('../../../../src/modules/mail');  // Mailer module for sending emails
const User = new Model;  // Create a new instance of the User model

// Middleware to check if the user is already authenticated; if yes, redirect them
exports.registerMiddleware = (req, res, next) => req.isAuthenticated() ? res.redirect('/') : next();

// Render a page for password forgot cover
exports.passwordForgotCover = (req, res, next) => res.render('auth-forgot-password-cover');

// Handle the password forgot cover form submission
exports.authPasswordForgotCover = (req, res, next) => {
    // Find a user by their email
    User.findByEmail(req.body.email);
    User.once('findByEmail', async user => {
        if (!user) {
            // If the user is not found, render an error message
            return res.render('auth-forgot-password-cover', { error: { msg: 'Account with this email does not exist!' } });
        }

        // Generate a password reset token using bcrypt
        const token = await bcrypt.hash(`${user.email}:${user.password}:${user.email}`, 10);
        const passwordResetToken = token.split('/').join('');
        const passwordResetTokenLifetime = expiresIn();

        // Update user's password reset information
        user.passwordResetToken = passwordResetToken;
        user.passwordResetTokenLifetime = passwordResetTokenLifetime;
        user.passwordResetURL = makePasswordResetURL(passwordResetToken);
        User.updateByEmail(user.email, user);

        // Listen for the 'updateByEmail' event
        User.on('updateByEmail', result => {
            if (result.acknowledged && result.modifiedCount >= 1) {
                // If user update is successful, send a password reset email
                const passwordResetUrL = makePasswordResetURL(passwordResetToken);
                const option = { passwordResetUrL, email: 'andre.demaison@gmail.com', subject: 'Password Reset Link', title: 'Here We Go', buttonTitle: 'Reset Password Now', headlineTitle: `<strong><h4>Please Reset Your Password!</h4></strong>` };
                const Mail = new Mailer(user, option);
                Mail.sendPasswordResetEmail(user, option);

                return res.render('auth-forgot-password-cover', { user, success: { msg: 'We have emailed you a password reset link!' } });
            } else {
                // Handle the case where user update fails
            }
        });

        // Listen for 'updateByEmail-error' event (if any error occurs during update)
        User.on('updateByEmail-error', result => {
            // Handle update error
        });
    });

    // Listen for 'findByEmail-error' event (if any error occurs during user lookup)
    User.once('findByEmail-error', error => res.status(200).send({ message: 'error finding user', error }));
};

// Validation middleware for checking the email address format
exports.validateEmail = [
    check('email').isEmail().withMessage('Invalid email address'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // If validation fails, store the error and render the password forgot cover page with the error message
            res.locals.error = errors.array()[0];
            return res.render('auth-forgot-password-cover', { error: res.locals.error });
        }
        next();
    },
];
