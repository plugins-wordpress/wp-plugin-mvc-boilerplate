const AccountController = require('../../../controllers/http/account')

const {registration} = AccountController()
const {verify} = registration()

const {
    authEmailVerification,
    authAccountVerified
} = verify


module.exports = (router = require('express').Router()) => {
    router.get('/auth-verify-email-cover', authEmailVerification)
    router.get('auth-account-verified', authAccountVerified);
    return router;
}