'use strict';
/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router that serves as a central router for different parts of a user's profile.
 */
module.exports = (router = require('express').Router()) => {
    // Include and use various sub-routers for different profile sections
    router.use(require('./user')()); // User-related routes
    router.use(require('./teams')()); // Teams-related routes
    router.use(require('./projects')()); // Projects-related routes
    router.use(require('./connections')()); // Connections-related routes
    router.use(require('./account/settings')()); // Account settings-related routes

    return router;
};
