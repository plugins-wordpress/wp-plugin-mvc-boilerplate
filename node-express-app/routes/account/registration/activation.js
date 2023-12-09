const AccountController = require('../../../controllers/http/account')

const {registration} = AccountController()
const {activate} = registration()
const {authVerifyEmail} = activate


module.exports = (router = require('express').Router()) => {
    router.get('/account/activate/:verificationToken', authVerifyEmail)
    return router;
}