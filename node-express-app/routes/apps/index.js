'use strict';
/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router that aggregates sub-routers for different modules.
 */
module.exports = (router = require('express').Router()) => {
    // Use sub-routers for different modules
    router.use(require('./chat')());         // Chat module
    router.use(require('./email')());        // Email module
    router.use(require('./academy')());      // Academy module
    router.use(require('./ecommerce')());    // Ecommerce module
    router.use(require('./calendar')());     // Calendar module
    router.use(require('./kanban')());       // Kanban module
    router.use(require('./academy')());      // Academy module
    router.use(require('./logistics')());    // Logistics module
    router.use(require('./invoice')());      // Invoice module
    router.use(require('./users')());        // Users module
    router.use(require('./roles')());        // Roles module
    router.use(require('./permissions')());  // Permissions module

    return router;
};
