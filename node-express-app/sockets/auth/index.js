'use strict';
module.exports = (io) => {
    // This module is responsible for setting up various password-related Socket.IO functionalities.
  
    // Include and set up the "forgot" functionality
    require('./password/forgot')(io);
  
    // Include and set up the "reset" functionality
    require('./password/reset')(io);
  };
  