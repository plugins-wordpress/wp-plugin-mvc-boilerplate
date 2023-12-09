"use strict";

const Redis = require("ioredis");

/*
|--------------------------------------------------------------------------
| TCP Routes: undefined Namespace
|--------------------------------------------------------------------------
|
|
*/

module.exports = (io) => {
  
  // undefined namespace
  const LoginNamespace = io.of("/login");

  // subscribing
  const sub = new Redis();
  // publishing
  const pub = new Redis();

  const login = (io = LoginNamespace, socket, sub, pub) => {
    socket.on('on-login', data => console.log('on-login', data));
    // LoginNamespace.emit('message', {message: 'trial'})

  }
  // LoginNamespace on connection
  const LoginOnConnection = (socket) => {
     login(LoginNamespace, socket, sub, pub)

  };
  LoginNamespace.on("connection", LoginOnConnection);
};
