
"use strict";

const Redis = require("ioredis");
const tcp = require('../../src/modules/socket');


module.exports = (server) => (req, res, next) => {
    const main = tcp(server).of('/')
    main.on('connection', mainSocket => {
       mainSocket.emit('new-user', {user: req.user})
    })
    next();
}
