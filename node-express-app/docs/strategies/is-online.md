Implementing an "isOnline" feature with Express, Socket.io, Redis, MongoDB, and Passport.js involves building a real-time system to track the online status of authenticated users. Here's a step-by-step guide:

1. Set up your environment:

   - Ensure you have Node.js and npm installed.
   - Install and configure MongoDB.
   - Set up Redis.
   - Create a new Node.js project and install the necessary packages:

```bash
npm init
npm install express socket.io mongoose redis passport passport-local express-session
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

3. Set up Redis to store online user data and handle user connections and disconnections in Socket.io:

```javascript
const redis = require('redis');
const client = redis.createClient();

io.on('connection', (socket) => {
  console.log('User connected');

  // Save user's online status in Redis when they authenticate
  if (socket.request.user) {
    const userId = socket.request.user._id;
    client.set(`user:${userId}`, 'online');
  }

  socket.on('disconnect', () => {
    console.log('User disconnected');
    if (socket.request.user) {
      const userId = socket.request.user._id;
      // Remove the user from Redis when they disconnect
      client.del(`user:${userId}`);
    }
  });
});
```

4. Implement API endpoints in Express to query the online status of users:

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

5. In your client-side code, use Passport.js for authentication, emit the 'user-online' event when a user connects, and query the API endpoint to check the online status of a user.

This example demonstrates a simplified setup, and you should adapt it to your specific use case, add security measures, and handle various edge cases as needed. Additionally, consider implementing user presence with socket.io-redis for scalability in a production environment.