'use strict';
// Import and structure controller objects related to user authentication and password management

const { LoginController } = require('./login')();
const { RegisterController, ActivateController, VerifyController } = require('./register')();
const { ForgotPasswordController, ResetPasswordController } = require('./password')();

// Exported module that provides access to the controller objects

module.exports = () => ({
  LoginController,
  RegisterController,
  ActivateController,
  VerifyController,
  ForgotPasswordController,
  ResetPasswordController
});
