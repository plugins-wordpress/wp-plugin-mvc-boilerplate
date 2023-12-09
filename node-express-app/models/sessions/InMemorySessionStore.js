// Import the 'SessionStore' module
const SessionStore = require('./SessionStore');

// Define the 'InMemorySessionStore' class
class InMemorySessionStore extends SessionStore {
  /**
   * Create a new instance of the InMemorySessionStore class.
   * Initializes an empty Map to store user sessions in memory.
   */
  constructor() {
    super(); // Call the constructor of the parent class (SessionStore)
    this.sessions = new Map();
  }

  /**
   * Retrieve a user session from the in-memory store by its ID.
   * @param {string} id - The unique ID of the session to be retrieved.
   * @returns {Object|null} The session object associated with the given ID, or null if not found.
   */
  findSession(id) {
    return this.sessions.get(id);
  }

  /**
   * Save a user session in the in-memory store.
   * @param {string} id - The unique ID of the session to be saved.
   * @param {Object} session - The session object to be stored.
   */
  saveSession(id, session) {
    this.sessions.set(id, session); // Set or update the session in the Map
  }

  /**
   * Retrieve all user sessions stored in the in-memory store.
   * @returns {Array} An array containing all session objects.
   */
  findAllSessions() {
    return [...this.sessions.values()]; // Convert Map values to an array
  }
}

// Export the 'InMemorySessionStore' class for use in other modules
module.exports = InMemorySessionStore;
