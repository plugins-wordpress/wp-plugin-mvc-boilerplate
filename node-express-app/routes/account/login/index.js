
module.exports = (router = require('express').Router()) => {
  router.use(require('./login')())
  router.use(require('./auth')())
  return router 
}