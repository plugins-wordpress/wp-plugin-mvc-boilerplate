
"use strict";

const HomeController = require('../app/controllers/http/HomeController');

const {index,store,show,edit,update,destroy} = new HomeController;


const auth = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login');

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
    
    router.get('/', auth,index);
 
    return router
}
