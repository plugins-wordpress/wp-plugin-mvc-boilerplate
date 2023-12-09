'use strict';
const passport = require('passport');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const Redis = require('ioredis')
const { google, github, facebook } = require('../social/login')();
const LocalStrategy = require('passport-local').Strategy;
const Model = require('../../../models/User');
const User = new Model;
const pub = new Redis()
const sub = new Redis()

const updateUserStatus = (req, res, next, io, socket, channel = 'user:has:login') => {
    if(req.user){
       const userId = req.user._id.toString();
       User.updateById(userId, {isOnline: true, status: 'online'})
       User.on('updateById', result => {

        io.emit('user-has-login', req.user )
        pub.set(`user:${userId}`, "online");
        // Publish a message when a user goes online
        pub.publish(channel, JSON.stringify({ userId, status: "online" }));
       })
       User.on('updateById-error', error => io.emit('user-has-login-error', error ))
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
}

const authUser = server => (req, res, next) => {
    const  io = require('socket.io')(server)
    const ioOnConnection = socket => {
        updateUserStatus(req, res, next, io, socket)
    }
    res.locals.user = req.user;
    if (!res.locals.auth) res.locals.auth = req.isAuthenticated;

    io.on('connection', ioOnConnection)
    return next();
}

const onlineStatus = (req, rest, next, io, socket, pub, sub,  channel = "userStatus") => {
    //console.log("User connected");

    // Save user's online status in Redis when they authenticate
    if (req.user) {
        //console.log(req.user._id.toString())
        const userId = req.user._id.toString();

        User.updateById(userId, {isOnline: true, status: 'online'})
        User.on('updateById', result => {
 
         io.emit('user-has-login', req.user )
         pub.set(`user:${userId}`, "online");
         // Publish a message when a user goes online
         pub.publish(channel, JSON.stringify({ userId, status: "online" }));
        })
        User.on('updateById-error', error => io.emit('user-has-login-error', error ))

        // pub.set(`user:${userId}`, "online");
        // // Publish a message when a user goes online
        // pub.publish(channel, JSON.stringify({ userId, status: "online" }));
    }

    socket.on("disconnect", () => {
        //console.log("User disconnected");
        if (req.user) {

            const userId = req.user._id.toString();
            User.updateById(userId, {isOnline: false, status: 'offline'})
            User.on('updateById', result => {
     
             io.emit('user-has-logout', req.user )
             pub.set(`user:${userId}`, "offline");
             // Publish a message when a user goes online
             pub.publish(channel, JSON.stringify({ userId, status: "offline" }));
            })
            User.on('updateById-error', error => io.emit('user-has-login-error', error ))
            // const userId = req.user._id.toString();
            // // Remove the user from Redis when they disconnect
            // pub.del(`user:${userId}`);
            // // Publish a message when a user goes offline
            // pub.publish(channel, JSON.stringify({ userId, status: "offline" }));
        }
         // Unsubscribe when a client disconnects
         sub.unsubscribe(channel);
         sub.quit();
    });
};

 



const UserOnlineStatus = (server) => (req, res, next) => {
    const io = require("socket.io")(server);

    const ioOnConnection = (socket) => {
        //console.log(`A user connected: ${socket.id}`);
        // pubSubToChannel(socket);
        onlineStatus(req, res, next, io, socket, pub, sub)
      
        // getUser(req, res, next, io, socket, pub, sub)
    };
    res.locals.user = req.user;
    if (!res.locals.auth) res.locals.auth = req.isAuthenticated;
    io.on("connection", ioOnConnection);
    // Subscribe to user status changes
    sub.subscribe("userStatus");
    sub.on("message", (channel, message) => {
        // Broadcast the status change to all connected clients
        console.log('message', channel, message);
        io.emit("userStatusChange", JSON.parse(message));
        io.emit("userHasLoggedIn", req.user);
    });
    next();
};


// Local login strategy
const login = async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username });
        if (!user) return done(null, false, { message: 'Invalid username' });
        if (user.isActive === false) return done(null, false, { message: 'Please activate your account first' });
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) { return done(null, false, { message: 'Invalid password' }); }
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) { return done(null, false, { message: 'Invalid password' }); }
                if (result) {
                    console.log('user just logged in')
                    return done(null, user);
                    
                } 
                return done(null, false, { message: 'Invalid password' });
            });
        });
    } catch (err) {
        return done(err);
    }
};

// User serialization and deserialization
const serializer = (user, done) => done(null, user._id);
const deserializer = async (id, done) => {
    try {
        const user = await User.findById(id);
        return done(null, user);
    } catch (err) {
        return done(err);
    }
};

// Configure Passport strategies
passport.use(new LocalStrategy({ usernameField: 'username' }, login));
passport.use(google.googleStrategy());
passport.use(github.githubStrategy());

// Configure user serialization and deserialization
passport.serializeUser(serializer);
passport.deserializeUser(deserializer);

// List of authentication keys to exclude from res.locals.user
const authKeys = () => [
    'password',
    'password-confirm',
    'activationToken',
    'activationTokenDuration',
    'activationURL',
    'passwordResetToken',
    'passwordResetTokenLifetime',
    'passwordResetURL',
    'fullname',
    'terms',
    'username',
    'middlename',
];



module.exports = () => ({
    initialize: passport.initialize(),
    session: passport.session(),
    setUser: UserOnlineStatus //authUser ,
});
