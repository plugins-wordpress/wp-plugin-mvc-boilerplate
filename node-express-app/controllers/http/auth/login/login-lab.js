'use strict';
const Redis = require('ioredis')
const UserModel = require('../../../../models/User')

const pub = new Redis();
const sub = new Redis();
const User = new UserModel()

/*
|------------------------------------------------------------------------------------
| Login Controller
|------------------------------------------------------------------------------------
|
| This code is a typical setup for handling user authentication and login using the Passport library
| in a Node.js application. It renders login pages, processes login attempts, and allows users to log out
| while handling errors as needed.

*/

// Import the 'passport' library for authentication
const passport = require('passport');

// Controller function to render the login page
exports.showLogin = server => (req, res, next) => res.render('auth-login-cover', { error: req.query.error });


// Controller function to handle user login
exports.login = server => (req, res, next, io, socket) => {

    const main = require('socket.io')(server)
   

     console.log('User has just logged in')
    return passport.authenticate('local', {
        successRedirect: '/',                // Redirect to the home page upon successful login
        failureRedirect: '/login?error=true', // Redirect to the login page with an error query parameter on login failure
        failureFlash: true                   // Enable flash messages for login failures
    })
} ;

// Controller function to handle user logout
// exports.logout = (req, res, next) => req.logout(err => err ? next(err) : res.redirect('/'));

const logUserOut = (req, res, next, io, socket, channel = 'user:has:logout') => {
    if(req.user){
        const userId = req.user._id.toString();
       User.updateById(userId, {isOnline: true, status: 'offline'})
       User.on('updateById', result => {

        io.emit('user-has-logout', req.user )
        pub.set(`user:${userId}`, "offline");
        // Publish a message when a user goes online
        pub.publish(channel, JSON.stringify({ userId, status: "offline" }));
       })
       User.on('updateById-error', error => io.emit('user-has-logout-error', error ))
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
exports.logout = server => (req, res, next) => {

    console.log('User has just logged out')
    const main = require('socket.io')(server)
    const ioOnConnection = socket => {
        logUserOut(req, res, next, main, socket, 'user:has:logout')
        main.emit('logged', req.user)
    }
    main.on('connection', ioOnConnection)
    return req.logout(err => err ? next(err) : res.redirect('/'))
    //return next()

}
