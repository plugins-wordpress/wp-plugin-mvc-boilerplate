
"use strict";

/**
 *
 * @module RegistrationController
 * @kind class
 *
 * @extends Controller
 * @requires Controller
 *
 * @classdesc RegistrationController class
 */

const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const {getGravatarUrl,makeActicationURL,expiresIn} = require('../../../src/modules/helper')();
const Model = require('../../models/User');
const Mailer = require('../../../src/modules/mail')
const emailData = require('../../../src/modules/mail/templates/account/activation/data')
const User = new Model;


class RegistrationController extends require("../Controller") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(RegistrationController);
    // auto invoke methods
    this.autoinvoker(RegistrationController);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }


  showRegister(req, res, next) {
    res.render('auth-register-cover')
  }

  authEmailVerification(req, res, next) {
    res.render('auth-verify-email-cover', { user: res.locals.registeredUser })
  }

  authAccountVerified(req, res, next) {
    res.render('auth-account-verified', { user: res.locals.recentlyActivatedAccount })
  }


  registerMiddleware = (req, res, next) => {return req.isAuthenticated() ? res.redirect('/') : next()}


  async parepareUserObject(req, res, next) {

    const { username, password, email } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const activationToken = await bcrypt.hash(`${username}:${password}:${email}`, saltRounds);
    // Generate a hash from the email address


    // Create a Gravatar URL with the generated hash

    req.body.password = hashedPassword
    req.body.activationToken = activationToken.split('/').join('')
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
    req.body.isAdmin = false;
    req.body.isActive = false;
    req.body.isDeleted = false;
    req.body.avatar = getGravatarUrl(email);
    req.body.background = false;
    req.body.status = 'offline' || 'busy'

    req.body.activationTokenDuration = expiresIn()
    req.body.activationUrl = makeActicationURL(activationToken.split('/').join(''))

    return req.body;
  }

  registerUser(userData = {}, req, res, next) {

    User.create(userData);
    User.once('create', result => {
      User.findById(result.insertedId);
      User.once('findById', user => {
        const option = { email: 'andre.demaison@gmail.com', subject: 'Please Activate Your Accout By Verifying Your Email', title: 'Here We Go', buttonTitle: 'Activate Account Now', headlineTitle: `<strong><h4>Please Activate Your Account!</h4></strong>` }
        const Mail = new Mailer(user, option)
        Mail.sendActivationEmail(emailData(user, option))
        res.locals.registeredUser = user;
        res.render('auth-verify-email-cover', { user: res.locals.registeredUser })
      });
      User.once('findById-error', error => res.status(200).send(error));
    })
    User.once('create-error', error => res.status(200).send(error));
  }

  authVerifyEmail(req, res, next) {

    // return res.status(200).send(req.params)
    User.findOne({ activationToken: req.params.verificationToken })
    User.once('findOne', user => {
      if (!user.activationToken || user.activationToken === null) return res.status(403).send({ message: 'This account is already active!' })
      if (user.activationTokenDuration > Date.now()) {
        User.updateById(user._id, { isActive: true, activationToken: null });
        User.once('updateById', result => {
          res.locals.recentlyActivatedAccount = user;
          res.render('auth-account-verified', { user: res.locals.recentlyActivatedAccount })
        })
        User.once('updateById-error', error => res.status(403).send({ message: 'We could not activate your account. Please try again' }))
      } else {
        res.status(403).send({ message: 'Verification token has expired. Please register again' })
      }
    })
    User.once('findOne-error', error => res.status(403).send({ message: 'Verification token is invalid', error }))

  }

  async register(req, res, next) {

    const { username, password, email } = req.body;
    // Hash the password
    // Validate the email address
    if (!emailValidator.validate(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    const emailExists = await User.emailExists(email);
    if (emailExists) return res.status(200).send('email already exists!');
    const usernameExists = await User.usernameExists(username);
    if (usernameExists) return res.status(200).send('username already exists');

    const userObject = await this.parepareUserObject(req, res, next)

    this.registerUser(userObject, req, res, next);

  }


    /**
   * @name index
   * @function
   *
   * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
   * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
   * @param {Object|Function} next middleware
   * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
   *
   * @description gets and return all users from the database
   *
   * @return {Object|Array|List}  users collections/array/object
   *
   */

     async index(req, res, next) {}
    
    
      /**
       * @name store
       * @function
       *
       * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
       * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
       * @param {Object|Function} next middleware
       * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
       *
       * @description stores a user or multiple users to  database
       *
       * @return {Object|Array|List}  users collections/array/object
       *
       */
      async store(req, res, next) {}
    
      /**
       * @name show
       * @function
       *
       * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
       * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
       * @param {Object|Function} next middleware
       * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
       *
       * @description finds a user by id (':id') or username (':username') or email (':email') and returns it
       *
       * @return {Object}  user object
       *
       */
      async show(req, res, next) {}
    
      /**
       * @name edit
       * @function
       *
       * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
       * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
       * @param {Object|Function} next middleware
       * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
       *
       * @description finds a user by id (':id') or username (':username') or email (':email') and returns it to a view (if any) for editing/updating
       *
       * @return {Object}  user object
       *
       */
      async edit(req, res, next) {}
    
      /**
       * @name update
       * @function
       *
       * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
       * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
       * @param {Object|Function} next middleware
       * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
       *
       * @description updates a user by id (':id') or username (':username') or email (':email')
       *
       * @return {Object}  user object
       *
       */
      async update(req, res, next) {}
    
      /**
       * @name destroy
       * @function
       *
       * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
       * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
       * @param {Object|Function} next middleware
       * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
       *
       * @description delete a user by id (':id') or username (':username') or email (':email')
       *
       * @return {Object}  user object
       *
       */
      async destroy(req, res, next) {}

}

module.exports = RegistrationController;
