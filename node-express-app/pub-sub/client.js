const client = require('socket.io-client')
const Redis = require('ioredis');
const sub = new Redis()

const socket = client('http://localhost:3000')


socket.on('connect', () => {
    console.log('connected', socket.id)
})

socket.on('message', (message) => {
    // Handle incoming messages here
    console.log('Received message:', JSON.parse(message));
  });

const message  = {
    title: 'it works'
}
socket.emit('message', message);

sub.on('message', (channel, message) => {
    console.log('sub on message:', channel)
})
