
module.exports = (router = require('express').Router()) => {
    router.use(require('./activation')())
    router.use(require('./registration')())
    router.use(require('./verification')())
    return router;
}