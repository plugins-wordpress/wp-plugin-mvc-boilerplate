
"use strict";

const OnlineController = require('../app/controllers/http/OnlineController');

const {status, update} = new OnlineController;

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
    
     // Route to update online status
     router.put('/user/:id/status', update);
     // Route to get online status
     router.get('/user/:id/status', status);
 

    return router
}
