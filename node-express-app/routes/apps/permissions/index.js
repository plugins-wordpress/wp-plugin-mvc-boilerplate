'use strict';
// Import the Permissions application controller and Auth middleware
const PermissionsAppController = require('../../../controllers/http/apps/permissions');
const Auth = require('../../../middlewares/auth');

/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router with Permissions application routes.
 */
module.exports = (router = require('express').Router()) => {
    // Permissions Application Routes
    router.get('/app-access-permission', Auth.auth, PermissionsAppController.index);

    return router;
};
