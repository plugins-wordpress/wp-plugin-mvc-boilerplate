
exports.authEmailVerification = (req, res, next) => {

    res.render('auth-verify-email-cover', { user: res.locals.registeredUser })
}

exports.authAccountVerified = (req, res, next) => {
    res.render('auth-account-verified', { user: res.locals.recentlyActivatedAccount })
}