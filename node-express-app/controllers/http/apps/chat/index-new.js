const Redis = require('ioredis')
const Socket = require('../../../../src/modules/socket')

const Contact = require('../../../../models/Contact')
const User = require('../../../../models/User')
const Chat = require('../../../../models/Chat')


exports.labo = (req,res,next) => (io, socket, pub, sub ) => {}
exports.index = async (req, res, next, contact = new Contact, user = new User, chat = new Chat) => {}
