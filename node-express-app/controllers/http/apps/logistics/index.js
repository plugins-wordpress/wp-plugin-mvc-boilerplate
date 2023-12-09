'use strict';

// Exported functions for rendering logistics-related views

// Dashboard: Render the logistics dashboard view
exports.dashboard = (req, res, next) => {
    // This function is used to render the logistics dashboard view, typically associated with logistics and supply chain management.
    res.render('app-logistics-dashboard');
  };
  
  // Fleet: Render the fleet management view
  exports.fleet = (req, res, next) => {
    // This function is used to render the fleet management view, allowing users to manage and monitor a logistics fleet.
    res.render('app-logistics-fleet');
  };
  