const AccountController = require('../../../controllers/http/account')

const {settings} = AccountController();
const {connections}  = settings()
const {pagesAccountSettingsConnections} = connections

module.exports = (router = require('express').Router()) => {
    router.get('/pages-account-settings-connections',pagesAccountSettingsConnections);
    return router;
}