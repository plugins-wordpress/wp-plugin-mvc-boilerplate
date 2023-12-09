'use strict';

/**
 * An abstract class representing a message store.
 * This class defines two abstract methods, 'saveMessage' and 'findMessagesForUser',
 * which must be implemented by concrete subclasses.
 */
class MessageStore {
    /**
     * Save a message in the message store. Subclasses must implement this method.
     * @param {Object} message - The message object to be saved.
     */
    saveMessage(message) {}

    /**
     * Retrieve messages for a specific user from the message store.
     * Subclasses must implement this method.
     * @param {string} userID - The ID of the user whose messages are to be retrieved.
     */
    findMessagesForUser(userID) {}
}

// Export the 'MessageStore' class for use in other modules.
module.exports = MessageStore;
