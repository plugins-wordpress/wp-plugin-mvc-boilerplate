'use strict';
// Import the Kanban application controller and Auth middleware
const KanbanAppController = require('../../../controllers/http/apps/kanban');
const Auth = require('../../../middlewares/auth');

/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router with Kanban application routes.
 */
module.exports = (router = require('express').Router()) => {
    // Kanban Application Routes
    router.get('/app-kanban', Auth.auth, KanbanAppController.index);

    return router;
};
