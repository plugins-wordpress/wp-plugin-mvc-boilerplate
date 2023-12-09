const Contact = require('../../../../models/Contact')
const User = require('../../../../models/User')
const Chat = require('../../../../models/Chat')




const io = dotIO => server(dotIO)

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

// labo.on('connection', socket => {

//     console.log('connected to lab')
//  })


exports.labo = (req,res,next) => (io, socket, pub, sub ) => {}
exports.index = async (req, res, next, contact = new Contact, user = new User, chat = new Chat) => {
    try {
        const contacts = await contact.contacts(req.user)
        const users = await chat.chatUsers(req.user)
        const chats = await chat.userChats(req.user)
        for (let key of authKeys()) {
            for(let contact of contacts) delete contact[key]
            for(let user of users) delete user[key]
        }

        return res.render('app-chat', { contacts, users, user: req.user, chats })
        //return res.render('app-chat', { contacts, users })
    } catch (err) {
        return res.status(200).send(err)
    }
}//res.render('app-chat')
exports.store = (req, res, next, contact = new Contact) => { }
exports.edit = (req, res, next, contact = new Contact) => { }
exports.show = (req, res, next, contact = new Contact) => { }
exports.update = (req, res, next, contact = new Contact) => { }
exports.destroy = (req, res, next, contact = new Contact) => { }

exports.destroy = (req, res, next) => {
    
 }


