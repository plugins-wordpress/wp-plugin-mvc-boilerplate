'use strict';
/*
|--------------------------------------------------------------------------
| Abstract Class: MessageStore
|--------------------------------------------------------------------------
|
| This abstract class outlines the methods for saving and retrieving messages.
|
| Methods:
| - saveMessage(message): Abstract method to save a message.
| - findMessagesForUser(userID): Abstract method to find messages for a specific user.
|
*/

class MessageStore {
  /**
   * Save a message.
   *
   * @param {Object} message - The message object to be saved.
   */
  saveMessage(message) {}

  /**
   * Find messages for a specific user.
   *
   * @param {string} userID - The ID of the user for whom messages are to be retrieved.
   * @returns {Array} - An array of message objects for the specified user.
   */
  findMessagesForUser(userID) {}
}

/*
|--------------------------------------------------------------------------
| Class: InMemoryMessageStore (Extends MessageStore)
|--------------------------------------------------------------------------
|
| This class provides an in-memory implementation of MessageStore.
|
| Methods:
| - saveMessage(message): Save a message in memory.
| - findMessagesForUser(userID): Retrieve messages for a specific user from memory.
|
*/

class InMemoryMessageStore extends MessageStore {
  /**
   * Constructor for creating an instance of InMemoryMessageStore.
   */
  constructor() {
    super();
    this.messages = [];
  }

  /**
   * Save a message in memory.
   *
   * @param {Object} message - The message object to be saved.
   */
  saveMessage(message) {
    this.messages.push(message);
  }

  /**
   * Retrieve messages for a specific user from memory.
   *
   * @param {string} userID - The ID of the user for whom messages are to be retrieved.
   * @returns {Array} - An array of message objects for the specified user.
   */
  findMessagesForUser(userID) {
    return this.messages.filter(({ from, to }) => from === userID || to === userID);
  }
}

/*
|--------------------------------------------------------------------------
| Class: RedisMessageStore (Extends MessageStore)
|--------------------------------------------------------------------------
|
| This class provides a Redis-based implementation of MessageStore.
|
| Methods:
| - saveMessage(message): Save a message in Redis.
| - findMessagesForUser(userID): Retrieve messages for a specific user from Redis.
|
*/

const CONVERSATION_TTL = 24 * 60 * 60;

class RedisMessageStore extends MessageStore {
  /**
   * Constructor for creating an instance of RedisMessageStore.
   *
   * @param {Object} redisClient - The Redis client instance.
   */
  constructor(redisClient) {
    super();
    this.redisClient = redisClient;
  }

  /**
   * Save a message in Redis.
   *
   * @param {Object} message - The message object to be saved.
   */
  saveMessage(message) {
    const value = JSON.stringify(message);
    this.redisClient
      .multi()
      .rpush(`messages:${message.from}`, value)
      .rpush(`messages:${message.to}`, value)
      .expire(`messages:${message.from}`, CONVERSATION_TTL)
      .expire(`messages:${message.to}`, CONVERSATION_TTL)
      .exec();
  }

  /**
   * Retrieve messages for a specific user from Redis.
   *
   * @param {string} userID - The ID of the user for whom messages are to be retrieved.
   * @returns {Promise<Array>} - A promise that resolves to an array of message objects for the specified user.
   */
  findMessagesForUser(userID) {
    return this.redisClient
      .lrange(`messages:${userID}`, 0, -1)
      .then((results) => {
        return results.map((result) => JSON.parse(result));
      });
  }
}

module.exports = {
  InMemoryMessageStore,
  RedisMessageStore,
};
