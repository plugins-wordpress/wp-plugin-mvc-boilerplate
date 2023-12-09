const moment = require('moment')
const Redis = require('ioredis')
const io = require('../../../../src/modules/socket')

const Contact = require('../../../../models/Contact')
const User = require('../../../../models/User')
const Chat = require('../../../../models/Chat')

const contact = new Contact()
const user = new User()
const chat = new Chat()
const sub  = new Redis()
const pub = new Redis()

exports.index = (io = server) => (req, res, next) => {}
exports.store = (io = server) => (req, res, next) => {}
exports.show = (io = server) => (req, res, next) => {}
exports.edit = (io = server) => (req, res, next) => {}
exports.update = (io = server) => (req, res, next) => {}
exports.destroy = (io = server) => (req, res, next) => {}


