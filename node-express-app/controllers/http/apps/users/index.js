'use strict';
// Exported functions for rendering user-related views

// Index: Render the user list view
exports.index = (req, res, next) => {
    // This function is used to render the user list view, typically displaying a list of user profiles.
    res.render('app-user-list');
  };
  
  // Account: Render the user's account view
  exports.account = (req, res, next) => {
    // This function is used to render the user's account view, displaying user-specific information and settings.
    res.render('app-user-view-account');
  };
  
  // Security: Render the user's security settings view
  exports.security = (req, res, next) => {
    // This function is used to render the user's security settings view, allowing users to configure their security preferences.
    res.render('app-user-view-security');
  };
  
  // Billing: Render the user's billing details view
  exports.billing = (req, res, next) => {
    // This function is used to render the user's billing details view, showing billing and payment information.
    res.render('app-user-view-billing');
  };
  
  // Notifications: Render the user's notifications settings view
  exports.notifications = (req, res, next) => {
    // This function is used to render the user's notifications settings view, allowing users to configure their notification preferences.
    res.render('app-user-view-notifications');
  };
  
  // Connections: Render the user's connections view
  exports.connections = (req, res, next) => {
    // This function is used to render the user's connections view, displaying user connections and networks.
    res.render('app-user-view-connections');
  };
  