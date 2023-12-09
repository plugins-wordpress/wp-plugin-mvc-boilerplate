'use strict'
/*
|------------------------------------------------------------------------------------
| Register Module
|------------------------------------------------------------------------------------
|
| The purpose of this code is to encapsulate and export these controller modules in an object
| when the function is invoked. This pattern is often used to organize and structure the export
| of various modules within a Node.js application, making it easier to import and use these controllers
| in other parts of the code. In this case, it seems to be related to user registration, account activation,
| and email verification within the application.

*/

// Export a function that returns an object
module.exports = () => ({
    // Return an object with three properties: RegisterController, ActivateController, and VerifyController
    RegisterController: require('./registration'), // Import and assign the 'registration' module to the 'RegisterController' property
    ActivateController: require('./activation'),   // Import and assign the 'activation' module to the 'ActivateController' property
    VerifyController: require('./verification')    // Import and assign the 'verification' module to the 'VerifyController' property
});
