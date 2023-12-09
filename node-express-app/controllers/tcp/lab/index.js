
const Redis = require('ioredis');
exports.index = (req, res, next, io, socket, sub = new Redis(), pub = new Redis(), ...args) => {
    socket.emit('new-user', {user: req.user})
    socket.on('chats', data => console.log(data))
}