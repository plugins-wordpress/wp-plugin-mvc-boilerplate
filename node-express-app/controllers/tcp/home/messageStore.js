'use strict';
/* Abstract */ class MessageStore {
  /**
   * Save a message in the store.
   *
   * @param {object} message - The message to be saved.
   */
  saveMessage(message) {}

  /**
   * Find messages for a user.
   *
   * @param {string} userID - The user ID for which to retrieve messages.
   * @returns {Array} An array of messages.
   */
  findMessagesForUser(userID) {}
}

/**
 * InMemoryMessageStore is an implementation of the abstract MessageStore
 * that stores messages in memory.
 */
class InMemoryMessageStore extends MessageStore {
  constructor() {
    super();
    this.messages = [];
  }

  /**
   * Save a message in memory.
   *
   * @param {object} message - The message to be saved.
   */
  saveMessage(message) {
    this.messages.push(message);
  }

  /**
   * Find messages for a user from the in-memory store.
   *
   * @param {string} userID - The user ID for which to retrieve messages.
   * @returns {Array} An array of messages.
   */
  findMessagesForUser(userID) {
    return this.messages.filter(
      ({ from, to }) => from === userID || to === userID
    );
  }
}

/**
 * RedisMessageStore is an implementation of the abstract MessageStore
 * that stores messages in a Redis database.
 */
const CONVERSATION_TTL = 24 * 60 * 60; // Time-to-live for conversations in seconds

class RedisMessageStore extends MessageStore {
  constructor(redisClient) {
    super();
    this.redisClient = redisClient;
  }

  /**
   * Save a message in Redis.
   *
   * @param {object} message - The message to be saved.
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
   * Find messages for a user from Redis.
   *
   * @param {string} userID - The user ID for which to retrieve messages.
   * @returns {Promise} A promise that resolves to an array of messages.
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
