const makeActicationURL = (token = 'token', url = `http://localhost:3000`) => `${url}/account/activate/${token}`

module.exports = (user = {}, option = {subject: 'Activate Your Account', title: 'Here We Go', buttonTitle: 'Activate Account Now', headlineTitle: `<strong><h4>Please Activate Your Account!</h4></strong>`} ) => ({
    buttonLink: makeActicationURL(user.activationToken) || null,
    buttonTitle: option.headlineTitle || `<strong><h6>Please Activate Your Account!</h6></strong>`,
    firstname: user.firstname,
    lastname: user.lastname
})