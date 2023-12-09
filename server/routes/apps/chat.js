
"use strict";

const ChatsController = require('../../app/controllers/http/Apps/Chat/ChatsController');

const {index,store,show,edit,update,destroy} = new ChatsController;

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
    
    router.get('/app-chat', index)

    return router
}
