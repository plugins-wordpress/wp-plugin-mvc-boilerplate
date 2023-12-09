"use strict";

const Redis = require("ioredis");
const redis = require("redis");
const moment = require("moment");
const User = require("./models/User");

const user = new User();
const sub = new Redis();
const pub = new Redis();

//const client = redis.createClient();
pub.on("error", (error) => {
    console.error("Redis Error:", error);
});

exports.status = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => {};
exports.store = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => {};
exports.update = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => {};

const pubSubToChannel = (socket, channel = "is-online") => {
    // Subscribe to a channel when a client connects
    // const redisSubscriber = new Redis();
    sub.subscribe(channel);
    sub.on("message", (channel, message) => {
        // When a message is received on the subscribed channel, broadcast it to all connected clients
        socket.emit("message", message);
    });
    socket.on("disconnect", () => {
        // Unsubscribe when a client disconnects
        sub.unsubscribe(channel);
        sub.quit();

        console.log("User disconnected");
        if (socket.request.user) {
            const userId = socket.request.user._id;
            // Remove the user from Redis when they disconnect
            pub.del(`user:${userId}`);
        }
    });
    socket.on("message", (message) => {
        // Publish the message to the Redis channel
        pub.publish(channel, JSON.stringify(message));
    });

    // Save user's online status in Redis when they authenticate
    if (socket.request.user) {
        const userId = socket.request.user._id;
        pub.set(`user:${userId}`, "online");
    }
};

const getUser = (req, res, next, io, socket) => {
    socket.on('is-user-online', user => {
        const userId = req.user._id.toString();
        console.log('user Id', user._id, 'request user id', req.user._id.toString())
        pub.get(`user:${userId}`, (err, status) => {
          if (err) {
            console.log(err);
            //return res.status(500).json({ error: 'Internal server error' });
          }
          if (status === 'online') {
             return console.log({ isOnline: true })
            //return res.json({ isOnline: true });
          }
          return console.log({ isOnline: true })
          //return res.json({ isOnline: false });
        });
     })

}


const onlineStatus = (req, rest, next, io, socket, pub, sub,  channel = "userStatus") => {
    //console.log("User connected");

    // Save user's online status in Redis when they authenticate
    if (req.user) {
        //console.log(req.user._id.toString())
        const userId = req.user._id.toString();
        pub.set(`user:${userId}`, "online");
        // Publish a message when a user goes online
        pub.publish(channel, JSON.stringify({ userId, status: "online" }));
    }

    socket.on("disconnect", () => {
        //console.log("User disconnected");
        if (req.user) {
            const userId = req.user._id.toString();
            // Remove the user from Redis when they disconnect
            pub.del(`user:${userId}`);
            // Publish a message when a user goes offline
            pub.publish(channel, JSON.stringify({ userId, status: "offline" }));
        }
         // Unsubscribe when a client disconnects
         sub.unsubscribe(channel);
         sub.quit();
    });
};


module.exports = (server) => (req, res, next) => {
    const io = require("socket.io")(server);

    const ioOnConnection = (socket) => {
        //console.log(`A user connected: ${socket.id}`);
        // pubSubToChannel(socket);
        onlineStatus(req, res, next, io, socket, pub, sub)
      
        // getUser(req, res, next, io, socket, pub, sub)
    };
    io.on("connection", ioOnConnection);
    // Subscribe to user status changes
    sub.subscribe("userStatus");
    sub.on("message", (channel, message) => {
        // Broadcast the status change to all connected clients
        console.log('message', channel, message);
        io.emit("userStatusChange", JSON.parse(message));
    });
    next();
};
