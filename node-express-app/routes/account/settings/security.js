const AccountController = require('../../../controllers/http/account')

const { settings } = AccountController();
const { security } = settings()
const {pagesAccountSettingsSecurity} = security

module.exports = (router = require('express').Router()) => {
    router.get('/pages-account-settings-security', pagesAccountSettingsSecurity);
    return router;
}