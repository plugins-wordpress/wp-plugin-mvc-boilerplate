'use strict';
// Import the invoice controller and Auth middleware
const InvoiceAppController = require('../../../controllers/http/apps/invoice');
const Auth = require('../../../middlewares/auth');

/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router with invoice application routes.
 */
module.exports = (router = require('express').Router()) => {
    // Invoice Application Routes
    router.get('/app-invoice-list', Auth.auth, InvoiceAppController.index);
    router.get('/app-invoice-preview', Auth.auth, InvoiceAppController.preview);
    router.get('/app-invoice-edit', Auth.auth, InvoiceAppController.edit);
    router.get('/app-invoice-add', Auth.auth, InvoiceAppController.store);
    router.get('/app-invoice-print', Auth.auth, InvoiceAppController.print);

    return router;
};
