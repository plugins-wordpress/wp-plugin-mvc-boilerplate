'use strict'
/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router that acts as a central router for various sections of a web application.
 */
module.exports = (router = require('express').Router()) => {
    // Include and use sub-routers for different sections
    router.use(require('./profile')()); // Profile-related routes
    router.use(require('./faq')()); // FAQ-related routes
    router.use(require('./pricing')()); // Pricing-related routes

    return router;
};
