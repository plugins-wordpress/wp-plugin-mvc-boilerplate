const Redis  = require('ioredis')
const moment  = require('moment');

const Contact = require('../../../../models/Contact');
const User = require('../../../../models/User');
const Chat = require('../../../../models/Chat')

const contact = new Contact()
const user = new User()
const chat = new Chat()
const sub  = new Redis()
const pub = new Redis()


exports.index = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => { }
exports.store = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => { }
exports.show = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => { }
exports.edit = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => { }
exports.update = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => { }
exports.destroy = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => { }

