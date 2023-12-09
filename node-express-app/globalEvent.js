"use strict";

const Redis = require("ioredis");
const moment = require("moment");
const User = require("./models/User");

const user = new User();
const sub = new Redis();
const pub = new Redis();


module.exports = server => (req, res, next) => {
    
    const io = require('socket.io')(server)

    io.on('connection', socket => {
        socket.on('user:login', message => {
            socket.emit('user:login', message)
        })
    })

    

}
