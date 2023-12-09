
module.exports = (router = require('express').Router()) => {

    // router.use(require('./analytics')())
    // router.use(require('./logistics')())
    // router.use(require('./academy')())

    router.use(require('./crm')())
    
    return router
}