"use strict";

const Redis = require("ioredis");
const {
  index,
  show,
  edit,
  update,
  destroy,
  passwordReset,
} = require('../controllers/tcp/account');

/*
|--------------------------------------------------------------------------
| TCP Routes: "account" Namespace
|--------------------------------------------------------------------------
|
| This module defines TCP routes for the "account" namespace.
|
*/

module.exports = (io) => {
  
  // Define the "account" namespace
  const AccountNamespace = io.of("/account");

  // Create a Redis client for subscribing
  const sub = new Redis();
  // Create a Redis client for publishing
  const pub = new Redis();

  // Handler for "account" namespace on connection
  const AccountOnConnection = (socket) => {
    // Configure various routes and actions for the namespace
    index(AccountNamespace, socket, sub, pub);      // Route for index
    show(AccountNamespace, socket, sub, pub);       // Route for show
    update(AccountNamespace, socket, sub, pub);     // Route for update
    destroy(AccountNamespace, socket, sub, pub);    // Route for destroy
    edit(AccountNamespace, socket, sub, pub);        // Route for edit
    passwordReset(AccountNamespace, socket, sub, pub);  // Route for password reset
  };
  
  // Define an event handler for when a client connects to the "account" namespace
  AccountNamespace.on("connection", AccountOnConnection);
};
