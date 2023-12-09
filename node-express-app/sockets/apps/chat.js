"use strict";

const Redis = require("ioredis");
const {
  index,
  store,
  show,
  edit,
  status,
  update,
  destroy,
  contacts,
  authChatUsers,
  authChatsWithUser,
} = require("../../controllers/tcp/apps/chat");

/*
|--------------------------------------------------------------------------
| TCP Routes: undefined Namespace
|--------------------------------------------------------------------------
|
| This module sets up TCP routes for a chat application using the Socket.IO library.
| It subscribes to a Redis server for message publishing and defines functions for various chat actions.
|
*/

module.exports = (io) => {
  // Create a Socket.IO namespace for the chat
  const ChatNamespace = io.of("/chat");

  // Initialize a Redis subscriber for listening to events
  const sub = new Redis();

  // Initialize a Redis publisher for publishing events
  const pub = new Redis();

  // Function to handle actions on chat connection
  const ChatOnConnection = (socket) => {
    // Handle the "index" action for chat
    index(ChatNamespace, socket, sub, pub);

     // Handle the "store" action for chat
    store(ChatNamespace, socket, sub, pub);

    // Handle the "show" action for chat
    show(ChatNamespace, socket, sub, pub);

    // Handle the "update" action for chat
    update(ChatNamespace, socket, sub, pub);

    // Handle the "destroy" action for chat
    destroy(ChatNamespace, socket, sub, pub);

    // Handle the "edit" action for chat
    edit(ChatNamespace, socket, sub, pub);

    // Handle the "contacts" action for chat
    contacts(ChatNamespace, socket, sub, pub);

    // Handle the "status" action for chat
    status(ChatNamespace, socket, sub, pub);

    // Handle authentication for chat users
    authChatUsers(ChatNamespace, socket, sub, pub);

    // Additional actions can be defined here as needed
    authChatsWithUser(ChatNamespace, socket, sub, pub);
  };

  // Set up event listener for new chat connections
  ChatNamespace.on("connection", ChatOnConnection);
};
