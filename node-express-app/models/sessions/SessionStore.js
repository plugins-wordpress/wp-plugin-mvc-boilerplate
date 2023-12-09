/**
 * An abstract class representing a session store.
 * This class defines three abstract methods, 'findSession', 'saveSession', and 'findAllSessions',
 * which must be implemented by concrete subclasses.
 */
class SessionStore {
    /**
     * Retrieve a user session from the session store by its ID.
     * Subclasses must implement this method.
     * @param {string} id - The unique ID of the session to be retrieved.
     */
    findSession(id) {}

    /**
     * Save a user session in the session store.
     * Subclasses must implement this method.
     * @param {string} id - The unique ID of the session to be saved.
     * @param {Object} session - The session object to be stored.
     */
    saveSession(id, session) {}

    /**
     * Retrieve all user sessions stored in the session store.
     * Subclasses must implement this method.
     */
    findAllSessions() {}
}

// Export the 'SessionStore' class for use in other modules.
module.exports = SessionStore;
