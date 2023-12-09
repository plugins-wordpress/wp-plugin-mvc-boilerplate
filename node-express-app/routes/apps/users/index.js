'use strict';
// Import the Users application controller and Auth middleware
const UsersAppController = require('../../../controllers/http/apps/users');
const Auth = require('../../../middlewares/auth');

/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router with Users application routes.
 */
module.exports = (router = require('express').Router()) => {
    // Users Application Routes
    router.get('/app-user-list', Auth.auth, UsersAppController.index);
    router.get('/app-user-view-account', Auth.auth, UsersAppController.account);
    router.get('/app-user-view-security', Auth.auth, UsersAppController.security);
    router.get('/app-user-view-billing', Auth.auth, UsersAppController.billing);
    router.get('/app-user-view-notifications', Auth.auth, UsersAppController.notifications);
    router.get('/app-user-view-connections', Auth.auth, UsersAppController.connections);

    return router;
};
