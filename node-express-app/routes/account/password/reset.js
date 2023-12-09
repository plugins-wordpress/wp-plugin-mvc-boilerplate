
 const AccountController = require('../../../controllers/http/account')

const {password} = AccountController()
const {reset} = password()
const {authResetPasswordCover} = reset

  module.exports = (router = require('express').Router()) => {
    router.get('/password/reset/:passwordResetToken',authResetPasswordCover)
    return router;
  }