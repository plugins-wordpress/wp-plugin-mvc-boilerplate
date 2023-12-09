'use strict';

// Exported functions for rendering eCommerce product and category-related views

// List: Render the product list view
exports.list = (req, res, next) => {
    // This function is used to render the product list view for eCommerce products.
    // It typically involves querying the database for a list of products and rendering the view with that data.
    res.render('app-ecommerce-product-list');
  };
  
  // Add: Render the product addition view
  exports.add = (req, res, next) => {
    // This function is used to render the product addition view for adding new products to the eCommerce platform.
    // It may involve rendering a form to collect product details.
    res.render('app-ecommerce-product-add');
  };
  
  // CategoryList: Render the category list view
  exports.categoryList = (req, res, next) => {
    // This function is used to render the category list view for eCommerce product categories.
    // It typically involves querying the database for a list of product categories and rendering the view with that data.
    res.render('app-ecommerce-category-list');
  };
  