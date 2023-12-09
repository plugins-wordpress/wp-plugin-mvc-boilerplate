'use strict';
/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router that handles routes related to the pricing page.
 */
module.exports = (router = require('express').Router()) => {
  // Import the PricingPageController and Auth middleware
  const PricingPageController = require('../../../controllers/http/pages/pricing');
  const Auth = require('../../../middlewares/auth');

  // Define a route to access the pricing page
  router.get('/pages-pricing', Auth.auth, PricingPageController.index);

  return router;
};
