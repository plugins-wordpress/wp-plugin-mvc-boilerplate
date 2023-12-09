const AccountController = require('../../../controllers/http/account')

const {settings} = AccountController();
const {billing}  = settings()
const {pagesAccountSettingsBilling}  = billing

module.exports = (router = require('express').Router()) => {
    router.get('/pages-account-settings-billing', pagesAccountSettingsBilling);
    return router;
}