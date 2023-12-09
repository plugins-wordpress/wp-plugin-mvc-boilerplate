const {index} = require('../../../controllers/http/apps/academy/course')
module.exports = (router = require("express").Router()) => {
    router.get('/app-academy-course', index)
    return router
}