require('dotenv').config();

const makeActicationURL = (token = 'token', url = `https://nodecraftsman.com`) => `${url}/account/activate/${token}`
const bodyHMTL = require('./bodyHTML');
const datum = require('./datum')


module.exports = (user = {}, option = {subject: 'Activate Your Account', title: 'Here We Go', buttonTitle: 'Activate Account Now', headlineTitle: `<strong><h4>Please Activate Your Account!</h4></strong>`} ) => ({

    title: option.title || 'Here We Go',
    headline: option.headlineTitle || `<strong><h6>Please Activate Your Account!</h6></strong>`,
    body: bodyHMTL(datum(user, option)),
    buttonLink: makeActicationURL(user.activationToken,'https://nodecraftsman.com') || null,
    buttonTitle: option.buttonTitle || 'Activate Account Now',
    signature: process.env.APP_SIGNATURE || 'Node Caftsman LLC, Salt Lake City, UT, USA',
    twitterLink: process.env.APP_TWITTER_LINK || 'https://twitter.com',
    twitterUsername:process.env.APP_TWITTER_USERNAME || 'nodecraftsman',
    twitterTitle: process.env.APP_TWITTER_TITLE || 'Node Caftsman LLC'

})