'use strict';// Import the chat controller and Auth middleware
const { index } = require('../../../controllers/http/apps/chat');
const Auth = require('../../../middlewares/auth');

/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router with chat application routes.
 */
module.exports = (router = require('express').Router()) => {
    /**
     * GET /app-chat
     * Display the chat application.
     */
    router.get('/app-chat', Auth.auth, index);
    

    return router;
};
