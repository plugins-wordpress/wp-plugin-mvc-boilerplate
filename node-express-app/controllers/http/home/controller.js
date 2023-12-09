'use strict';
// Import the 'ioredis' library for Redis connection
const Redis = require('ioredis');
const redis = new Redis();

// Middleware for user authentication
exports.auth = (req, res, next) => {
  // This middleware function checks if a user is authenticated.
  // If the user is authenticated, it calls the next middleware in the chain.
  // If not authenticated, it redirects the user to the login page.
  req.isAuthenticated() ? next() : res.redirect('/login');
};

// Render the index view with user information
exports.index = (req, res, next) => {
  // This function renders the 'index' view, typically the application's main page.
  // It also passes user information from the request to the view.
  res.render('index', { user: req.user });
};

// Check if a user is online
exports.isOnline = async (req, res, next) => {
  // Define a Redis key prefix for tracking user presence
  const presenceKeyPrefix = 'user:presence:';
  
  // Extract the username from the request parameters
  const { username } = req.params;
  try {
    // Query Redis to check if the user is online based on the presence key
    const isOnline = await redis.get(presenceKeyPrefix + username);
    res.json({ isOnline: Boolean(isOnline) });
  } catch (err) {
    // Handle any errors that occur during the Redis operation
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
