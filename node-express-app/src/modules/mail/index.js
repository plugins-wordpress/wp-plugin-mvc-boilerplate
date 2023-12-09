"use strict";

// Load environment variables from a .env file
require('dotenv').config();

// Import required libraries and modules
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const ActivationHTML = require('./modules/mail-activate');
const welcome = require('./templates/default/welcome');
const emailData = require('./templates/account/activation/data');
const passwordResetHTML = require('./modules/mail-password');

/**
 * @class
 * @classdesc A class for sending emails using the Mailgun service.
 */
class Mail extends require("../base") {
    /**
     * Creates an instance of the Mail class.
     *
     * @param {Object} arrayOfObjects - An array of objects to set class properties.
     */
    constructor(...arrayOfObjects) {
        super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

        // Loop through arrayOfObjects and set class properties
        arrayOfObjects.forEach(option => {
            if (Object.keys(option).length > 0) {
                Object.keys(option).forEach((key) => { if (!this[key]) this[key] = option[key]; });
            }
        });

        // Auto bind methods
        this.autobind(Mail);

        // Auto invoke methods
        this.autoinvoker(Mail);

        // Set the maximum number of listeners to infinity
        this.setMaxListeners(Infinity);
    }

    /**
     * Send an email using Mailgun.
     *
     * @param {Object} data - The email data to send.
     */
    async send(data = this.data) {
        try {
            const result = await this.client.messages.create(this.DOMAIN, data);
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Return an array of valid message data keys.
     *
     * @returns {Array} - An array of message data keys.
     */
    messageDataKeys() {
        return ['from', 'to', 'subject', 'cc', 'bcc', 'subject', 'text', 'html', 'attachment', 'filenames', 'o:tracking', 'o:tag', 'email'];
    }

    /**
     * Send an activation email.
     *
     * @param {Object} data - Data for the activation email.
     */
    async sendActivationEmail(data = {}) {
        try {
            this.data.html = ActivationHTML(data);
            await this.send(this.data);
        } catch (e) {
            console.log(e);
        }
    }

    // Additional email sending methods (sendAlertEmail, sendNewsletterEmail) can be added here.

    /**
     * Send a password reset email.
     *
     * @param {Object} user - User data for the password reset email.
     */
    async sendPasswordResetEmail(user = {}) {
        try {
            this.data.html = passwordResetHTML(user);
            await this.send(this.data);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Initialize the Mail class.
     */
    init() {
        const data = {};
        this.messageDataKeys().forEach(key => {
            this[key] ? data[key] = this[key] : null;
            if (key === 'email') data['to'] = data[key];
        });
        if (!data['text'] && !data['html']) data['html'] = welcome();
        this.data = data;
        this.data['from'] = process.env.MAIL_FROM;
        if (!this.client) this.client = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });
        if (!this.DOMAIN) this.DOMAIN = process.env.MAILGUN_DOMAIN;
    }

    /**
     * An array of methods to be auto-invoked.
     */
    autoinvoked() {
        return ['init'];
    }
}

module.exports = Mail;
