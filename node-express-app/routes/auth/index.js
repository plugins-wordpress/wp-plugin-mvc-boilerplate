'use strict';
/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router that handles authentication-related routes.
 */
module.exports = (router = require('express').Router()) => {
    // Import controllers and middlewares
    const {
        LoginController,
        RegisterController,
        ActivateController,
        VerifyController,
        ForgotPasswordController,
        ResetPasswordController
    } = require('../../controllers/http/auth')();

    const Auth = require('../../middlewares/auth');
    const Register = require('../../middlewares/register');
   

    // Define and configure authentication-related routes
    router.post('/login', LoginController.login());
    router.get('/auth-login-cover', Auth.login, LoginController.showLogin);
    router.get('/login', Auth.login, LoginController.showLogin);
    router.get('/logout', LoginController.logout);

    router.get('/auth-register-cover', RegisterController.showRegister);
    router.get('/auth-forgot-password-cover', ForgotPasswordController.passwordForgotCover);
    router.get('/auth-reset-password-cover', ResetPasswordController.authResetPasswordCover);
    router.post('/auth-reset-password-cover', ResetPasswordController.authResetPasswordCover);

    router.get('/register', Register.register, RegisterController.showRegister);
    router.post('/register', RegisterController.userRegistration);

    router.get('/account/activate/:verificationToken', ActivateController.authVerifyEmail);

    router.get('/auth-verify-email-cover', VerifyController.authEmailVerification);
    router.get('auth-account-verified', VerifyController.authAccountVerified);

    router.get('/password/forgot', ForgotPasswordController.passwordForgotCover);
    router.post('/password/forgot', ForgotPasswordController.validateEmail, ForgotPasswordController.authPasswordForgotCover);
    router.get('/password/reset/:passwordResetToken', Auth.login, ResetPasswordController.authResetPasswordCover);
    router.post('/password/reset/:passwordResetToken', Auth.login, ResetPasswordController.resetPassword);

    return router;
};
