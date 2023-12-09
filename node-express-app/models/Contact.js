'use strict';

const { ObjectId } = require('mongodb')
const Model = require('../src/modules/model');
const User = require('./User')
const Chat = require('./Chat')
/*
|--------------------------------------------------------------------------------
| Contact Model
|--------------------------------------------------------------------------------
|
| Contact extends the base model (Model) class and thus has everything
| the base model has including all the basic CRUD methods or operations.
|
|
*/

class Contact extends Model {

    /*
    |----------------------------------------------------------------------------------
    |                                   constructor
    |----------------------------------------------------------------------------------
    |
    | dbOptions: default database options: collection, database url, and database name.
    | options: default model options: any other option  for the model.
    |
    |
    */
    constructor(dbOptions = { collection: 'contacts', url: 'mongodb://localhost:27017/nodecraftsman', db: 'nodecraftsman' }, ...options) {

        /*
        |-------------------------------------------------------------------------------------
        |                                       super
        |-------------------------------------------------------------------------------------
        |
        | dbOptions: default database options: collection, database url, and database name.
        |
        |
        */

        super(dbOptions);

        /*
        |--------------------------------------------------------------------------------------
        | default database options: in case dbOptions is set but collection and url 
        | keys on the dbOptions are not provided.
        |--------------------------------------------------------------------------------------
        |
        */

        if (!this['hasOwnProperty']['collection']) this.collection = 'contacts';
        if (!this['hasOwnProperty']['url']) this.url = 'mongodb://localhost:27017/nodecraftsman';
        if (!this['hasOwnProperty']['faker_url']) this.faker_url = 'https://jsonplaceholder.typicode.com/';

        /*
        |---------------------------------------------------------------------------------------
        |                                      model options
        |---------------------------------------------------------------------------------------
        | Any other optional options passed to the model.
        |
        */
        options.forEach(option => {
            if (Object.keys(option).length > 0) {
                Object.keys(option).forEach(key => {
                    if (!this[key]) this[key] = option[key];
                })
            }
        })
    }

    /*
    |---------------------------------------------------------------------------------------
    |                   Bellow, you may add properties and methods to your model. 
    |---------------------------------------------------------------------------------------
    |
    */

    exists(sender, receiver) {
        this.findOne({ 'sender.email': sender.email, 'receiver.email': receiver.email }, {}, (error, contact) => {
            if (error) return console.log(error);
            if (!contact || contact === null) return false;
            return true;
        })
    }
    add(sender, receiver, fn = () => { }) {
        const senderReceiver = [{ 'sender.email': sender.email, 'receiver.email': receiver.email }, { 'receiver.email': sender.email, 'sender.email': receiver.email }]
        this.findOne({ $or: senderReceiver }, {}, (error, contact) => {
            if (error) {
                fn(error, null)
                return this.emit('add-error', error);
            }
            if (!contact || contact === null) {
                this.create({ sender, receiver }, {}, (error, contact) => {
                    if (error) {
                        fn(error, null);
                        return this.emit('add-error', error)
                    };
                    fn(null, contact)
                    return this.emit('add', contact)
                })
            }
            fn({ error: { message: 'Contact already exists' } }, null)
            return this.emit('add-error', { error: { message: 'Contact already exists' } });
        })
    }
    removeContact(user, contact, fn = () => { }) {
        const senderReceiver = [{ 'sender.email': user.email, 'receiver.email': contact.email }, { 'receiver.email': user.email, 'sender.email': contact.email }]
        this.findOne({ $or: senderReceiver }, {}, (error, contact) => {
            if (error) {
                fn(error, null)
                return this.emit('add-error', error);
            }
            if (!contact || contact === null) {
                fn({ error: { message: 'This person is not even in your contacts' } }, false)
                return this.emit('removeContact-error', { error: { message: 'This person is not even in your contacts' } });
            }
            if (user.email === contact.sender.email) contact.sender.action = 'removed';
            if (user.email === contact.receiver.email) contact.receiver.action = 'removed';

            this.updateById(contact._id, contact, {}, (error, result) => {
                if (error) {
                    fn(error, null)
                    return this.emit('removeContact-error', error);
                }

                if (result.acknowledged && result.modifiedCount >= 1) {
                    fn(null, result)
                    return this.emit('removeContact', result);
                } else {
                    fn({ error: { message: 'Nothing changed' } }, null)
                    return this.emit('removeContact-error', { error: { message: 'Nothing changed' } });
                }
            })
        })
    }
    hasUserHasContact(user, contact, fn = () => { }) {
        const senderReceiver = [{ 'sender.email': user.email, 'receiver.email': contact.email }, { 'receiver.email': user.email, 'sender.email': contact.email }]
        this.findOne({ $or: senderReceiver }, {}, (error, contact) => {
            if (error) {
                fn(error, null)
                return this.emit('hasUserHasContact-error', error);
            }
            if (!contact || contact === null) {
                fn(null, false)
                return this.emit('hasUserHasContact', false);
            }
            fn(null, true)
            return this.emit('hasUserHasContact', true);
        })
    }
    accept(user, contact, fn = () => { }) {
        const senderReceiver = [{ 'sender.email': user.email, 'receiver.email': contact.email }, { 'receiver.email': user.email, 'sender.email': contact.email }]
        this.findOne({ $or: senderReceiver }, {}, (error, contact) => {
            if (error) {
                fn(error, null)
                return this.emit('accept-error', error);
            }
            if (!contact || contact === null) {
                fn({ error: { message: 'This person is not even in your contacts' } }, false)
                return this.emit('accept-error', { error: { message: 'This person is not even in your contacts' } });
            }

            if (user.email === contact.sender.email) contact.sender.action = 'accepted';
            if (user.email === contact.receiver.email) contact.receiver.action = 'accepted';

            this.updateById(contact._id, contact, {}, (error, result) => {
                if (error) {
                    fn(error, null)
                    return this.emit('accept-error', error);
                }

                if (result.acknowledged && result.modifiedCount >= 1) {
                    fn(null, result)
                    return this.emit('accept', result);
                } else {
                    fn({ error: { message: 'Nothing changed' } }, null)
                    return this.emit('accept-error', { error: { message: 'Nothing changed' } });
                }
            })
        })
    }
    reject(user, contact, fn = () => { }) {
        const senderReceiver = [{ 'sender.email': user.email, 'receiver.email': contact.email }, { 'receiver.email': user.email, 'sender.email': contact.email }]
        this.findOne({ $or: senderReceiver }, {}, (error, contact) => {
            if (error) {
                fn(error, null)
                return this.emit('accept-error', error);
            }
            if (!contact || contact === null) {
                fn({ error: { message: 'This person is not even in your contacts' } }, false)
                return this.emit('accept-error', { error: { message: 'This person is not even in your contacts' } });
            }

            if (user.email === contact.sender.email) contact.sender.action = 'rejected';
            if (user.email === contact.receiver.email) contact.receiver.action = 'rejected';

            this.updateById(contact._id, contact, {}, (error, result) => {
                if (error) {
                    fn(error, null)
                    return this.emit('accept-error', error);
                }
                if (result.acknowledged && result.modifiedCount >= 1) {
                    fn(null, result)
                    return this.emit('accept', result);
                } else {
                    fn({ error: { message: 'Nothing changed' } }, null)
                    return this.emit('accept-error', { error: { message: 'Nothing changed' } });
                }
            })
        })
    }
    block(user, contact, fn = () => { }) {
        const senderReceiver = [{ 'sender.email': user.email, 'receiver.email': contact.email }, { 'receiver.email': user.email, 'sender.email': contact.email }]
        this.findOne({ $or: senderReceiver }, {}, (error, contact) => {
            if (error) {
                fn(error, null)
                return this.emit('block-error', error);
            }
            if (!contact || contact === null) {
                fn({ error: { message: 'This person is not even in your contacts' } }, false)
                return this.emit('accept-error', { error: { message: 'This person is not even in your contacts' } });
            }

            if (user.email === contact.sender.email) contact.sender.action = 'blocked';
            if (user.email === contact.receiver.email) contact.receiver.action = 'blocked';

            this.updateById(contact._id, contact, {}, (error, result) => {
                if (error) {
                    fn(error, null)
                    return this.emit('block-error', error);
                }

                if (result.acknowledged && result.modifiedCount >= 1) {
                    fn(null, result)
                    return this.emit('block', result);
                } else {
                    fn({ error: { message: 'Nothing changed' } }, null)
                    return this.emit('block-error', { error: { message: 'Nothing changed' } });
                }
            })
        })
    }
    receivedPendingRequests(user, fn = () => { }) { }
    sentPendingRequests(user, fn = () => { }) { }

    async oldContacts(user, fn = () => { }) {
        try {
            const senderReceiver = [{ 'sender.email': user.email }, { 'receiver.email': user.email }]
            const contacts = await this.find({ $or: senderReceiver });
            const senders = contacts.map(contact => contact.sender).filter(contact => contact.email !== user.email)
            const receivers = contacts.map(contact => contact.receiver).filter(contact => contact.email !== user.email)
            fn(null, [...senders, ...receivers])
            this.emit('contacts', [...senders, ...receivers])
            return [...senders, ...receivers]
        } catch (error) {
            fn(error, null)
            this.emit('contacts-error', error);
            return error
        }
    }
    async contacts(user, fn = () => { }) {
        try {
            const senderReceiver = [{ 'sender.email': user.email }, { 'receiver.email': user.email }]


            const UserModel = new User()
            const ChatModel = new Chat()

            const chats = await this.find({ $or: senderReceiver })
            const senders = chats.map(chat => chat.sender).filter(chat => chat.email !== user.email)
            const receivers = chats.map(chat => chat.receiver).filter(chat => chat.email !== user.email)

            const ids = [...senders, ...receivers].map(user => user.email)
            const uniqueIds = [...new Set(ids)];

            const chatUserIds = await ChatModel.userEmails(user)

            const filteredArray = uniqueIds.filter(id => !chatUserIds.includes(id))
            const filnalArray = [...new Set(filteredArray)]
            const users = await UserModel.find({ email: { $in: filnalArray } })

            fn(null, users)
            this.emit('contacts', users)
            return users
        } catch (error) {
            fn(error, null);
            this.emit('contacts-error', error)
            return error;
        }
    }

    populate(count = 2, owner, user = new User()) {

        user.findOne().then(async auth => {
            const contacts = await user.find({},{limit: count});

            if(owner && owner instanceof User){
                owner.action = 'invited';
                for (let contact of contacts) {
                    contact.action = 'received';
                    this.add(owner, contact)
                }

            }else{
                auth.action = 'invited';
                for (let contact of contacts) {
                    contact.action = 'received';
                    this.add(auth, contact)
                }
            }
           
        }).catch(console.error)

    }
    ContactsIBlocked(user, fn = () => { }) { }
    contactsWhoBlockedMe(user, fn = () => { }) { }
    contactsIRemoved(user, fn = () => { }) { }
    contactWhoRemovedMe(user, fn = () => { }) { }

    hasContactBlockedMe(user, contact, fn = () => { }) { }
    hasContactRemovedMe(user, contact, fn = () => { }) { }
    hasContactAcceptedMe(user, contact, fn = () => { }) { }
    hasContactRejectedMe(user, contact, fn = () => { }) { }

    haveIBlockedContact(user, contact, fn = () => { }) { }
    haveIRemovedContact(user, contact, fn = () => { }) { }
    haveIRejectedContact(user, contact, fn = () => { }) { }
    haveIAcceptedContact(user, contact, fn = () => { }) { }
}



/*
|-----------------------------------------------------------------------------------------------
|                                       exports model 
|-----------------------------------------------------------------------------------------------
|
*/
module.exports = Contact;
