
const {facebook} = require('../../../../src/modules/social/login')()

const {authFacebook, authFacebookCallback} = facebook

module.exports = (router = require('express').Router()) => {
  router.get('/auth/github', authFacebook())
  router.get('/auth/github/callback', authFacebookCallback())
  return router;
}
