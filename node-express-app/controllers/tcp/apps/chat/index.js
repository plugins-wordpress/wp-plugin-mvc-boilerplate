const moment  = require('moment');
const Contact = require('../../../../models/Contact');
const User = require('../../../../models/User');
const Chat = require('../../../../models/Chat')



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


// socket.emit('user-chat-users', user)
// socket.emit('user-contacts', user)
// socket.emit('user-chats', user)

const user  = new User();
const chat = new Chat();
const prepareDataForFrontend = (data) => {
    for (let key of authKeys()) {
        for (let el of data) {
            if (el[key]) delete el[key]
        }
    }
    return data;
}
exports.contacts = (io, socket, sub, pub, contact = new Contact) => {
    socket.on('user-contacts', user => {
        contact.contacts(user);
        contact.on('contacts', contacts => socket.emit('user-contacts-result', prepareDataForFrontend(contacts)))
    })
}
exports.authChatUsers  = async (io, socket, sub, pub, user = new User, chat = new Chat) => {
     const username = socket.handshake.query.username
     const auth  = await user.findByUsername(username)

    socket.on('user-chat-users', chatUser => {
        // console.log('user', user)
        chat.chatUsers(chatUser)
        chat.on('chatUsers', async users => {
            // for(let user of users){
            //     user.last  = {}
            //     let result  = await chat.findOne({'sender.email': user.email, 'receiver.email': auth.email},{sort: {createdAt: -1}})
            //     if(result) {
            //         user.last.message = result.data.message
            //         user.last.createdAt = moment(result.data.message).format("MMM Do YY");
            //     }else{
            //         user.last.message = ''
            //         user.last.createdAt = ''
            //     }
            // }
            socket.emit('user-chat-users-result', prepareDataForFrontend(users))
        })
    })


    //user-chat-users-result

}

exports.index = (io, socket, sub, pub, user = new User, contact = new Contact, chat = new Chat) => {

    // socket.on('user-selected-contact', data => {

    //     user.findById(data.id)
    //     user.on('findById', result => {
    //         // send user back to server
    //         socket.emit('user-selected-contact-result', result)
    //         chat.chatsWithUser(data.user, result)
    //         chat.on('chatsWithUser', chats => { io.emit('message', chats) })
    //         chat.on('chatsWithUser-error', error => socket.emit('user-chats-error', error))
    //     })
    //     user.on('findById-error', error => socket.emit('user-selected-contact-error', error))
    // })

    // socket.on('user-selected-status', data => {
    //     const { id, value } = data
    //     user.findById(id)
    //     user.once('findById', result => {

    //         if (value == 'active') result.status = 'online'
    //         else result.status = value
    //         user.updateById(id, result)
    //         user.on('updateById', result => {
    //             user.findById(id)
    //             user.on('findById', updated => socket.emit('user-selected-status-result', updated))
    //             user.on('findById-error', error => socket.emit('user-selected-status-error', error))
    //         })
    //         user.on('updateById-error', error => socket.emit('user-selected-status-result', error))
    //     })
    //     user.on('findById-error', error => socket.emit('user-selected-status-error', error))
    // })

    // socket.on('send-message', async data => {

   
    //     try {
    //         // const { chatSender, chatReceiver, message } = data

    //         //  return console.log(data)
    //         const sender = await user.findByEmail(data.sender.email)
    //         const receiver = await user.findByEmail(data.receiver.email)
    //         if (sender && receiver) {

    //             const newChat = await chat.send({
    //                 message,
    //                 createdAt: Date.now(),
    //                 updatedAt: Date.now()
    //             }, sender, receiver)

    //             const aChat = await chat.findById(newChat.insertedId)
    //             io.emit('new-chat-created', aChat)
               
    //             // contact.contacts(chatSender);
    //             // contact.on('contacts', contacts => socket.emit('user-contacts-result', prepareDataForFrontend(contacts)))
    //             // chat.chatUsers(chatSender)
    //             // chat.on('chatUsers', users => socket.emit('user-chat-users-result', prepareDataForFrontend(users)))
    //         }

    //     } catch (error) {
    //         socket.emit("send-message-result-error", error)
    //     }
    // })
}

exports.authChatsWithUser  = (io, socket, sub, pub, user = new User(), chat  = new Chat() ) => {
    socket.on('selected-chat-user', data => {
        chat.chatsWithUser(data.auth, data.user)
        chat.on('chatsWithUser', chats => socket.emit('selected-chat-user-chats', chats))
        chat.on('chatsWithUser-error', error => socket.emit('selected-chat-user-chats-error', error))  
    })

}

exports.store = (io, socket, sub, pub, chat = new Chat(), contact = new Contact()) => { 
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
exports.status = (io, socket, sub, pub) => {

    const statuses = {}
    statuses['away'] = 'away';
    statuses['active'] = 'online';
    statuses['offline'] = 'offline';
    statuses['busy'] = 'busy';

    socket.on('auth-update-status', (auth, value) => {
        user.updateById(auth._id, {status: statuses[value]});
        user.on('updatedById', result => socket.emit('auth-update-status-success', result, auth))
        user.on('updatedById-error', error => socket.emit('auth-update-status-error', error, auth))

    })
}
exports.users = (io, socket, sub, pub) => { }
exports.chats = (io, socket, sub, pub) => { }
exports.show = (io, socket, sub, pub, user = new User, contact = new Contact) => { }
exports.edit = (io, socket, sub, pub, user = new User, contact = new Contact) => { }

exports.update = (io, socket, sub, pub, user = new User, contact = new Contact) => { }
exports.destroy = (io, socket, sub, pub, user = new User, contact = new Contact) => { }

exports.trail = (io, socket, req, res, next) => {
    // console.log('it works with combination')
}

