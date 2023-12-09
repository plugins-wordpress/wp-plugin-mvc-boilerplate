"use strict";

require('dotenv').config()

/**
 *
 * @module Module
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Module class
 */

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const ActivationHTML = require('./modules/mail-activate');
const welcome  = require('./templates/default/welcome');
const emailData = require('./templates/account/activation/data');
const passwordRestHTML = require('./modules/mail-password')
class Mail extends require("../base") {

    constructor(...arrayOfObjects) {

        super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

        arrayOfObjects.forEach(option => {
            if (Object.keys(option).length > 0) {
                Object.keys(option).forEach((key) => { if (!this[key]) this[key] = option[key]; })
            }
        });

        // auto bind methods
        this.autobind(Mail);
        // auto invoke methods
        this.autoinvoker(Mail);
        // add other classes method if methods do not already exist. Argument order matters!
        // this.methodizer(..classList);
        //Set the maximum number of listeners to infinity
        this.setMaxListeners(Infinity);
    }

    async send(data = this.data) {
        try {
            const result = await this.client.messages.create(this.DOMAIN, data)
            console.log(result);
        } catch (e) {
            console.log(e)
        }
    }
    settings(){}
    messageDataKeys() {
        return ['from', 'to', 'subject', 'cc', 'bcc', 'subject', 'text', 'html', 'attachment', 'filenames', 'o:tracking', 'o:tag', 'email'];
    }
    async sendActivationEmail(data = {}){
        try {
            this.data.html = ActivationHTML(data)
            await this.send(this.data)
        } catch (e) {
            console.log(e)
        }
    }
    async sendAlertEmail(){}
    async sendNewsletterEmail(){}
    async sendPasswordResetEmail(){
        try {
            this.data.html = passwordRestHTML()
            await this.send(this.data)
        } catch (e) {
            console.log(e)
        }
    }

    

    init() {
        const data = {};
        this.messageDataKeys().forEach(key => {
            this[key] ? data[key] = this[key] : null
            if(key === 'email') data['to'] = data[key]
        })
        if(!data['text'] && !data['html']) data['html'] = welcome()
        this.data = data;
        this.data['from'] = process.env.MAIL_FROM
        if (!this.client) this.client = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });
        if (!this.DOMAIN) this.DOMAIN = process.env.MAILGUN_DOMAIN;
    }
    /**
     * @name autoinvoked
     * @function
     *
     * @param {Object|Function|Class} className the class whose methods to be bound to it
     *
     * @description auto sets the list of methods to be auto invoked
     *
     * @return does not return anything
     *
     */

    autoinvoked() {
        return ['init'];
    }

}

module.exports = Mail;