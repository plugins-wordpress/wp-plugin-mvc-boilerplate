
const {instagram} = require('../../../../src/modules/social/login')()

const {authInstagram, authInstagramCallback} = instagram

module.exports = (router = require('express').Router()) => {
  router.get('/auth/instagram', authInstagram())
  router.get('/auth/instagram/callback', authInstagramCallback())
  return router;
}
