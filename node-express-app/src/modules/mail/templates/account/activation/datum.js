const makeActicationURL = (token = 'token', url = `https://nodecraftsman.com`) => `${url}/account/activate/${token}`

module.exports = (user = {}, option = {subject: 'Activate Your Account', title: 'Here We Go', buttonTitle: 'Activate Account Now', headlineTitle: `<strong><h4>Please Activate Your Account!</h4></strong>`} ) => ({
    buttonLink: makeActicationURL(user.activationToken, 'https://nodecraftsman.com') || null,
    buttonTitle: option.headlineTitle || `<strong><h6>Please Activate Your Account!</h6></strong>`,
    firstname: user.firstname,
    lastname: user.lastname
})