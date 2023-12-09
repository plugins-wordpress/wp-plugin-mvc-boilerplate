
"use strict";

/**
 *
 * @module LoginController
 * @kind class
 *
 * @extends Controller
 * @requires Controller
 *
 * @classdesc LoginController class
 */

const passport = require('passport');


const Model = require('../../models/User');

class LoginController extends require("../Controller") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(LoginController);
    // auto invoke methods
    this.autoinvoker(LoginController);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  showLogin(req, res, next) {
    res.render('auth-login-cover', { error: req.query.error })
    // res.render('layouts', {template: 'users/login', error: req.query.error})
};
login(req, res, next) {
    return passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login?error=true',
        failureFlash: true
    })
}
isPaused(req, res, next) {}
isActive(req, res, next, User = new Model){
     User.findByEmail(req.body.email);
     User.once('findByEmail', user => {
        if(!user)  return res.render('auth-login-cover', { error: 'This email is not associated with an account' }) ; 
        if(!user.isActive) return  res.render('auth-login-cover', {error: 'Please activate your account first' })
     })
     User.once('findByEmail-error', error =>  res.render('auth-login-cover', {error: 'We simply could not log you in!' }))
     return next();
}
logout (req, res, next) {
    return req.logout(err => err ? next(err) : res.redirect('/'));
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

module.exports = LoginController;
