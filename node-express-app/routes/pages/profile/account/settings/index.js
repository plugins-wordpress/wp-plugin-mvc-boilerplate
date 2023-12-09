'use strict';
/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router that handles routes related to user account settings in a user profile.
 */
module.exports = (router = require('express').Router()) => {
  // Import the UserProfileAccountSettingsController and Auth middleware
  const UserProfileAccountSettingsController = require('../../../../../controllers/http/pages/profile/account/settings');
  const Auth = require('../../../../../middlewares/auth');

  // Define routes for user account settings
  router.get('/pages-account-settings-account', Auth.auth, UserProfileAccountSettingsController.account);
  router.get('/pages-account-settings-security', Auth.auth, UserProfileAccountSettingsController.security);
  router.get('/pages-account-settings-billing', Auth.auth, UserProfileAccountSettingsController.billing);
  router.get('/pages-account-settings-notifications', Auth.auth, UserProfileAccountSettingsController.notifications);
  router.get('/pages-account-settings-connections', Auth.auth, UserProfileAccountSettingsController.connections);

  return router;
};
