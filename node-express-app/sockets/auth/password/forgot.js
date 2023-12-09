"use strict";

const Redis = require("ioredis");

/*
|--------------------------------------------------------------------------
| TCP Routes: undefined Namespace
|--------------------------------------------------------------------------
|
| This module sets up TCP routes for handling forgot password functionality using the Socket.IO library.
| It subscribes to a Redis server for message publishing and defines functions for various actions related to forgot passwords.
|
*/

const { index, store, show, edit, update, destroy } = require("../../../controllers/tcp/auth/password/forgot");

module.exports = (io) => {
  // Create a Socket.IO namespace for forgot password
  const ForgotPasswordNamespace = io.of("/password-forgot");

  // Initialize a Redis subscriber for listening to events
  const sub = new Redis();

  // Initialize a Redis publisher for publishing events
  const pub = new Redis();

  // Function to handle actions on forgot password connection
  const ForgotPasswordOnConnection = (socket) => {
    // Handle the "index" action for forgot password
    index(ForgotPasswordNamespace, socket, sub, pub);

    // Handle the "store" action for forgot password
    store(ForgotPasswordNamespace, socket, sub, pub);

    // Handle the "show" action for forgot password
    show(ForgotPasswordNamespace, socket, sub, pub);

    // Handle the "edit" action for forgot password
    edit(ForgotPasswordNamespace, socket, sub, pub);

    // Handle the "update" action for forgot password
    update(ForgotPasswordNamespace, socket, sub, pub);

    // Handle the "destroy" action for forgot password
    destroy(ForgotPasswordNamespace, socket, sub, pub);

    // Additional forgot password-related actions can be defined here as needed
  };

  // Set up an event listener for new forgot password connections
  ForgotPasswordNamespace.on("connection", ForgotPasswordOnConnection);
};
