'use strict';
/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router that handles routes related to a user's profile.
 */
module.exports = (router = require('express').Router()) => {
  // Import the UserProfilePageController and Auth middleware
  const UserProfilePageController = require('../../../../controllers/http/pages/profile/user');
  const Auth = require('../../../../middlewares/auth');

  // Define a route for the user's profile
  router.get('/pages-profile-user', Auth.auth, UserProfilePageController.index);

  return router;
};
