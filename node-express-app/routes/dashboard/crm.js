'use strict';
/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router that handles the CRM dashboard route.
 */
module.exports = (router = require("express").Router()) => {
    // Import the CRM dashboard controller and the authentication middleware
    const { index } = require('../../controllers/http/dashboard/crm');
    const Auth = require('../../middlewares/auth');

    // Define and configure the CRM dashboard route
    router.get('/dashboards-crm', Auth.auth, index);

    return router;
};
