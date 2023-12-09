const {index} = require('../../../controllers/http/apps/academy/dashboard')
module.exports = (router = require("express").Router()) => {
    router.get('/app-academy-dashboard', index)
    return router
}