'use strict';// Import the chat controller and Auth middleware

const {createServer} = require('http')

const socket = require('../../src/modules/socket');
/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router with chat application routes.
 */

// module.exports = (server) => (req, res, next) => {
//     const main = tcp(server).of('/')
//     main.on('connection', mainSocket => {
//        mainSocket.emit('new-user', {user: req.user})
//     })
//     next();
// }

module.exports = (app = require('express')) => {
    /**
     * GET /app-chat
     * Display the chat application.
     */
    app.get('/chat', (req, res, next) => {
        const main = tcp(createServer(router)).of('/')
        main.on('connection', mainSocket => {
            mainSocket.emit('new-user', {user: req.user})
        })
        next();
        res.status(200).send('it is working!')
    });
    
};
