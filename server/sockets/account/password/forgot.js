"use strict";

const Redis = require("ioredis");


const ForgotController = require('../../../app/controllers/tcp/Account/Password/ForgotController');

const {index,store,show,edit,update,destroy} = new ForgotController;


/*
|--------------------------------------------------------------------------
| TCP Routes: undefined Namespace
|--------------------------------------------------------------------------
|
|
*/

module.exports = (io) => {
  
  // undefined namespace
  const forgotNamespace = io.of("/forgots");

  // subscription
  const sub = new Redis();
  // publishing
  const pub = new Redis();

  // forgotNamespace on connection
  const forgotOnConnection = (socket) => {
    
    index(forgotNamespace, socket, sub, pub)
    store(forgotNamespace, socket, sub, pub)
    show(forgotNamespace, socket, sub, pub)
    edit(forgotNamespace, socket, sub, pub)
    update(forgotNamespace, socket, sub, pub)
    destroy(forgotNamespace, socket, sub, pub)

  };
  forgotNamespace.on("connection", forgotOnConnection);
};
