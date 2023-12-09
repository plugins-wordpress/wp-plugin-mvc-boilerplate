const {index} = require('../../../controllers/http/apps/academy/course-details')
module.exports = (router = require("express").Router()) => {
    router.get('/app-academy-course-details', index)
    return router
}