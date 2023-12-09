'use strict';
/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router that acts as a central router for various sections of a web application.
 */
module.exports = (router = require('express').Router()) => {
    // Include and use sub-routers for different sections
    router.use(require('./auth')()); // Authentication-related routes
    router.use(require('./home')()); // Home-related routes
    router.use(require('./apps')()); // Application-related routes
    router.use(require('./account')()); // User account-related routes
    router.use(require('./dashboard')()); // Dashboard-related routes
    router.use(require('./pages')()); // Various page-related routes
    // router.use(require('./lab')());

    return router;
};
