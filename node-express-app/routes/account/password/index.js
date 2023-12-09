
  module.exports = (router = require('express').Router()) => {
    router.use(require('./forgot')())
    router.use(require('./reset')())
    return router;
  }