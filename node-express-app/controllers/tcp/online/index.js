const Redis  = require('ioredis')
const moment  = require('moment');

const Contact = require('../../../../models/Contact');
const User = require('../../../../models/User');
const Chat = require('../../../../models/Chat')

const contact = new Contact()
const user = new User()
const chat = new Chat()
const sub  = new Redis()
const pub = new Redis()


exports.index = (req, res, next, io, socket, channel ='user-has-login', sub = new Redis(), pub = new Redis()) => {

    sub.subscribe(channel);
    sub.on('message', (channel, message) => {
        // When a message is received on the subscribed channel, broadcast it to all connected clients
        socket.emit('message', message);
      });

      socket.on('disconnect', () => {
        console.log(`A user disconnected: ${socket.id}`);
        // Unsubscribe when a client disconnects
        sub.unsubscribe(channel);
        sub.quit();    
      });

      socket.on('message', (message) => {
        // Publish the message to the Redis channel
        pub.publish(channel, JSON.stringify(message));
      });


}
exports.store = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => { }
exports.show = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => { }
exports.edit = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => { }
exports.update = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => { }
exports.destroy = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => { }

