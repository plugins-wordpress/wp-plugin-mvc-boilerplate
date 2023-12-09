'use strict'

module.exports = (template = require('./template')) => ({
    mailAccountActivation: (options = {}) => template(options.data)
})