'use strict';
/*
|------------------------------------------------------------------------------------
| Activation Controller
|------------------------------------------------------------------------------------
|
| This code is designed to handle the email verification process for user accounts and
| includes various checks and responses to different verification scenarios.

*/

// Import the 'passport' library for authentication
const passport = require("passport");

// Import the 'User' model
const Model = require("../../../../models/User");
const User = new Model();  // Create a new instance of the User model

// Controller function to verify a user's email activation
exports.authVerifyEmail = (req, res, next) => {
    // Find a user with the provided activation token
    User.findOne({ activationToken: req.params.verificationToken });

    // Listen for the 'findOne' event
    User.once("findOne", (user) => {
        if (!user.activationToken || user.activationToken === null) {
            // If the user's account is already active, send a forbidden status (403) with a message
            return res.status(403).send({ message: "This account is already active!" });
        }

        if (user.activationTokenDuration > Date.now()) {
            // If the activation token is valid and not expired, update the user's account to mark it as active
            User.updateById(user._id.toString(), { isActive: true, activationToken: null });
            // acknowledged: true,
            // insertedId: null,
            // matchedCount: 1,
            // modifiedCount: 1,
            // upsertedCount: 0

            // Listen for the 'updateById' event
            User.once("updateById", (result) => {
                if(result.acknowledged &&  result.matchedCount && result.modifiedCount){
                     // Set a local variable for the recently activated account and render a success page
                    res.locals.recentlyActivatedAccount = user;
                    res.render("auth-account-verified", { user: res.locals.recentlyActivatedAccount });
                }else{
                     // If the activation token has expired, send a forbidden status (403) with an expiration message
                    res.status(403).send({ message: "Activation error: We could not activate your account at this time!" });
                }
               
            });
            // Listen for 'updateById-error' event (if any error occurs during the account update)
            User.once("updateById-error", (error) => res.status(403).send({ message: "We could not activate your account. Please try again" }));
        } else {
            // If the activation token has expired, send a forbidden status (403) with an expiration message
            res.status(403).send({ message: "Verification token has expired. Please register again" });
        }
    });
    // Listen for 'findOne-error' event (if any error occurs during user lookup)
    User.once("findOne-error", (error) => res.status(403).send({ message: "Verification token is invalid", error }));
};
