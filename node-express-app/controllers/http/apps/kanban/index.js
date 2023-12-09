'use strict';

// Exported function to render the Kanban view

exports.index = (req, res, next) => {
    // This function is used to render the Kanban view, typically associated with project management, task tracking, or a Kanban board.
    res.render('app-kanban');
  };
  