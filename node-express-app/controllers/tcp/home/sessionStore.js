'use strict';
/* Abstract */ class SessionStore {
  /**
   * Find a session by its ID.
   *
   * @param {string} id - The session ID to search for.
   * @returns {object} The session object.
   */
  findSession(id) {}

  /**
   * Save a session with its ID.
   *
   * @param {string} id - The session ID.
   * @param {object} session - The session data to be saved.
   */
  saveSession(id, session) {}

  /**
   * Find all stored sessions.
   *
   * @returns {Array} An array of all stored sessions.
   */
  findAllSessions() {}
}

/**
 * InMemorySessionStore is a concrete class that extends SessionStore and stores
 * sessions in memory using a Map.
 */
class InMemorySessionStore extends SessionStore {
  constructor() {
    super();
    this.sessions = new Map();
  }

  /**
   * Find a session by its ID in the in-memory store.
   *
   * @param {string} id - The session ID to search for.
   * @returns {object} The session object.
   */
  findSession(id) {
    return this.sessions.get(id);
  }

  /**
   * Save a session with its ID in the in-memory store.
   *
   * @param {string} id - The session ID.
   * @param {object} session - The session data to be saved.
   */
  saveSession(id, session) {
    this.sessions.set(id, session);
  }

  /**
   * Find all stored sessions from the in-memory store.
   *
   * @returns {Array} An array of all stored sessions.
   */
  findAllSessions() {
    return [...this.sessions.values()];
  }
}

/**
 * RedisSessionStore is a concrete class that extends SessionStore and stores
 * sessions in a Redis database using the provided Redis client.
 */
const SESSION_TTL = 24 * 60 * 60; // Time-to-live for sessions in seconds

class RedisSessionStore extends SessionStore {
  constructor(redisClient) {
    super();
    this.redisClient = redisClient;
  }

  /**
   * Find a session by its ID in Redis.
   *
   * @param {string} id - The session ID to search for.
   * @returns {Promise} A promise that resolves to the session object.
   */
  findSession(id) {
    return this.redisClient
      .hmget(`session:${id}`, "userID", "username", "connected")
      .then(mapSession);
  }

  /**
   * Save a session with its ID in Redis.
   *
   * @param {string} id - The session ID.
   * @param {object} session - The session data to be saved.
   */
  saveSession(id, { userID, username, connected }) {
    this.redisClient
      .multi()
      .hset(
        `session:${id}`,
        "userID",
        userID,
        "username",
        username,
        "connected",
        connected
      )
      .expire(`session:${id}`, SESSION_TTL)
      .exec();
  }

  /**
   * Find all stored sessions from Redis.
   *
   * @returns {Promise} A promise that resolves to an array of all stored sessions.
   */
  async findAllSessions() {
    const keys = new Set();
    let nextIndex = 0;
    do {
      const [nextIndexAsStr, results] = await this.redisClient.scan(
        nextIndex,
        "MATCH",
        "session:*",
        "COUNT",
        "100"
      );
      nextIndex = parseInt(nextIndexAsStr, 10);
      results.forEach((s) => keys.add(s));
    } while (nextIndex !== 0);
    const commands = [];
    keys.forEach((key) => {
      commands.push(["hmget", key, "userID", "username", "connected"]);
    });
    return this.redisClient
      .multi(commands)
      .exec()
      .then((results) => {
        return results
          .map(([err, session]) => (err ? undefined : mapSession(session)))
          .filter((v) => !!v);
      });
  }
}

module.exports = {
  InMemorySessionStore,
  RedisSessionStore,
};
