'use strict';
const { ObjectId } = require('mongodb')

/*
|--------------------------------------------------------------------------------
| User Model
|--------------------------------------------------------------------------------
|
| User extends the base model (Model) class and thus has everything
| the base model has including all the basic CRUD methods or operations.
|
|
*/

const Model = require('../src/modules/model');

const User = require('./User');


class Chat extends Model {

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
    constructor(dbOptions = { collection: 'chats', url: 'mongodb://localhost:27017/nodecraftsman', db: 'nodecraftsman' }, ...options) {

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

        if (!this['hasOwnProperty']['collection']) this.collection = 'chats';
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

    async chatsWithUser(user, chatUser, fn = () => { }) {
        try {
            const senderReceiver = [{ 'sender.email': user.email, 'receiver.email': chatUser.email }, { 'sender.email': chatUser.email, 'receiver.email': user.email }]
            const chats = await this.find({ $or: senderReceiver })
            fn(null, chats)
            this.emit('chatsWithUser', chats)
            return chats
        } catch (error) {
            fn(error, null);
            this.emit('chatsWithUser-error', error)
            return error;
        }
    }
    async lastMessageUserReceivedFromChatUser(user, chatUser, fn = () => {}){
        try {
            const lastMessage = await this.last({ 'sender.email': chatUser.email, 'receiver.email': user.email })
            fn(null, lastMessage)
            this.emit('lastMessageReceivedFrom', lastMessage)
            return lastMessage
        } catch (error) {
            fn(error, null);
            this.emit('lastMessageReceivedFrom-error', error)
            return error;
        }
    }
    async userChats(user, fn = () => {}){
        try {
            const senderReceiver = [{ 'sender.email': user.email }, {'receiver.email': user.email }]
            const chats = await this.find({ $or: senderReceiver })
            fn(null, chats)
            this.emit('userChats', chats)
            return chats
        } catch (error) {
            fn(error, null);
            this.emit('userChats-error', error)
            return error;
        }
    }

    async chatUserIds(user, objectId = false, fn = () => { }) {
        const senderReceiver = [{ 'sender.email': user.email }, { 'receiver.email': user.email }]
        try {
            const chats = await this.find({ $or: senderReceiver })
            const senders = chats.map(chat => chat.sender).filter(chat => chat.email !== user.email)
            const receivers = chats.map(chat => chat.receiver).filter(chat => chat.email !== user.email)


            const ids = [...senders, ...receivers].map(user => user._id)
            const uniqueIds = [...new Set(ids)];
            const idArray = [];
            for (let id of uniqueIds) idArray.push(new ObjectId(id));

            if (objectId) {
                fn(null, idArray)
                this.emit('chatUsers', idArray)
                return idArray
            } else {
                fn(null, uniqueIds)
                this.emit('chatUsers', uniqueIds)
                return uniqueIds
            }
        } catch (error) {
            fn(error, null);
            this.emit('chatUsers-error', error)
            return error;
        }
    }
    async userEmails(user, fn = () => { }) {
        const senderReceiver = [{ 'sender.email': user.email }, { 'receiver.email': user.email }]
        try {
            const chats = await this.find({ $or: senderReceiver })
            const senders = chats.map(chat => chat.sender).filter(chat => chat.email !== user.email)
            const receivers = chats.map(chat => chat.receiver).filter(chat => chat.email !== user.email)
            const ids = [...senders, ...receivers].map(user => user.email)
            const uniqueIds = [...new Set(ids)];

            fn(null, uniqueIds)
            this.emit('userEmails', uniqueIds)
            return uniqueIds

        } catch (error) {
            fn(error, null);
            this.emit('userEmails-error', error)
            return error;
        }
    }
    // async chatUsers(user, fn = () => { }) {

    //     const senderReceiver = [{ 'sender.email': user.email }, { 'receiver.email': user.email }]
    //     try {
    //         const chats = await this.find({ $or: senderReceiver })
    //         const senders = chats.map(chat => chat.sender).filter(chat => chat.email !== user.email)
    //         const receivers = chats.map(chat => chat.receiver).filter(chat => chat.email !== user.email)
    //         fn(null, [...senders, ...receivers])
    //         this.emit('chatUsers', [...senders, ...receivers])
    //         return [...senders, ...receivers]
    //     } catch (error) {
    //         fn(error, null);
    //         this.emit('chatUsers-error', error)
    //         return error;
    //     }
    // }


    async send(data = {}, sender = {}, receiver = {}, fn = () => { }) {
        try {
            const result = await this.create({ data, sender, receiver })
            if (result) {
                fn(null, result)
                this.emit('send', result)
                return result;
            }
        } catch (error) {
            fn(error, null)
            this.emit('send-error', error)
            return error;
        }
        // this.create({ data, sender, receiver }, {}, (error, contact) => {
        //     if (error) {
        //         fn(error, null);
        //         return this.emit('send-error', error)
        //     };
        //     fn(null, contact)
        //     return this.emit('send', contact)
        // })
    }
    async chatUsers(user, fn = () => { }) {
        
        try {
            const senderReceiver = [{ 'sender.email': user.email }, { 'receiver.email': user.email }]
            
            const UserModel = new User()
            const chats = await this.find({ $or: senderReceiver })
            const senders = chats.map(chat => chat.sender).filter(chat => chat.email !== user.email)
            const receivers = chats.map(chat => chat.receiver).filter(chat => chat.email !== user.email)

            const ids = [...senders, ...receivers].map(user => user._id)
            const uniqueIds = [...new Set(ids)];
            const idArray = [];
            for (let id of uniqueIds) idArray.push(new ObjectId(id));

            const users = await UserModel.find({ _id: { $in: idArray } })
         
            fn(null, users)
            this.emit('chatUsers', users)
            return users

        } catch (error) {
            fn(error, null);
            this.emit('chatUsers-error', error)
            return error;
        }
    }
    markSeen(chat = this) { }
    markRead(chat = this) { }
    markDeleted(caht = this) { }
    populate(user, contacts = [] ) {}

}


/*
|-----------------------------------------------------------------------------------------------
|                                       exports model 
|-----------------------------------------------------------------------------------------------
|
*/
module.exports = Chat;
