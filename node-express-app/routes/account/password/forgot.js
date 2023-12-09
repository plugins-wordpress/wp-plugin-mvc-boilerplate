const AccountController = require('../../../controllers/http/account')

const {password} = AccountController()
const {forgot} = password()

const {registerMiddleware,
    passwordForgotCover,
    validateEmail,
    authPasswordForgotCover
} = forgot

  
  module.exports = (router = require('express').Router()) => {
    router.get('/passord/forgot', registerMiddleware, passwordForgotCover );
    router.post('/password/forgot', validateEmail, authPasswordForgotCover);
 
    return router;
  }