'use strict';
// Import the CalendarAppController and Auth middleware
const CalendarAppController = require('../../../controllers/http/apps/calendar');
const Auth = require('../../../middlewares/auth');

/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router with calendar application routes.
 */
module.exports = (router = require('express').Router()) => {
    /**
     * GET /app-calendar
     * Display the calendar application.
     */
    router.get('/app-calendar', Auth.auth, CalendarAppController.index);

    return router;
};
