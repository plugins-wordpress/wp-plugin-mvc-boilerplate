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
        
  // Configuration options for socket.io, the io 
  const io = socket(server); // socket(server = {}, options = {}) 
 
  // import routes 
  require("./account/password/forgot")(io);        
  require("./login")(io);        
    
}