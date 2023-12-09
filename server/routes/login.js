
"use strict";

const LoginController = require('../app/controllers/http/LoginController');

const {showLogin, login, logout, isActive} = new LoginController;

const loginMiddleware = (req, res, next) => req.isAuthenticated() ? res.redirect('/'): next()

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

    router.get('/login', loginMiddleware, showLogin);
    router.post('/login',login());
    router.get('/logout', logout)

    return router
}
