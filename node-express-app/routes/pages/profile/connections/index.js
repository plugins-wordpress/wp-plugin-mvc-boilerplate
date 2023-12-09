'use strict';
/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router that handles routes related to user connections in a user profile.
 */
module.exports = (router = require('express').Router()) => {
  // Import the ConnectionProfilePageController and Auth middleware
  const ConnectionProfilePageController = require('../../../../controllers/http/pages/profile/connections');
  const Auth = require('../../../../middlewares/auth');

  // Define a route for user connections
  router.get('/pages-profile-connections', Auth.auth, ConnectionProfilePageController.index);

  return router;
};
