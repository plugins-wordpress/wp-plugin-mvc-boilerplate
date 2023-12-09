/*
|--------------------------------------------------------------------------
| Abstract Class: SessionStore
|--------------------------------------------------------------------------
|
| This abstract class outlines the methods for finding, saving, and retrieving sessions.
|
| Methods:
| - findSession(id): Abstract method to find a session by its ID.
| - saveSession(id, session): Abstract method to save a session with its ID.
| - findAllSessions(): Abstract method to find all sessions.
|
*/

class SessionStore {
  /**
   * Find a session by its ID.
   *
   * @param {string} id - The ID of the session to find.
   */
  findSession(id) {}

  /**
   * Save a session with its ID.
   *
   * @param {string} id - The ID of the session to save.
   * @param {Object} session - The session object to save.
   */
  saveSession(id, session) {}

  /**
   * Find all sessions.
   */
  findAllSessions() {}
}

/*
|--------------------------------------------------------------------------
| Class: InMemorySessionStore (Extends SessionStore)
|--------------------------------------------------------------------------
|
| This class provides an in-memory implementation of SessionStore.
|
| Methods:
| - findSession(id): Find a session in memory by its ID.
| - saveSession(id, session): Save a session in memory.
| - findAllSessions(): Retrieve all sessions from memory.
|
*/

class InMemorySessionStore extends SessionStore {
  /**
   * Constructor for creating an instance of InMemorySessionStore.
   */
  constructor() {
    super();
    this.sessions = new Map();
  }

  /**
   * Find a session in memory by its ID.
   *
   * @param {string} id - The ID of the session to find.
   * @returns {Object|undefined} - The session object if found, or undefined if not found.
   */
  findSession(id) {
    return this.sessions.get(id);
  }

  /**
   * Save a session in memory.
   *
   * @param {string} id - The ID of the session to save.
   * @param {Object} session - The session object to save.
   */
  saveSession(id, session) {
    this.sessions.set(id, session);
  }

  /**
   * Retrieve all sessions from memory.
   *
   * @returns {Array} - An array of session objects.
   */
  findAllSessions() {
    return [...this.sessions.values()];
  }
}

/*
|--------------------------------------------------------------------------
| Class: RedisSessionStore (Extends SessionStore)
|--------------------------------------------------------------------------
|
| This class provides a Redis-based implementation of SessionStore.
|
| Methods:
| - findSession(id): Find a session in Redis by its ID.
| - saveSession(id, session): Save a session in Redis.
| - findAllSessions(): Retrieve all sessions from Redis.
|
*/

const SESSION_TTL = 24 * 60 * 60;

class RedisSessionStore extends SessionStore {
  /**
   * Constructor for creating an instance of RedisSessionStore.
   *
   * @param {Object} redisClient - The Redis client instance.
   */
  constructor(redisClient) {
    super();
    this.redisClient = redisClient;
  }

  /**
   * Find a session in Redis by its ID.
   *
   * @param {string} id - The ID of the session to find.
   * @returns {Object|undefined} - The session object if found, or undefined if not found.
   */
  findSession(id) {
    return this.redisClient
      .hmget(`session:${id}`, "userID", "username", "connected")
      .then(mapSession);
  }

  /**
   * Save a session in Redis.
   *
   * @param {string} id - The ID of the session to save.
   * @param {Object} session - The session object to save.
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
   * Retrieve all sessions from Redis.
   *
   * @returns {Promise<Array>} - A promise that resolves to an array of session objects.
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
          .map(([err, session]) => (err ? undefined : mapSession(session))
          .filter((v) => !!v));
      });
  }
}

module.exports = {
  InMemorySessionStore,
  RedisSessionStore,
};
