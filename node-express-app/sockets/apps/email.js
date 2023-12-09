"use strict";

const Redis = require("ioredis");
const { index, contacts } = require("../../controllers/tcp/apps/email");

/*
|--------------------------------------------------------------------------
| TCP Routes: undefined Namespace
|--------------------------------------------------------------------------
|
| This module sets up TCP routes for an email application using the Socket.IO library.
| It subscribes to a Redis server for message publishing and defines functions for email-related actions.
|
*/

module.exports = (io) => {
  // Create a Socket.IO namespace for email
  const EmailNamespace = io.of("/email");

  // Initialize a Redis subscriber for listening to events
  const sub = new Redis();

  // Initialize a Redis publisher for publishing events
  const pub = new Redis();

  // Function to handle actions on email connection
  const EmailOnConnection = (socket) => {
    // Handle the "index" action for email
    index(EmailNamespace, socket, sub, pub);

    // Handle the "contacts" action for email
    contacts(EmailNamespace, socket, sub, pub);

    // Additional email-related actions can be defined here as needed
  };

  // Set up event listener for new email connections
  EmailNamespace.on("connection", EmailOnConnection);
};
