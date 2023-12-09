'use strict';
/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router that handles routes related to the home page.
 */
module.exports = (router = require('express').Router()) => {
  // Import the HomeController and the Auth middleware
  const { HomeController } = require('../../controllers/http/home')();
  const Auth = require('../../middlewares/auth');

  // Define and configure routes for the home page
  router.get('/', Auth.auth, HomeController.index);
  router.get('/index', Auth.auth, HomeController.index);
  router.get('/is-online/:username', Auth.auth, HomeController.isOnline);

  return router;
};
