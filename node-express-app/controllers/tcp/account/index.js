const bcrypt = require('bcrypt');
const Model = require('../../../models/User');
const { expiresIn, makePasswordResetURL } = require('../../../src/modules/helper')();

const userToUpdate = (user = {}, token) => {
    const passwordResetToken = token.split('/').join('')
    const passwordResetTokenLifetime = expiresIn();

    user.passwordResetToken = passwordResetToken
    user.passwordResetTokenLifetime = passwordResetTokenLifetime
    user.passwordResetURL = makePasswordResetURL(passwordResetToken);
    
    return user;
}
const onUpdateByEmail = (result, socket) => {
    if (result.acknowledged && result.modifiedCount >= 1) {
        // const option = { email: 'andre.demaison@gmail.com', subject: 'Password Reset Link', title: 'Here We Go', buttonTitle: 'Reset Password Now', headlineTitle: `<strong><h4>Please Reset Your Password!</h4></strong>` }
        // const Mail = new Mailer(user, option)
        return socket.emit('account-user', user)
    } else {
        return socket.emit('error-not-account-found', { error: { message: 'We could not perform the password reset' } })
    }
}

const onUpdateByEmailReset = (email, user, result, socket, UserModel = new Model()) => {
    if (result.acknowledged && result.modifiedCount >= 1) {
        // const option = { email: 'andre.demaison@gmail.com', subject: 'Password Reset Link', title: 'Here We Go', buttonTitle: 'Reset Password Now', headlineTitle: `<strong><h4>Please Reset Your Password!</h4></strong>` }
        // const Mail = new Mailer(user, option)
        return socket.emit('account-user-password-reset', user)
    } else {
        return socket.emit('account-of-user-not-found', { error: { message: 'We could not perform the password reset' } })
    }
}


const onFindByEmail = async (email,user, socket, UserModel = new Model()) => {
    if (!user) return socket.emit('error-not-account-found', { error: { message: 'No account associated with this email' } })
    if (user.passwordResetToken) {

        if (user.passwordResetTokenLifetime > Date.now()) {
            return socket.emit('error-not-account-found', { error: { message: 'We have already sent you a reset link. Wait for at least 24 hours from your most recent request to send another request!' } })
        } else {
            const token = await bcrypt.hash(`${user.email}:${user.password}:${user.email}`, 10);
            const userData = userToUpdate(user, token)
            UserModel.updateByEmail(email, userData)
            UserModel.on('updateByEmail', result => onUpdateByEmail(result))
        }
    }
}

//return socket.emit('account-user', user)



exports.index = (io, socket, sub, pub, User = new Model()) => {

    socket.on('password-reset-link-requested', data => {
        const { email } = data;
        User.findByEmail(email);
        User.once('findByEmail', async user => onFindByEmail(email, user, socket, User))
        User.once('findByEmail-error', error => socket.emit('error-not-account-found', error))
    })
}
exports.passwordReset = (io, socket, sub, pub, User = new Model()) => { 
    socket.on('password-reset-data',data => {
        const {email, password, passwordConfirmation} = data
        User.findByEmail(email);
        User.once('findByEmail', async user => {
            if(!user || user === null) return socket.emit('account-of-user-not-found', error);
            if(password !== passwordConfirmation) return socket.emit('account-of-user-not-found', error)
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword 
            user['password-confirmation'] = hashedPassword 
            User.updateByEmail(email, user);
            User.once('updateByEmail', async result => onUpdateByEmailReset(email, user, result, socket, User))
            User.once('updateByEmail-error', error => socket.emit('account-of-user-not-found', error))
        })
        User.once('findByEmail-error', error => console.log(error))
    })
}
exports.edit = (io, socket, sub, pub, User = new Model()) => { }
exports.show = (io, socket, sub, pub, User = new Model()) => { }
exports.update = (io, socket, sub, pub, User = new Model()) => { }
exports.destroy = (io, socket, sub, pub, User = new Model()) => { }

