
"use strict";

const AccountController = require('../app/controllers/http/AccountController');

const Controller = new AccountController;

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
    
    router.get('/passord/forgot', Controller.registerMiddleware, Controller.authForgotPassword);
    router.post('/password/forgot', Controller.authResetPasswordCover);
    // router.post('/password/forgot', Controller.emailValidation(), Controller.validate, Controller.authResetPasswordCover);
   
    router.get('/pages-account-settings-account', Controller.pagesAccountSettingsAccount);
    router.get('/pages-account-settings-security',Controller.pagesAccountSettingsSecurity);
    router.get('/pages-account-settings-billing', Controller.pagesAccountSettingsBilling);
    router.get('/pages-account-settings-notifications', Controller.pagesAccountSettingsNotifications);
    router.get('/pages-account-settings-connections', Controller.pagesAccountSettingsConnections);
    router.get('/auth-reset-password-cover')
 

    return router
}
