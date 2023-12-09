const passport = require('passport');
const bcrypt = require('bcrypt');
const { validationResult, check } = require('express-validator');
const {expiresIn, makePasswordResetURL} = require('../../../../src/modules/helper')();

const Model = require('../../../../models/User');
const Mailer = require('../../../../src/modules/mail')
const User = new Model;

exports.registerMiddleware = (req, res, next) => req.isAuthenticated() ? res.redirect('/'): next()

exports.passwordForgotCover = (req, res, next) => res.render('auth-forgot-password-cover');

exports.authPasswordForgotCover = (req, res, next) => {

    User.findByEmail(req.body.email); 
    User.once('findByEmail', async user => {
     if(!user) return res.render('auth-forgot-password-cover',{error: {msg: 'Account with this email does not exist!'}});
 
     const token = await bcrypt.hash(`${user.email}:${user.password}:${user.email}`, 10);
     const passwordResetToken = token.split('/').join('')
     const passwordResetTokenLifetime = expiresIn();
 
     user.passwordResetToken = passwordResetToken
     user.passwordResetTokenLifetime = passwordResetTokenLifetime
     user.passwordResetURL = makePasswordResetURL(passwordResetToken);
     User.updateByEmail(user.email, user)

     User.on('updateByEmail', result => {
       if(result.acknowledged && result.modifiedCount >= 1){
         const passwordResetUrL = makePasswordResetURL(passwordResetToken);
         const option = {passwordResetUrL, email: 'andre.demaison@gmail.com', subject: 'Password Reset Link', title: 'Here We Go', buttonTitle: 'Reset Password Now', headlineTitle: `<strong><h4>Please Reset Your Password!</h4></strong>` }
         const Mail = new Mailer(user, option)
         Mail.sendPasswordResetEmail(user, option)
         return res.render('auth-forgot-password-cover',{user, success: {msg: 'We have emailed you a password reset link!'}});
       }else{
 
       }
     })
     User.on('updateByEmail-error', result => {})
    });
    User.once('findByEmail-error', error => res.status(200).send({message: 'error finding user ', error}));
 }

 exports.validateEmail = [
    check('email').isEmail().withMessage('Invalid email address'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.locals.error = errors.array()[0]
        return res.render('auth-forgot-password-cover',{error: res.locals.error})
      }
      next();
    },
  ];
  
 