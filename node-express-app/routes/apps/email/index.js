'use strict';
// Import the email controller and Auth middleware
const { index } = require('../../../controllers/http/apps/email');
const Auth = require('../../../middlewares/auth');

/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router with email application routes.
 */
module.exports = (router = require('express').Router()) => {
    // Email Application Route
    router.get('/app-email', Auth.auth, index);

    return router;
};
