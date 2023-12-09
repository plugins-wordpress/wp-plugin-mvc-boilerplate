'use strict';
/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router that handles routes related to user projects in a user profile.
 */
module.exports = (router = require('express').Router()) => {
  // Import the ProjectProfilePageController and Auth middleware
  const ProjectProfilePageController = require('../../../../controllers/http/pages/profile/projects');
  const Auth = require('../../../../middlewares/auth');

  // Define a route for user projects
  router.get('/pages-profile-projects', Auth.auth, ProjectProfilePageController.index);

  return router;
};
