'use strict';
/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router that handles routes related to user teams in a user profile.
 */
module.exports = (router = require('express').Router()) => {
  // Import the TeamProfilePageController and Auth middleware
  const TeamProfilePageController = require('../../../../controllers/http/pages/profile/teams');
  const Auth = require('../../../../middlewares/auth');

  // Define a route for user teams
  router.get('/pages-profile-teams', Auth.auth, TeamProfilePageController.index);

  return router;
};
