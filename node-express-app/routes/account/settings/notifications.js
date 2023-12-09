const AccountController = require('../../../controllers/http/account')

const {settings} = AccountController();

const {notifications}  = settings()
const {pagesAccountSettingsNotifications} = notifications

module.exports = (router = require('express').Router()) => {
    router.get('/pages-account-settings-notifications', pagesAccountSettingsNotifications);
 
    return router;
}