'use strict';
// Exported functions for rendering eCommerce settings-related views

// Checkout: Render the checkout settings view
exports.checkout = (req, res, next) => {
    // This function is used to render the checkout settings view for configuring eCommerce checkout options.
    // It may involve displaying options related to payment methods, shipping, and order processing.
    res.render('app-ecommerce-settings-checkout');
  };
  
  // Detail: Render the detail settings view
  exports.detail = (req, res, next) => {
    // This function is used to render the detail settings view for configuring specific details in the eCommerce system.
    // It may involve settings related to the store's details, branding, and contact information.
    res.render('app-ecommerce-settings-detail');
  };
  
  // Locations: Render the locations settings view
  exports.locations = (req, res, next) => {
    // This function is used to render the locations settings view for managing store locations or delivery areas.
    // It may involve setting and editing geographic information for the eCommerce platform.
    res.render('app-ecommerce-settings-locations');
  };
  
  // Notifications: Render the notifications settings view
  exports.notifications = (req, res, next) => {
    // This function is used to render the notifications settings view for configuring how notifications and alerts are handled.
    // It may involve settings for email notifications, SMS alerts, and other communication preferences.
    res.render('app-ecommerce-settings-notifications');
  };
  
  // Payments: Render the payments settings view
  exports.payments = (req, res, next) => {
    // This function is used to render the payments settings view for configuring payment methods and processing.
    // It may involve settings for payment gateways, currencies, and payment-related preferences.
    res.render('app-ecommerce-settings-payments');
  };
  
  // Shipping: Render the shipping settings view
  exports.shipping = (req, res, next) => {
    // This function is used to render the shipping settings view for configuring shipping methods and logistics.
    // It may involve settings for shipping providers, rates, and delivery options.
    res.render('app-ecommerce-settings-shipping');
  };
  