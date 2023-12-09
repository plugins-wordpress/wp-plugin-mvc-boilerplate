module.exports = (router = require('express').Router()) => {
    router.use(require('./github')())
    router.use(require('./facebook')())
    router.use(require('./instagram')())
    router.use(require('./google')())
    router.use(require('./twitter')())
    router.use(require('./linkedin')())
    return router 
  }