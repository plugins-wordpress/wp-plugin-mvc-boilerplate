const passport = require('passport');

const Model = require('../../../../models/User');
const User = new Model;

exports.authVerifyEmail = (req, res, next) => {

    // return res.status(200).send(req.params)
    User.findOne({ activationToken: req.params.verificationToken })
    User.once('findOne', user => {
        if (!user.activationToken || user.activationToken === null) return res.status(403).send({ message: 'This account is already active!' })
        if (user.activationTokenDuration > Date.now()) {
            User.updateById(user._id, { isActive: true, activationToken: null });
            User.once('updateById', result => {
                res.locals.recentlyActivatedAccount = user;
                res.render('auth-account-verified', { user: res.locals.recentlyActivatedAccount })
            })
            User.once('updateById-error', error => res.status(403).send({ message: 'We could not activate your account. Please try again' }))
        } else {
            res.status(403).send({ message: 'Verification token has expired. Please register again' })
        }
    })
    User.once('findOne-error', error => res.status(403).send({ message: 'Verification token is invalid', error }))

}