'use strict';
// Import the LogisticsAppController and Auth middleware
const LogisticsAppController = require('../../../controllers/http/apps/logistics');
const Auth = require('../../../middlewares/auth');

/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router with logistics application routes.
 */
module.exports = (router = require('express').Router()) => {
    /**
     * GET /app-logistics-dashboard
     * Display the logistics dashboard.
     */
    router.get('/app-logistics-dashboard', Auth.auth, LogisticsAppController.dashboard);

    /**
     * GET /app-logistics-fleet
     * Display information about the logistics fleet.
     */
    router.get('/app-logistics-fleet', Auth.auth, LogisticsAppController.fleet);

    return router;
};
