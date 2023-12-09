
"use strict";

/**
 *
 * @module AccountController
 * @kind class
 *
 * @extends Controller
 * @requires Controller
 *
 * @classdesc AccountController class
 */

const passport = require('passport');
const bcrypt = require('bcrypt');
const { validationResult, check } = require('express-validator');
const {expiresIn} = require('../../../src/modules/helper')();
const Model = require('../../models/User');
const Mailer = require('../../../src/modules/mail')


class AccountController extends require("../Controller") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(AccountController);
    // auto invoke methods
    this.autoinvoker(AccountController);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  account(req, res, next){
    res.render('layouts', {template: 'users/account'})
};
  registerMiddleware = (req, res, next) => {
    return req.isAuthenticated() ? res.redirect('/'): next();
  }
  cpagesAccountSettingsAccount (req, res, next) {
    res.render('pages-account-settings-account')
  }
  pagesAccountSettingsSecurity(req, res, next) {
    res.render('pages-account-settings-security')
  }
  pagesAccountSettingsBilling(req, res, next){
    res.render('pages-account-settings-billing')
  }
  pagesAccountSettingsNotifications(req, res, next) {
     res.render('pages-account-settings-notifications');
  }
  pagesAccountSettingsConnections(req, res, next) {
    res.render('pages-account-settings-connections')
  }
  pagesAccountSettingsAccount(){
    res.render('pages-account-settings-account')
  }
  passwordResetCover(req, res, next){

    return res.render('auth-reset-password-cover')
  }
  authForgotPassword(req, res, next){
    return res.render('auth-forgot-password-cover');
  }
  makePasswordResetURL (token = 'token', path = `password/reset`, url = `http://localhost:3000`){return `${url}/${path}/${token}`}

  authResetPasswordCover(req, res, next, User = new Model) {

    
     User.findByEmail(req.body.email); 
     User.once('findByEmail', async user => {
      // if(!user) return res.json({error: {message: 'We could not find an account associated with this email!'}});
      if(!user) return res.render('auth-forgot-password-cover',{error: {msg: 'We could not find an account for this email!'}});
  

      const token = await bcrypt.hash(`${user.email}:${user.password}:${user.email}`, 10);
      const passwordResetToken = token.split('/').join('')
      const passwordResetTokenLifetime = expiresIn();
  
      user.passwordResetToken = passwordResetToken
      user.passwordResetTokenLifetime = passwordResetTokenLifetime
      User.updateByEmail(user.email, user)
  
      // {
      //   acknowledged: true,
      //   modifiedCount: 0,
      //   upsertedId: null,
      //   upsertedCount: 0,
      //   matchedCount: 1
      // }
      User.on('updateByEmail', result => {
        if(result.acknowledged && result.modifiedCount >= 1){
          const passwordResetUrL = makePasswordResetURL(passwordResetToken);
          const option = { email: 'andre.demaison@gmail.com', subject: 'Password Reset Link', title: 'Here We Go', buttonTitle: 'Reset Password Now', headlineTitle: `<strong><h4>Please Reset Your Password!</h4></strong>` }
          const Mail = new Mailer(user, option)
          res.json({success: 'updated'});clear
        }else{
          res.json({error: {message: 'We could not email a password reset link'}});
        }
      })
      User.on('updateByEmail-error', result => res.json({error: {message: 'We could not email a password reset link'}}))
      
     });
     User.once('findByEmail-error', error => res.status(200).send({message: 'error finding user ', error}));

  }

  validate (req , res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.locals.error = errors.array()[0]
      res.render('auth-forgot-password-cover',{error: res.locals.error})
    }
    next();
  }
 emailValidation (checkEmail = check) {
  return checkEmail('email').isEmail().withMessage('Invalid email address')
}
validateEmail (checkEmail = check) {
  return [
    checkEmail('email').isEmail().withMessage('Invalid email address'),
    (req , res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.locals.error = errors.array()[0]
        res.render('auth-forgot-password-cover',{error: res.locals.error})
      }
      next();
    }

  ]
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

module.exports = AccountController;
