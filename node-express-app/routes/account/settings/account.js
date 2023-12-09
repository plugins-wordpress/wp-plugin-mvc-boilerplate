const AccountController = require('../../../controllers/http/account')

const {settings} = AccountController();
const {account}  = settings()
const {pagesAccountSettingsAccount} = account;

module.exports = (router = require('express').Router()) => {
    router.get('/pages-account-settings-account', pagesAccountSettingsAccount);
    return router;
}