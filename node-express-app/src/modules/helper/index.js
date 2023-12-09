'use strict';
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


    const crypto = require('crypto');
    const { hash, compare } = require('bcrypt');
    const emailValidator = require('email-validator');
    const gravatar = require('gravatar');
    const { objectIdPattern } = require('./src/regex');
    const { writeFile,writeFileSync, existsSync, createReadStream, createWriteStream } = require('fs')
    const {Readable} = require('stream')

    /*
    |----------------------------------------------------------------------------------
    | MODULE DEFINITION
    |----------------------------------------------------------------------------------
    |
    | The module is defined as an object or a function.

    |
    */

    const path = (filePath, extension, basePath = '/public/assets/json/') => require('path').join(process.cwd(), basePath, filePath + extension);

    const registerMiddleware = (req, res, next) => req.isAuthenticated() ? res.redirect('/') : next()

    const expiresIn = (hours = 24, currentDate = new Date()) => currentDate.setHours(currentDate.getHours() + hours);
    const makeActicationURL = (token = 'token', path = 'account/activate', url = `https://nodecraftsman.com`) => `${url}/${path}/${token}`

    const randomNumber = (min = 1, max = 15) => Math.floor(Math.random() * (max - min + 1)) + min;

    //const avatarUrlFromEmail = (email = 'john.doe@gmail.com') => emailValidator.validate(email) ? gravatarUrl(crypto.createHash('md5').update(email.toLowerCase()).digest('hex')): `/assets/img/avatars/${randomNumber()}.png`;
    const getGravatarUrl = (email, options = { s: '200', r: 'pg', d: 'identicon' }) => gravatar.url(email, options, true);

    const makePasswordResetURL = (token = 'token', path = 'password/reset', url = `https://nodecraftsman.com`) => `${url}/${path}/${token}`
    const avatarUrlFromEmail = (email = 'john.doe@gmail.com') => emailValidator.validate(email) ? gravatarUrl(crypto.createHash('md5').update(email.toLowerCase()).digest('hex')) : `/assets/img/avatars/${randomNumber()}.png`;

    const hexadecimalString = text => text.match(objectIdPattern) ? text.match(objectIdPattern)[1] : undefined

    const hashPassword = (userPassword, salt = 10) => new Promise((resolve, reject) => hash(userPassword, salt, (err, hashedPassword) => err ? reject(err) : resolve(hashedPassword)))
    const verifyPassword = (userEnteredPassword, storedHashedPassword) => new Promise((resolve, reject) => compare(userEnteredPassword, storedHashedPassword, (err, result) => err ? reject(err) : resolve(result)))
    const createJsonData = (data = [{}], outputPath, extension = '.json') => writeFile(path(outputPath, extension), JSON.stringify(data, null, 2), (err) => err ? console.error('Error writing to JSON file:', err) : console.log('Data has been written to the JSON file.'));
    const createDataFileWithStream = (data = [{}], outputPath, extension = '.json') => {
        const writeable = createWriteStream(path(outputPath, extension), {encoding: 'utf8'});
        const readable = Readable.from(JSON.stringify(data, null, 2))
        readable.pipe(writeable);
    }

    const createJsonDataSync = (data = [{}], outputPath, extension = '.json') => {
        try {
            writeFileSync(path(outputPath, extension), JSON.stringify(data, null, 2))
            console.log('Data has been written to the JSON file.');
        }catch(error){
            console.error('Error writing to JSON file:', error);
        }
    }
    //Readable.from(JSON.stringify(data)).pipe(createWriteStream(path(outputPath, extension), {encoding: 'utf8', objectMode: true}))




    const helpers = () => ({ randomNumber, avatarUrlFromEmail, expiresIn, registerMiddleware, makeActicationURL, getGravatarUrl, makePasswordResetURL, hexadecimalString, hashPassword, verifyPassword, createJsonData, createDataFileWithStream,createJsonDataSync })


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