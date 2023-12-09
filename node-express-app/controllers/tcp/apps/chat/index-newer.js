const Redis  = require('ioredis')
const moment  = require('moment');

const Contact = require('../../../../models/Contact');
const User = require('../../../../models/User');
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
const prepareDataForFrontend = (data) => {
    for (let key of authKeys()) {
        for (let el of data) {
            if (el[key]) delete el[key]
        }
    }
    return data;
}

exports.index = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => { }
exports.authContacts = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => {
    socket.on('user-contacts', user => {
        contact.contacts(user);
        contact.on('contacts', contacts => socket.emit('user-contacts-result', prepareDataForFrontend(contacts)))
    })
}
exports.authChatUsers  = async (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => {
    const username = socket.handshake.query.username
    const auth  = await user.findByUsername(username)
   socket.on('user-chat-users', chatUser => {
       chat.chatUsers(chatUser)
       chat.on('chatUsers', users => socket.emit('user-chat-users-result', prepareDataForFrontend(users)))
   })
}
exports.authChatsWithUser  = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => {
    socket.on('selected-chat-user', data => {
        chat.chatsWithUser(data.auth, data.user)
        chat.on('chatsWithUser', chats => socket.emit('selected-chat-user-chats', chats))
        chat.on('chatsWithUser-error', error => socket.emit('selected-chat-user-chats-error', error))  
    })

}

exports.store = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => { 
    socket.on('send-chat-message', data => {
        const chatData = {
            message: data.message,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        chat.send(chatData, data.sender, data.receiver)

        chat.on('send', async result => {
            const contacts = await contact.contacts(data.sender)
            const users = await chat.chatUsers(data.sender)
            // const chats = await chat.userChats(data.sender)
            for (let key of authKeys()) {
                for(let contact of contacts) delete contact[key]
                for(let user of users) delete user[key]
            } 
            chat.chatsWithUser(data.sender, data.receiver)
            chat.on('chatsWithUser', chats => io.emit('user-sent-chat', chats))
            chat.on('chatsWithUser-error', error => io.emit('user-sent-chat-error', error))
        })
        chat.on('send-error', error => io.emit('send-chat-message-error', error))
    })
}

exports.show = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => { }
exports.edit = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => { }
exports.update = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => { }
exports.destroy = (req, res, next, io, socket, sub = new Redis(), pub = new Redis()) => { }

