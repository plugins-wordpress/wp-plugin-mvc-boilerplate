'use strict';
// Import the Roles application controller and Auth middleware
const RolesAppController = require('../../../controllers/http/apps/roles');
const Auth = require('../../../middlewares/auth');

/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router with Roles application routes.
 */
module.exports = (router = require('express').Router()) => {
    // Roles Application Routes
    router.get('/app-access-roles', Auth.auth, RolesAppController.index);

    return router;
};
