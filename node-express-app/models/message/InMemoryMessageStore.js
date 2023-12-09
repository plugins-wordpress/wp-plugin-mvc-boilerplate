// Import the 'MessageStore' module
const MessageStore = require('./MessageStore');

// Define the 'InMemoryMessageStore' class
class InMemoryMessageStore extends MessageStore {
  /**
   * Create a new instance of the InMemoryMessageStore class.
   * Initializes an empty array to store messages in memory.
   */
  constructor() {
    super(); // Call the constructor of the parent class (MessageStore)
    this.messages = [];
  }

  /**
   * Save a message in the in-memory store.
   * @param {Object} message - The message object to be saved.
   */
  saveMessage(message) {
    this.messages.push(message); // Add the message to the 'messages' array
  }

  /**
   * Retrieve messages for a specific user from the in-memory store.
   * @param {string} userID - The ID of the user whose messages are to be retrieved.
   * @returns {Array} An array of message objects for the specified user.
   */
  findMessagesForUser(userID) {
    return this.messages.filter(
      ({ from, to }) => from === userID || to === userID
    );
  }
}

// Export the 'InMemoryMessageStore' class for use in other modules
module.exports = InMemoryMessageStore;
