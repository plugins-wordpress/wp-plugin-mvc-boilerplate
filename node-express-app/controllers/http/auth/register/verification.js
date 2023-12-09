'use strict';
/*
|------------------------------------------------------------------------------------
| Verification Controller
|------------------------------------------------------------------------------------
|
| These functions are designed to render the appropriate pages for email verification and
| account activation based on the data available in the res.locals object, which is commonly
| used to pass data between different middleware and controller functions in a Node.js application.

*/

// Controller function to render the email verification page
exports.authEmailVerification = (req, res, next) => res.render('auth-verify-email-cover', { user: res.locals.registeredUser });

// Controller function to render the account verified page
exports.authAccountVerified = (req, res, next) => res.render('auth-account-verified', { user: res.locals.recentlyActivatedAccount });
