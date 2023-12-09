module.exports = (router = require('express').Router()) => {
    router.use(require('./dashboard')());
    router.use(require('./course')());
    router.use(require('./course-details')());
    return router 

}