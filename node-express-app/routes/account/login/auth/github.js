
const {github} = require('../../../../src/modules/social/login')()

const {authGithub, authGithubCallback} = github
module.exports = (router = require('express').Router()) => {
  router.get('/auth/github', authGithub())
  router.get('/auth/github/callback', authGithubCallback())
  return router;
}
