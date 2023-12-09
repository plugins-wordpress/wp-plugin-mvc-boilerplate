'use strict';
/*
|------------------------------------------------------------------------------------
| Login Module
|------------------------------------------------------------------------------------
|
| The purpose of this code is to encapsulate and export the LoginController module in an object
| when the function is invoked. This pattern is often used to organize and structure the export of
| various modules within a Node.js application, making it easier to import and use the LoginController
| in other parts of the code.

*/
// Export a function that returns an object
module.exports = () => ({
    // Return an object with a single property: LoginController
    LoginController: require('./login'), // Import and assign the 'login' module to the 'LoginController' property
});
