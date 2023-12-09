const {user} = require('../../../controllers/http/account/profile')()
const {pagesProfileUser} = user

module.exports = (router = require('express').Router()) => {
    router.get('/pages-profile-user', pagesProfileUser);
    return router;
}