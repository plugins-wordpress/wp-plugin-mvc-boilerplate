'use strict';
// Import required modules
const Redis = require('ioredis');
const redis = new Redis();
const redisClient = new Redis();

// Import necessary models
const Contact = require('../../../models/Contact');
const User = require('../../../models/User');
const Chat = require('../../../models/Chat');

// Helper function to generate a random session ID
const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

// Import custom session and message stores
const { RedisSessionStore } = require("./sessionStore");
const sessionStore = new RedisSessionStore(redisClient);

const { RedisMessageStore } = require("./messageStore");
const messageStore = new RedisMessageStore(redisClient);

// Main middleware function for handling socket connections
exports.mainMiddleware = async (socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    const session = await sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("Invalid username"));
  }
  socket.sessionID = randomId();
  socket.userID = randomId();
  socket.username = username;
  next();
}

// Main connection function for handling user connections
exports.mainConnection = async (io, socket, sub, pub) => {
  // Persist session
  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    username: socket.username,
    connected: true,
  });

  // Emit session details
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  // Join the "userID" room
  socket.join(socket.userID);

  // Fetch existing users and their messages
  const users = [];
  const [messages, sessions] = await Promise.all([
    messageStore.findMessagesForUser(socket.userID),
    sessionStore.findAllSessions(),
  ]);
  const messagesPerUser = new Map();
  messages.forEach((message) => {
    const { from, to } = message;
    const otherUser = socket.userID === from ? to : from;
    if (messagesPerUser.has(otherUser)) {
      messagesPerUser.get(otherUser).push(message);
    } else {
      messagesPerUser.set(otherUser, [message]);
    }
  });

  sessions.forEach((session) => {
    users.push({
      userID: session.userID,
      username: session.username,
      connected: session.connected,
      messages: messagesPerUser.get(session.userID) || [],
    });
  });
  socket.emit("users", users);

  // Notify existing users of the new connection
  socket.broadcast.emit("user connected", {
    userID: socket.userID,
    username: socket.username,
    connected: true,
    messages: [],
  });

  // Forward private messages to the recipient (and sender's other tabs)
  socket.on("private message", ({ content, to }) => {
    const message = {
      content,
      from: socket.userID,
      to,
    };
    socket.to(to).to(socket.userID).emit("private message", message);
    messageStore.saveMessage(message);
  });

  // Notify users upon disconnection
  socket.on("disconnect", async () => {
    const matchingSockets = await io.in(socket.userID).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      // Notify other users of the disconnection
      socket.broadcast.emit("user disconnected", socket.userID);
      // Update the connection status of the session
      sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
        connected: false,
      });
    }
  });
}

// Placeholder functions for CRUD operations (not implemented)
exports.index = (io, socket, sub, pub, user = new User, contact = new Contact) => {}
exports.show = (io, socket, sub, pub, user = new User, contact = new Contact) => { }
exports.edit = (io, socket, sub, pub, user = new User, contact = new Contact) => { }
exports.store = (io, socket, sub, pub, user = new User, contact = new Contact) => { }
exports.update = (io, socket, sub, pub, user = new User, contact = new Contact) => { }
exports.destroy = (io, socket, sub, pub, user = new User, contact = new Contact) => { }

// Function to track user presence
exports.isOnline = (io, socket, sub, pub) => {
  const presenceKeyPrefix = 'user:presence:';

  // Handle user connection
  const { username } = socket.handshake.query;

  // Store the user's connection status in Redis with a TTL of 60 seconds
  redis.setex(presenceKeyPrefix + username, 60, true);

  // Handle user disconnection
  socket.on('disconnect', () => {
    // Remove the user's presence information from Redis
    redis.del(presenceKeyPrefix + username);
  });
}

// A sample function (not used in the provided code)
exports.labo = (req, res, next) => {
  console.log('This is from the home socket');
  res.status(200).send({ message: 'from home socket' });
}
