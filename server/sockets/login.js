"use strict";

const Redis = require("ioredis");


const LoginController = require('../app/controllers/tcp/LoginController');

const {index,store,show,edit,update,destroy} = new LoginController;


/*
|--------------------------------------------------------------------------
| TCP Routes: undefined Namespace
|--------------------------------------------------------------------------
|
|
*/

module.exports = (io) => {
  
  // undefined namespace
  const loginNamespace = io.of("/login");

  // subscription
  const sub = new Redis();
  // publishing
  const pub = new Redis();

  // loginNamespace on connection
  const loginOnConnection = (socket) => {
    
    index(loginNamespace, socket, sub, pub)
    // store(loginNamespace, socket, sub, pub)
    // show(loginNamespace, socket, sub, pub)
    // edit(loginNamespace, socket, sub, pub)
    // update(loginNamespace, socket, sub, pub)
    // destroy(loginNamespace, socket, sub, pub)

  };
  loginNamespace.on("connection", loginOnConnection);
};
