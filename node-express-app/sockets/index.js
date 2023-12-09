'use strict'

const socket = require('../src/modules/socket');





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
module.exports = server => {

    const io = socket(server);
    require('./auth')(io)
    // require('./home')(io)
    require('./login')(io)
    require('./account')(io)
    require('./apps/chat')(io)
    require('./apps/email')(io)
    
}