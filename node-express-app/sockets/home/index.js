"use strict";

const Redis = require("ioredis");
const { setupWorker } = require("@socket.io/sticky");

// Import various controllers and middleware functions
const {
    mainMiddleware,
    mainConnection,
    index,
    show,
    edit,
    update,
    destroy,
    isOnline,
    labo
} = require('../../controllers/tcp/home');

/*
|--------------------------------------------------------------------------
| TCP Routes: undefined Namespace
|--------------------------------------------------------------------------
|
| This module configures a Socket.IO server for handling TCP routes.
|
*/

module.exports = (io) => {
  
  // Create the "main" namespace with Socket.IO
  io.use(mainMiddleware);
  io.use(labo);

  // Subscribing to Redis for pub/sub communication
  const sub = new Redis();
  const pub = new Redis();

  // Function to handle connections within the "main" namespace
  const MainOnConnection = (socket) => {
    // Set up various event handlers for this connection
    index(io, socket, sub, pub);
    show(io, socket, sub, pub);
    update(io, socket, sub, pub);
    destroy(io, socket, sub, pub);
    edit(io, socket, sub, pub);
    isOnline(io, socket, sub, pub);
    mainConnection(io, socket, sub, pub);
  };
  
  // Define the "connection" event for the "main" namespace
  io.on("connection", MainOnConnection);
  
  // Set up worker functionality for load balancing (if applicable)
  setupWorker(io);
};
