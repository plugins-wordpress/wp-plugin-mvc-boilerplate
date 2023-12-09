'use strict';
// Exported functions for rendering eCommerce order-related views

// Details: Render the order details view
exports.details = (req, res, next) => {
    // This function is used to render the order details view for a specific eCommerce order.
    // It may involve querying the database for order details and rendering the view with that data.
    res.render('app-ecommerce-order-details');
  };
  
  // List: Render the order list view
  exports.list = (req, res, next) => {
    // This function is used to render the order list view for eCommerce orders.
    // It typically involves querying the database for a list of orders and rendering the view with that data.
    res.render('app-ecommerce-order-list');
  };
  