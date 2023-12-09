'use strict';
/*
|------------------------------------------------------------------------------------
| ResetPassword Controller
|------------------------------------------------------------------------------------
|
| This code defines controller functions and middleware for handling the password reset process.
| It uses the bcrypt library for password hashing, and the User model for user-related operations. 
| The code includes error handling and rendering appropriate error or success messages during the 
| password reset process.

*/

// Import necessary libraries and modules
const bcrypt = require("bcrypt");  // Library for password hashing
const Model = require("../../../../models/User");  // User model
const User = new Model();  // Create a new instance of the User model

// Middleware to check if the user is already authenticated; if yes, redirect them
exports.registerMiddleware = (req, res, next) => (req.isAuthenticated() ? res.redirect("/") : next());

// Function to generate a password reset URL
exports.makePasswordResetURL = (token = "token", path = "password/reset", url = "https://nodecraftsman.com") => `${url}/${path}/${token}`;

// Controller function to handle the reset password cover page
exports.authResetPasswordCover = (req, res, next) => {
    // Find a user with the given password reset token
    User.findOne({ passwordResetToken: req.params.passwordResetToken });

    // Listen for the 'findOne' event
    User.once("findOne", async (user) => {
        if (!user || user === null) {
            // If the user is not found, render an error message
            return res.render("auth-reset-password-cover", { error: { message: "Invalid password reset link", title: "Invalid password reset link" } });
        }
        if (user.passwordResetTokenLifetime < Date.now()) {
            // If the password reset link has expired, render an error message
            res.render("auth-reset-password-cover", { error: { message: "Password reset link has expired", title: "Expired password reset link" } });
        }

        // Render the reset password cover page with the user data
        res.render("auth-reset-password-cover", { user });
    });

    // Listen for 'findOne-error' event (if any error occurs during user lookup)
    User.once("findOne-error", (error) => res.render("auth-reset-password-cover", { error: { message: "Password reset link is bad and not acceptable", title: "Bad password reset link" } }));
};

// Controller function to handle resetting the user's password
exports.resetPassword = (req, res, next, User = new Model()) => {
    // Find a user with the given password reset token
    User.findOne({ passwordResetToken: req.params.passwordResetToken });

    // Listen for the 'findOne' event
    User.once("findOne", async (user) => {
        if (!user || user === null) {
            // If the user is not found, render an error message
            return res.render("auth-reset-password-cover", { error: { message: "Invalid password reset link", title: "Invalid password reset link" } });
        }
        if (user.passwordResetTokenLifetime > Date.now()) {
            // If the password reset link is valid and not expired, hash and update the user's password
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            User.updateById(user._id.toString(), { password: hashedPassword });

            // Listen for 'updateById' event
            User.on("updateById", (result) => {
                if (result.acknowledged && result.modifiedCount >= 1) {
                    // If password update is successful, render a success message
                    return res.render("auth-reset-password-cover", { user, success: { message: "Password Changed Successfully" } });
                } else {
                    // Handle the case where the password update fails
                    return res.render("auth-reset-password-cover", { user, success: { message: "Nothing happened" } });
                }
            });

            // Listen for 'updateById-error' event (if any error occurs during update)
            User.on("updateById-error", (error) => res.render("auth-reset-password-cover", { user, error: { message: "We could not change your password", title: "Fatal System Error" } }));
        } else {
            // If the password reset link has expired, render an error message
            return res.render("auth-reset-password-cover", { user, error: { message: "Password reset link has expired", title: "Expired password reset link" } });
        }
    });

    // Listen for 'findOne-error' event (if any error occurs during user lookup)
    User.once("findOne-error", (error) => res.render("auth-reset-password-cover", { error: { message: "Error changing your password", title: "System error" } }));
};
