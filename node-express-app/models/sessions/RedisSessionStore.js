// Import the 'SessionStore' module
const SessionStore = require('./SessionStore');

// Define the 'SESSION_TTL' constant to represent the session's time-to-live in seconds
const SESSION_TTL = 24 * 60 * 60;

// Define a function 'mapSession' to transform session data
const mapSession = ([userID, username, connected]) =>
  userID ? { userID, username, connected: connected === "true" } : undefined;

// Define the 'RedisSessionStore' class
class RedisSessionStore extends SessionStore {
  /**
   * Create a new instance of the RedisSessionStore class.
   * @param {Object} redisClient - The Redis client instance used for database operations.
   */
  constructor(redisClient) {
    super(); // Call the constructor of the parent class (SessionStore)
    this.redisClient = redisClient;
  }

  /**
   * Retrieve a user session from the Redis database by its ID.
   * @param {string} id - The unique ID of the session to be retrieved.
   * @returns {Promise} A Promise that resolves to a session object or undefined if not found.
   */
  findSession(id) {
    return this.redisClient
      .hmget(`session:${id}`, "userID", "username", "connected")
      .then(mapSession);
  }

  /**
   * Save a user session in the Redis database.
   * @param {string} id - The unique ID of the session to be saved.
   * @param {Object} session - The session object to be stored.
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
   * Retrieve all user sessions stored in the Redis database.
   * @returns {Promise} A Promise that resolves to an array of session objects.
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

// Export the 'RedisSessionStore' class for use in other modules
module.exports = RedisSessionStore;
