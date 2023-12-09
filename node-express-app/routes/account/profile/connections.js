const {connections} = require('../../../controllers/http/account/profile')()
const {pagesProfileConnections} = connections

module.exports = (router = require('express').Router()) => {
    router.get('/pages-profile-connections', pagesProfileConnections);
    return router;
}
