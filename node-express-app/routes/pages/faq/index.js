'use strict';
/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router that handles routes related to the FAQ page.
 */
module.exports = (router = require('express').Router()) => {
  // Import the FAQPageController and Auth middleware
  const FAQPageController = require('../../../controllers/http/pages/faq');
  const Auth = require('../../../middlewares/auth');

  // Define a route to access the FAQ page
  router.get('/pages-faq', Auth.auth, FAQPageController.index);

  return router;
};
