const AccountController = require('../../../controllers/http/account')

const {registration} = AccountController()
const {register} = registration()

const {
    registerMiddleware,
    showRegister,
    userRegistration
} = register

  

module.exports = (router = require('express').Router()) => {
    router.get('/register', registerMiddleware, showRegister);
    router.post('/register', userRegistration);
    return router;
}