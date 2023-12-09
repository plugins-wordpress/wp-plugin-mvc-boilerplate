// Import the 'MessageStore' module
const MessageStore = require('./MessageStore');

// Define the time-to-live (TTL) for conversation messages in seconds
const CONVERSATION_TTL = 24 * 60 * 60;

// Define the 'RedisMessageStore' class
class RedisMessageStore extends MessageStore {
  /**
   * Create a new instance of the RedisMessageStore class.
   * @param {Object} redisClient - The Redis client instance used for database operations.
   */
  constructor(redisClient) {
    super();
    this.redisClient = redisClient;
  }

  /**
   * Save a message to the Redis database.
   * @param {Object} message - The message object to be saved.
   */
  saveMessage(message) {
    const value = JSON.stringify(message);
    this.redisClient
      .multi()
      .rpush(`messages:${message.from}`, value) // Add the message to the sender's message list
      .rpush(`messages:${message.to}`, value)   // Add the message to the recipient's message list
      .expire(`messages:${message.from}`, CONVERSATION_TTL) // Set TTL for sender's message list
      .expire(`messages:${message.to}`, CONVERSATION_TTL)   // Set TTL for recipient's message list
      .exec(); // Execute the Redis multi command
  }

  /**
   * Retrieve messages for a specific user from the Redis database.
   * @param {string} userID - The ID of the user whose messages are to be retrieved.
   * @returns {Promise} A Promise that resolves to an array of message objects.
   */
  findMessagesForUser(userID) {
    return this.redisClient
      .lrange(`messages:${userID}`, 0, -1) // Retrieve all messages for the user
      .then((results) => {
        return results.map((result) => JSON.parse(result)); // Parse the stored JSON messages
      });
  }
}

// Export the 'RedisMessageStore' class for use in other modules
module.exports = RedisMessageStore;
