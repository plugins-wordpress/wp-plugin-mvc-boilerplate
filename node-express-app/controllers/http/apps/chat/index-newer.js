const moment = require('moment')
const Redis = require('ioredis')
const socketIo = require('../../../../src/modules/socket')
const {index, authContacts, authChatUsers,authChatsWithUser,store } = require('../../../tcp/apps/chat')

const Contact = require('../../../../models/Contact')
const User = require('../../../../models/User')
const Chat = require('../../../../models/Chat')


const contact = new Contact()
const user = new User()
const chat = new Chat()

const sub = new Redis();
const pub = new Redis()

const authKeys = () => [
    'password',
    'password-confirm',
    'activationToken',
    'activationTokenDuration',
    'activationURL',
    'passwordResetToken',
    'passwordResetTokenLifetime',
    'passwordResetURL',
    'fullname',
    'terms',
    'username',
    'middlename',
];

exports.index = (server = {}) => async (req, res, next) => {

    try {
        const contacts = await contact.contacts(req.user)
        const users = await chat.chatUsers(req.user)
        const chats = await chat.userChats(req.user)

        for (let key of authKeys()) {
            for(let contact of contacts) delete contact[key]
            for(let user of users) delete user[key]
        }

        const chatNamespace = socketIo(server).of('/chat')

        const chatNamespaceOnConnection = socket => {
            index(req, res, next, chatNamespace, socket, sub, pub)
            authContacts(req, res, next, chatNamespace, socket, sub, pub)
            //authChatUsers(req, res, next, chatNamespace, socket, sub, pub)
            authChatsWithUser(req, res, next, chatNamespace, socket, sub, pub)
            store(req, res, next, chatNamespace, socket, sub, pub)
        }
        chatNamespace.on('connection', chatNamespaceOnConnection)

        res.render('app-chat',{ contacts, users, user: req.user, chats })
    }catch(error){
        next(error)
    }
}


exports.store = (io = server) => (req, res, next) => {}
exports.show = (io = server) => (req, res, next) => {}
exports.edit = (io = server) => (req, res, next) => {}
exports.update = (io = server) => (req, res, next) => {}
exports.destroy = (io = server) => (req, res, next) => {}


