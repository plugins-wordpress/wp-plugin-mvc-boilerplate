Creating an "isOnline" feature with Express, Socket.io, ioredis, MongoDB, and Passport.js using pub/sub (publish/subscribe) for real-time communication involves building a system to track and display the online status of authenticated users. Below is a step-by-step guide on how to implement this feature:

1. Set up your environment:

   - Ensure you have Node.js and npm installed.
   - Install and configure MongoDB.
   - Set up ioredis for pub/sub.
   - Create a new Node.js project and install the required packages:

```bash
npm init
npm install express socket.io mongoose ioredis passport passport-local express-session
```

2. Create a basic Express application with Passport.js for user authentication and session management:

```javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/your-database', { useNewUrlParser: true });
const User = mongoose.model('User', { username: String, password: String });

// Passport.js setup
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (user.password !== password) return done(null, false);
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

app.use(
  expressSession({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ...

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

3. Set up ioredis to implement pub/sub and handle user connections and disconnections in Socket.io:

```javascript
const Redis = require('ioredis');
const client = new Redis();
const sub = new Redis();

io.on('connection', (socket) => {
  console.log('User connected');

  // Save user's online status in Redis when they authenticate
  if (socket.request.user) {
    const userId = socket.request.user._id;
    client.set(`user:${userId}`, 'online');
    // Publish a message when a user goes online
    client.publish('userStatus', JSON.stringify({ userId, status: 'online' }));
  }

  socket.on('disconnect', () => {
    console.log('User disconnected');
    if (socket.request.user) {
      const userId = socket.request.user._id;
      // Remove the user from Redis when they disconnect
      client.del(`user:${userId}`);
      // Publish a message when a user goes offline
      client.publish('userStatus', JSON.stringify({ userId, status: 'offline' }));
    }
  });
});

// Subscribe to user status changes
sub.subscribe('userStatus');
sub.on('message', (channel, message) => {
  // Broadcast the status change to all connected clients
  io.emit('userStatusChange', JSON.parse(message));
});
```

4. Implement an API endpoint in Express to query the online status of users:

```javascript
app.get('/isOnline/:userId', (req, res) => {
  const userId = req.params.userId;
  client.get(`user:${userId}`, (err, status) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (status === 'online') {
      return res.json({ isOnline: true });
    }
    return res.json({ isOnline: false });
  });
});
```

5. In your client-side code, use Passport.js for authentication, subscribe to the 'userStatusChange' event to receive real-time updates on user status changes, and optionally emit the 'user-online' event when a user connects.

This example provides a basic setup, and you should adapt it to your specific use case, implement security measures, and handle various edge cases as needed. Pub/sub in Redis allows for real-time updates and is suitable for implementing features like online status with minimal latency.