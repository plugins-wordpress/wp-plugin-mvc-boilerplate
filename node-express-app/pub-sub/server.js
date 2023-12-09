const express = require('express');
const Redis = require('ioredis');

// const redis = new Redis();

const pub = new Redis();
const sub = new Redis();

const app = express();
const http = require('http').createServer(app);

const port = process.env.PORT || 3000;

http.listen(port, () => {});

const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // socket.emit('user:login',{user: 'me'})
  
    // Subscribe to a channel when a client connects
    const channel = 'chat';
    // const redisSubscriber = new Redis();
    sub.subscribe(channel);
  
    sub.on('message', (channel, message) => {
      // When a message is received on the subscribed channel, broadcast it to all connected clients
      socket.emit('message', message);
      console.log('channel: ' + channel)
      console.log('message: ' + message)
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
  });

