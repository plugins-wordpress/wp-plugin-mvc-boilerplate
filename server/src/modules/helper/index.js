'use strict';
const crypto = require('crypto');
const emailValidator = require('email-validator');
const gravatar = require('gravatar');

/*
|------------------------------------------------------------------------------------
| Universal Module Definition (UMD)
|------------------------------------------------------------------------------------
|
| This is an implementation of the Universal Module Definition (UMD) pattern
| for creating a module that can be used in both browser and Node.js environments.


| The function is wrapped in an immediately invoked function expression (IIFE),
| which allows the module to have its own private scope and prevent any variable conflicts with other code.
| 
| The global variable is passed as a parameter to the function. In the browser,
| the global variable refers to the window object, while in Node.js it refers to the global scope.
|
*/

(global => {

    /*
    |----------------------------------------------------------------------------------
    | MODULE DEFINITION
    |----------------------------------------------------------------------------------
    |
    | The module is defined as an object or a function.

    |
    */

    const registerMiddleware = (req, res, next) => req.isAuthenticated() ? res.redirect('/') : next()
  
    const expiresIn = (hours = 24, currentDate = new Date()) => currentDate.setHours(currentDate.getHours() + hours);
    const makeActicationURL = (token = 'token', url = `http://localhost:3000`) => `${url}/account/activate/${token}`

    const randomNumber = (min = 1, max = 15) => Math.floor(Math.random() * (max - min + 1)) + min;

    //const avatarUrlFromEmail = (email = 'john.doe@gmail.com') => emailValidator.validate(email) ? gravatarUrl(crypto.createHash('md5').update(email.toLowerCase()).digest('hex')): `/assets/img/avatars/${randomNumber()}.png`;
    const getGravatarUrl = (email, options = { s: '200', r: 'pg', d: 'identicon' }) => gravatar.url(email, options, true);


    const avatarUrlFromEmail = (email = 'john.doe@gmail.com') => emailValidator.validate(email) ? gravatarUrl(crypto.createHash('md5').update(email.toLowerCase()).digest('hex')) : `/assets/img/avatars/${randomNumber()}.png`;

    const helpers = () => ({ randomNumber, avatarUrlFromEmail, expiresIn,registerMiddleware,makeActicationURL,getGravatarUrl })


    /*
    |----------------------------------------------------------------------------------
    | EXPORTS MODULE IN NODEJS ENVIRONMENTS
    |----------------------------------------------------------------------------------
    |
    | The module is exported using an if/else statement. If the module object is defined and
    | has an exports property, then the module is being used in Node.js and we export 
    | the helpers object by assigning it to module.exports
    |
    |
    */

    if (typeof module !== 'undefined' && module.exports) module.exports = helpers;

    /*
    |----------------------------------------------------------------------------------------
    | EXPORT MODULE IN BROWSER ENVIRONMENTS
    |----------------------------------------------------------------------------------------
    |
    | If module is not defined or does not have an exports property, then the module is being used
    | in the browser and we attach the myModule object to the global object (which is the window object
    | in the browser) by assigning it to global.helpers.
    |
    */

    else global.helpers = helpers;
})(this)