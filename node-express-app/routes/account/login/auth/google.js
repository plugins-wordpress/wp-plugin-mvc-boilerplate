const {google} = require('../../../../src/modules/social/login')()

const {authGoogle, authGoogleCallback} = google
module.exports = (router = require('express').Router()) => {
  router.get('/auth/google', authGoogle())
  router.get('/auth/google/callback', authGoogleCallback())
  return router;
}
