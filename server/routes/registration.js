
"use strict";

const RegistrationController = require('../app/controllers/http/RegistrationController');

const Controller = new RegistrationController;

/*
|--------------------------------------------------------------------------
| User Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register users routes for your application. These
| routes are first mounted to the Router (see Router Class in /src/Router.js)
| and then to the  App (See  App Class in /src/App.js)
| Now create something great!
|
*/
module.exports = (router = require('express').Router()) => {
    
    router.get('/register', Controller.registerMiddleware, Controller.showRegister);
    router.post('/register', Controller.register);
    router.get('/auth-verify-email-cover', Controller.authEmailVerification)
    router.get('/account/activate/:verificationToken', Controller.authVerifyEmail)
    router.get('auth-account-verified', Controller.authAccountVerified);
 
    return router
}
