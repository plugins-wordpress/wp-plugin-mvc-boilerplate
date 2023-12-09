'use strict';
// Exported functions for rendering invoice-related views

// Index: Render the list of invoices view
exports.index = (req, res, next) => {
    // This function is used to render the list of invoices view, typically displaying a collection of existing invoices.
    res.render('app-invoice-list');
  };
  
  // Preview: Render the invoice preview view
  exports.preview = (req, res, next) => {
    // This function is used to render the invoice preview view, allowing users to preview the details of a specific invoice.
    res.render('app-invoice-preview');
  };
  
  // Edit: Render the invoice editing view
  exports.edit = (req, res, next) => {
    // This function is used to render the invoice editing view, enabling users to modify the content of an existing invoice.
    res.render('app-invoice-edit');
  };
  
  // Store: Render the invoice addition view
  exports.store = (req, res, next) => {
    // This function is used to render the invoice addition view, typically displaying a form for creating a new invoice.
    res.render('app-invoice-add');
  };
  
  // Print: Render the invoice printing view
  exports.print = (req, res, next) => {
    // This function is used to render the invoice printing view, allowing users to generate and print an invoice.
    res.render('app-invoice-print');
  };
  