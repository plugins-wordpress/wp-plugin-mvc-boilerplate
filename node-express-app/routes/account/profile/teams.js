const {teams} = require('../../../controllers/http/account/profile')()
const {pagesProfileTeams } = teams

module.exports = (router = require('express').Router()) => {
    router.get('/pages-profile-teams', pagesProfileTeams );
    return router;
}