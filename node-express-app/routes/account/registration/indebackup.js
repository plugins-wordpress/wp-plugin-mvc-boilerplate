const passport = require('passport');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
//const gravatarUrl = require('gravatar-url');
const gravatar = require('gravatar');
const emailValidator = require('email-validator');
// //const {avatarUrlFromEmail} = require('../../src/modules/helper')();
const Model = require('../../models/User');
const Mailer = require('../../src/modules/mail')
const emailData = require('../../src/modules/mail/templates/account/activation/data')
const User = new Model;

// const registerMiddleware = (req, res, next) => req.isAuthenticated() ? res.redirect('/') : next()
// const showRegister = (req, res, next) => res.render('auth-register-cover')

const expiresIn = (hours = 24, currentDate = new Date()) => currentDate.setHours(currentDate.getHours() + 24);
const makeActicationURL = (token = 'token', url = `http://localhost:3000`) => `${url}/account/activate/${token}`

const randomNumber = (min = 1, max = 15) => Math.floor(Math.random() * (max - min + 1)) + min;

// //const avatarUrlFromEmail = (email = 'john.doe@gmail.com') => emailValidator.validate(email) ? gravatarUrl(crypto.createHash('md5').update(email.toLowerCase()).digest('hex')): `/assets/img/avatars/${randomNumber()}.png`;
const getGravatarUrl = (email, options = { s: '200', r: 'pg', d: 'identicon' }) => gravatar.url(email, options , true);



// const parepareUserObject = async (req, res, next) => {

//     const { username, password, email } = req.body;

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     const activationToken = await bcrypt.hash(`${username}:${password}:${email}`, saltRounds);
//     // Generate a hash from the email address


// //     // Create a Gravatar URL with the generated hash

//     req.body.password = hashedPassword
//     req.body.activationToken = activationToken.split('/').join('')
//     req.body.createdAt = Date.now();
//     req.body.updatedAt = Date.now();
//     req.body.isAdmin = false;
//     req.body.isActive = false;
//     req.body.isDeleted = false;
//     req.body.avatar = getGravatarUrl(email);
//     req.body.background = false;
//     req.body.status = 'offline' || 'busy'

//     req.body.activationTokenDuration = expiresIn()
//     req.body.activationUrl = makeActicationURL(activationToken.split('/').join(''))

//     return req.body;
// }

// const registerUser = (userData = {}, req, res, next) => {

//     User.create(userData);
//     User.once('create', result => {
//         User.findById(result.insertedId);
//         User.once('findById', user => {
//             const option = {email: 'andre.demaison@gmail.com',subject: 'Please Activate Your Accout By Verifying Your Email', title: 'Here We Go', buttonTitle: 'Activate Account Now', headlineTitle: `<strong><h4>Please Activate Your Account!</h4></strong>`} 
//             const Mail = new Mailer(user, option)
//             Mail.sendActivationEmail(emailData(user, option))
//             res.locals.registeredUser = user;
//             res.render('auth-verify-email-cover', {user: res.locals.registeredUser})
//         });
//         User.once('findById-error', error => res.status(200).send(error));
//     })
//     User.once('create-error', error => res.status(200).send(error));
// }
// const authEmailVerification = (req, res, next) => {

//     res.render('auth-verify-email-cover',{user: res.locals.registeredUser})
// }
const authVerifyPassword = (req, res, next) => {}


// const authAccountVerified = (req, res, next) => {
//     res.render('auth-account-verified', {user: res.locals.recentlyActivatedAccount})
// }
// const authVerifyEmail = (req, res, next) => {

// //     // return res.status(200).send(req.params)
//     User.findOne({activationToken: req.params.verificationToken})
//     User.once('findOne', user => {
//         if(!user.activationToken || user.activationToken === null ) return res.status(403).send({message: 'This account is already active!'})
//         if(user.activationTokenDuration > Date.now()){
//             User.updateById(user._id, {isActive: true, activationToken: null});
//             User.once('updateById', result => {
//                 res.locals.recentlyActivatedAccount = user;
//                 res.render('auth-account-verified', {user: res.locals.recentlyActivatedAccount})
//             })
//             User.once('updateById-error', error => res.status(403).send({message: 'We could not activate your account. Please try again'}))
//         }else{
//             res.status(403).send({message: 'Verification token has expired. Please register again'})
//         }
//     })
//     User.once('findOne-error', error =>  res.status(403).send({message: 'Verification token is invalid', error}) )

// }
// const register = async (req, res, next) => {

//     const { username, password, email } = req.body;
// //     // Hash the password
// //     // Validate the email address
//     if (!emailValidator.validate(email)) {
//         return res.status(400).json({ error: 'Invalid email address' });
//     }
//     const emailExists = await User.emailExists(email);
//     if (emailExists) return res.status(200).send('email already exists!');
//     const usernameExists = await User.usernameExists(username);
//     if (usernameExists) return res.status(200).send('username already exists');

//     const userObject = await parepareUserObject(req, res, next)

//     registerUser(userObject, req, res, next);
  
// }

module.exports = (router = require('express').Router()) => {
    router.get('/register', registerMiddleware, showRegister);
    router.post('/register', register);
    router.get('/auth-verify-email-cover', authEmailVerification)
    router.get('/account/activate/:verificationToken', authVerifyEmail)
    router.get('auth-account-verified', authAccountVerified);

    return router;
}