'use strict';
// Import the AcademyAppController and Auth middleware
const AcademyAppController = require('../../../controllers/http/apps/academy');
const Auth = require('../../../middlewares/auth');

/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router with academy application routes.
 */
module.exports = (router = require('express').Router()) => {
    /**
     * GET /app-academy-dashboard
     * Display the academy dashboard.
     */
    router.get('/app-academy-dashboard', Auth.auth, AcademyAppController.dashboard);

    /**
     * GET /app-academy-course
     * Display the user's academy courses.
     */
    router.get('/app-academy-course', Auth.auth, AcademyAppController.myCourse);

    /**
     * GET /app-academy-course-details
     * Display details of a specific academy course.
     */
    router.get('/app-academy-course-details', Auth.auth, AcademyAppController.courseDetails);

    return router;
};
