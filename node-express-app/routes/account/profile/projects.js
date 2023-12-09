const {projects} = require('../../../controllers/http/account/profile')()
const {pagesProfileProjects } = projects

module.exports = (router = require('express').Router()) => {
    router.get('/pages-profile-projects', pagesProfileProjects );
    return router;
}