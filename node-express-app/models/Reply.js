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

class Reply extends Model {

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
    constructor(dbOptions = { collection: 'replies', url: 'mongodb://localhost:27017/nodecraftsman', db: 'nodecraftsman' }, ...options) {

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

        if (!this['hasOwnProperty']['collection']) this.collection = 'replies';
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

    async replies (mail, fn = () => {}){
        try{
            const replies = await this.find({parent_id: mail._id.toString()})
            fn(null, replies)
            this.emit('replies', replies)
            return replies
        }catch(error){
            fn(error, null);
            this.emit('replies-error', error)
            return error;
        }
    }

    async inbox(user, fn = () => {}){

        try {
            // const senderReceiver = [{from: user.email}, {to: user.email}, { bcc: { $elemMatch: { $in: [user.email] } } }, { cc: { $elemMatch: { $in: [user.email] } } }]
            const senderReceiver = [{'from.email': user.email}, {'to.email': user.email}, {bcc: { $elemMatch: { "email": user.email }}}, {cc: { $elemMatch: { "email": user.email }}}]
            const mails = await this.find({ $or: senderReceiver })
            fn(null, mails)
            this.emit('inbox', mails)
            return mails
        } catch (error) {
            fn(error, null);
            this.emit('inbox-error', error)
            return error;
        }

    }
    async sendMails(user, fn = () => {}){
        try {
            const mails = await this.find({from: user.email})
            fn(null, mails)
            this.emit('inbox', mails)
            return mails
        } catch (error) {
            fn(error, null);
            this.emit('inbox-error', error)
            return error;
        }
    }
    async receivedMails(user, fn = () => {}){
        try {
            const senderReceiver = [{to: user.email}, { bcc: { $elemMatch: { $in: [user.email] } } }, { cc: { $elemMatch: { $in: [user.email] } } }]
            const mails = await this.find({ $or: senderReceiver })
            fn(null, mails)
            this.emit('inbox', mails)
            return mails
        } catch (error) {
            fn(error, null);
            this.emit('inbox-error', error)
            return error;
        }
    }
    draft(user, fn = () => {}){}
    starred(user, fn = () => {}){}
    spam(user, fn = () => {}){}
    trash(user, fn = () => {}){}
    work(user, fn = () => {}){}
    company(user, fn  = () => {}){}
    important(user, fn = () => {}){}
    private(user, fn = () => {}){}
    delete(user, fn = () => {}){}
    send(to, cc, bcc, subject, body, attachements){}
    seen(email = this) {}
    read(email = this) { }
    replies(email = this) { }
    markDeleted(email = this) { }
    populate(){}


    // async inbox(user, fn = () => {}){

    //     try {
    //         const senderReceiver = [{from: user.email}, {to: user.email}, { bcc: { $elemMatch: { $in: [user.email] } } }, { cc: { $elemMatch: { $in: [user.email] } } }]
    //         const mails = await this.find({ $or: senderReceiver })
    //         fn(null, mails)
    //         this.emit('inbox', mails)
    //         return mails
    //     } catch (error) {
    //         fn(error, null);
    //         this.emit('inbox-error', error)
    //         return error;
    //     }

    // }

}


/*
|-----------------------------------------------------------------------------------------------
|                                       exports model 
|-----------------------------------------------------------------------------------------------
|
*/
module.exports = Reply;
