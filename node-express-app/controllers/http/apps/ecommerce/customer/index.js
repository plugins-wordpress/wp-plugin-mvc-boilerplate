'use strict';

// Exported functions for rendering eCommerce customer-related views

// Index: Render the customer list view
exports.index = (req, res, next) => {
    // This function is used to render the customer list view for an eCommerce application.
    // It typically involves querying the database for a list of customers and rendering the view with that data.
    res.render('app-ecommerce-customer-all');
  };
  
  // Billing: Render the billing details view
  exports.billing = (req, res, next) => {
    // This function is used to render the billing details view for an eCommerce customer.
    // It may involve querying the customer's billing information and rendering the view with that data.
    res.render('app-ecommerce-customer-details-billing');
  };
  
  // Notifications: Render the notifications settings view
  exports.notifications = (req, res, next) => {
    // This function is used to render the notifications settings view for an eCommerce customer.
    // It may involve retrieving the customer's notification preferences and rendering the view.
    res.render('app-ecommerce-customer-details-notifications');
  };
  
  // Overview: Render the customer's profile overview view
  exports.overview = (req, res, next) => {
    // This function is used to render an overview of the eCommerce customer's profile.
    // It may involve fetching general information about the customer and rendering the overview view.
    res.render('app-ecommerce-customer-details-overview');
  };
  
  // Security: Render the security settings view
  exports.security = (req, res, next) => {
    // This function is used to render the security settings view for an eCommerce customer.
    // It may involve displaying options for managing the customer's account security and rendering the view.
    res.render('app-ecommerce-customer-details-security');
  };
  