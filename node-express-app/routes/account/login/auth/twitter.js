
const {twitter} = require('../../../../src/modules/social/login')()

const {authTwitter, authTwitterCallback} = twitter

module.exports = (router = require('express').Router()) => {
  router.get('/auth/twitter', authTwitter())
  router.get('/auth/twitter/callback', authTwitterCallback())
  return router;
}
