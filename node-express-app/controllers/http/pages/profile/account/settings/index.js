'use strict';
// Render the user account settings views

// Account: Render the user's account settings view
exports.account = (req, res, next) => {
    // This function is used to render the user's account settings view, typically for updating account-related information.
    res.render('pages-account-settings-account');
  };
  
  // Security: Render the user's security settings view
  exports.security = (req, res, next) => {
    // This function is used to render the user's security settings view, allowing users to configure their security preferences.
    res.render('pages-account-settings-security');
  };
  
  // Billing: Render the user's billing details view
  exports.billing = (req, res, next) => {
    // This function is used to render the user's billing details view, showing billing and payment information.
    res.render('pages-account-settings-billing');
  };
  
  // Notifications: Render the user's notifications settings view
  exports.notifications = (req, res, next) => {
    // This function is used to render the user's notifications settings view, allowing users to configure their notification preferences.
    res.render('pages-account-settings-notifications');
  };
  
  // Connections: Render the user's connections settings view
  exports.connections = (req, res, next) => {
    // This function is used to render the user's connections settings view, displaying user connections and networks.
    res.render('pages-account-settings-connections');
  };
  