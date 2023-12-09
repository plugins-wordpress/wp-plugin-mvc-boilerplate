'use strict';
// Import the e-commerce controller and Auth middleware
const EcommerceAppController = require('../../../controllers/http/apps/ecommerce')();
const { dashboard, settings, customer, order, products, referrals, reviews } = EcommerceAppController;
const Auth = require('../../../middlewares/auth');

/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router with e-commerce application routes.
 */
module.exports = (router = require('express').Router()) => {
    // Dashboard Routes
    router.get('/app-ecommerce-dashboard', Auth.auth, dashboard.index);

    // Customer Details Routes
    router.get('/app-ecommerce-customer-details-billing', Auth.auth, customer.billing);
    router.get('/app-ecommerce-customer-details-notifications', Auth.auth, customer.notifications);
    router.get('/app-ecommerce-customer-details-overview', Auth.auth, customer.overview);
    router.get('/app-ecommerce-customer-details-security', Auth.auth, customer.security);
    router.get('/app-ecommerce-customer-all', Auth.auth, customer.index);

    // Order Routes
    router.get('/app-ecommerce-order-details', Auth.auth, order.details);
    router.get('/app-ecommerce-order-list', Auth.auth, order.list);

    // Products Routes
    router.get('/app-ecommerce-category-list', Auth.auth, products.categoryList);
    router.get('/app-ecommerce-product-add', Auth.auth, products.add);
    router.get('/app-ecommerce-product-list', Auth.auth, products.list);

    // Referral Routes
    router.get('/app-ecommerce-referral', Auth.auth, referrals.index);

    // Reviews Route
    router.get('/app-ecommerce-manage-reviews', Auth.auth, reviews.index);

    // Settings Routes
    router.get('/app-ecommerce-settings-checkout', Auth.auth, settings.checkout);
    router.get('/app-ecommerce-settings-detail', Auth.auth, settings.detail);
    router.get('/app-ecommerce-settings-locations', Auth.auth, settings.locations);
    router.get('/app-ecommerce-settings-notifications', Auth.auth, settings.notifications);
    router.get('/app-ecommerce-settings-payments', Auth.auth, settings.payments);
    router.get('/app-ecommerce-settings-shipping', Auth.auth, settings.shipping);

    return router;
};
