
const {linkedin} = require('../../../../src/modules/social/login')()

const {authLinkeIn, authLinkeInCallback} = linkedin
module.exports = (router = require('express').Router()) => {
  router.get('/auth/linkedin', authLinkeIn())
  router.get('/auth/linkedin/callback', authLinkeInCallback())
  return router;
}
