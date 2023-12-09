To send global events at login and logout using Express, Redis, Socket.io, and MongoDB, you'll need to set up the necessary components and implement the logic to handle these events. Here's a step-by-step guide on how to achieve this:

1. **Set up your project**:
   - Create a new Node.js project and install the required dependencies, including Express, Socket.io, Redis, and Mongoose (for MongoDB).

2. **Set up Express**:
   - Create an Express application and configure it to handle routes for login and logout.

3. **Set up MongoDB**:
   - Create a MongoDB database and define schemas and models for your user data. You'll need to store user login and logout events in your database.

4. **Handle Login and Logout**:
   - Implement routes and logic for user login and logout. When a user logs in or out, create a new document in your MongoDB database to log the event. This could include user ID, timestamp, and event type (login or logout).

5. **Set up Redis**:
   - Install and configure Redis as a message broker. You will use Redis to publish and subscribe to events.

6. **Set up Socket.io**:
   - Create a Socket.io server and integrate it with your Express application. Socket.io will be used to broadcast events to connected clients.

7. **Publish Events to Redis**:
   - When a user logs in or out, publish an event to a Redis channel to notify other parts of your application that an event has occurred. For example, you can publish a message like "user:login" or "user:logout" with relevant data.

```javascript
// Inside your login and logout routes
const userId = /* Get the user's ID */;
const eventData = {
  userId,
  eventType: 'login' // or 'logout',
  timestamp: new Date(),
};

// Publish the event to Redis
redisClient.publish('user:event', JSON.stringify(eventData));
```

8. **Subscribe to Redis Events**:
   - Set up a listener for Redis events in your application. When an event is published, your application should receive it and decide how to handle it.

```javascript
// In your application setup
const redis = require('redis');
const redisClient = redis.createClient();

redisClient.on('message', (channel, message) => {
  if (channel === 'user:event') {
    const eventData = JSON.parse(message);
    // Broadcast the event to all connected Socket.io clients
    io.emit('user:event', eventData);
  }
});

redisClient.subscribe('user:event');
```

9. **Socket.io Event Handling**:
   - In your Socket.io server, listen for "user:event" events and broadcast them to connected clients. Clients can listen for these events and take appropriate actions.

```javascript
// In your Socket.io setup
io.on('connection', (socket) => {
  // Listen for user events
  socket.on('user:event', (eventData) => {
    // Handle the event as needed
    // For example, you can notify the client of a login or logout event
    socket.emit('user:event', eventData);
  });
});
```

10. **Client-Side**:
    - On the client side, you should set up a Socket.io client to listen for "user:event" events and handle them accordingly.

That's a basic outline of how you can implement global events for login and logout using Express, Redis, Socket.io, and MongoDB. You can expand on this foundation to add more features and customizations as needed for your specific application.