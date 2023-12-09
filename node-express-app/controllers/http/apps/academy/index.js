'use strict';

// Exported function to render the 'app-academy-dashboard' view
exports.dashboard = (req, res, next) => {
    res.render('app-academy-dashboard');
  };
  
  // Exported function to render the 'app-academy-course' view
  exports.myCourse = (req, res, next) => {
    res.render('app-academy-course');
  };
  
  // Exported function to render the 'app-academy-course-details' view
  exports.courseDetails = (req, res, next) => {
    res.render('app-academy-course-details');
  };
  
