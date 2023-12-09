Creating an "isOnline" feature using Express, Socket.io, Redis, and MongoDB involves building a real-time system that can track and display the online status of users. Here's a high-level overview of the steps to implement such a feature:

1. Set up your environment:
   - Make sure you have Node.js and npm (Node Package Manager) installed.
   - Install and set up MongoDB.
   - Install and set up Redis.

2. Create a new Node.js project and install necessary packages:

```bash
npm init
npm install express socket.io mongoose redis
```

3. Set up your Express server with Socket.io and connect to MongoDB:

```javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/your-database', { useNewUrlParser: true });
const User = mongoose.model('User', { username: String });

// ...

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

4. Set up Redis to store online user data:

```javascript
const redis = require('redis');
const client = redis.createClient();

// ...

client.on('error', (error) => {
  console.error('Redis Error:', error);
});
```

5. Handle user connections and disconnections in Socket.io:

```javascript
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
```

6. Track online status and update Redis when users connect and disconnect:

```javascript
io.on('connection', (socket) => {
  console.log('User connected');

  // Save user's online status in Redis
  socket.on('user-online', (userId) => {
    client.set(`user:${userId}`, 'online');
  });

  // Remove user's online status from Redis when they disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
    // Get the user's ID from the socket, then remove them from Redis
  });
});
```

7. Implement API endpoints in Express to query the online status of users:

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

8. In your client-side code (e.g., a web page), use Socket.io to emit the 'user-online' event when a user connects and query the API endpoint to check the online status of a user.

This is a simplified example, and you may need to adapt it to your specific use case and security requirements. Additionally, you can enhance this system by adding features like user authentication and handling user presence with socket.io-redis for scalability.