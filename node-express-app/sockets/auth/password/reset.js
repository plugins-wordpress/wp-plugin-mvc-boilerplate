"use strict";

const Redis = require("ioredis");

/*
|--------------------------------------------------------------------------
| TCP Routes: undefined Namespace
|--------------------------------------------------------------------------
|
| This module sets up TCP routes for handling password reset functionality using the Socket.IO library.
| It subscribes to a Redis server for message publishing and defines a function to handle the "update" action related to password reset.
|
*/

const { update } = require("../../../controllers/tcp/auth/password/reset");

module.exports = (io) => {
  // Create a Socket.IO namespace for password reset
  const ResetPasswordNamespace = io.of("/password-reset");

  // Initialize a Redis subscriber for listening to events
  const sub = new Redis();

  // Initialize a Redis publisher for publishing events
  const pub = new Redis();

  // Function to handle the "update" action on password reset connection
  const ResetPasswordOnConnection = (socket) => {
    // Handle the "update" action for password reset
    update(ResetPasswordNamespace, socket, sub, pub);

    // Additional password reset-related actions can be defined here as needed
  };

  // Set up an event listener for new password reset connections
  ResetPasswordNamespace.on("connection", ResetPasswordOnConnection);
};
