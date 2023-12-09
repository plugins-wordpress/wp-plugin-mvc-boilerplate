'use strict';
// Exported module that returns an object containing various modules

module.exports = () => ({
    customer: require('./customer'),
    dashboard: require('./dashboard'),
    order: require('./order'),
    products: require('./products'),
    referrals: require('./referrals'),
    reviews: require('./reviews'),
    settings: require('./settings'),
  });
  