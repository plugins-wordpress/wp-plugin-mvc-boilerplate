const User = require('../../../../models/User')
const Contact = require('../../../../models/Contact')
const Mail = require('../../../../models/Mail')
const Reply = require('../../../../models/Reply')


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

const prepareDataForFrontend = (data) => {
    for (let key of authKeys()) {
        for (let el of data) {
            if (el[key]) delete el[key]
        }
    }
    return data;
}
exports.contacts = (io, socket, sub, pub, contact = new Contact) => {
    socket.on('user-mail-contacts', user => {
        contact.contacts(user);
        contact.on('contacts', contacts => socket.emit('user-mail-contacts-result', prepareDataForFrontend(contacts)))
    })
}

exports.index = (io, socket, sub, pub, reply = new Reply, user = new User, contact = new Contact) => {
    socket.on('user-selected-mail-replies',  async mail => {
        const replies = await reply.find({parent_id: mail._id})
        socket.emit('user-selected-mail-replies-result', replies)
    })
}

// exports.replies  = (io, socket, sub, pub, reply = new Reply, user = new User, contact = new Contact) => {

//     socket.on('user-selected-mail-replies',  async  mail => {
//         try{
//             const replies = await reply.replies(mail)

//             socket.emit('user-selected-mail-replies-result',replies)
//             console.log('replies', replies)
//         } catch(error){
//             socket.emit('user-selected-mail-replies-result-error',error)
//         }
       
//     })
// }
exports.store  = (io, socket, sub, pub, user = new User, contact = new Contact) => {}
exports.show  = (io, socket, sub, pub, user = new User, contact = new Contact) => {}
exports.edit  = (io, socket, sub, pub, user = new User, contact = new Contact) => {}
exports.update  = (io, socket, sub, pub, user = new User, contact = new Contact) => {}
exports.destroy  = (io, socket, sub, pub, user = new User, contact = new Contact) => {}