'use strict';
/*
|------------------------------------------------------------------------------------
| Password Module
|------------------------------------------------------------------------------------
|
| The purpose of this code is to encapsulate and export these controller modules in an object
| when the function is invoked. This pattern is often used to organize and structure the export
| of various modules within a Node.js application, making it easier to import and use these
| controllers in other parts of the code.

*/

// Export a function that returns an object
module.exports = () => ({
    // Return an object with two properties: ForgotPasswordController and ResetPasswordController
    ForgotPasswordController: require('./forgot'),    // Import and assign the 'forgot' module to the 'ForgotPasswordController' property
    ResetPasswordController: require('./reset'),      // Import and assign the 'reset' module to the 'ResetPasswordController' property
});
