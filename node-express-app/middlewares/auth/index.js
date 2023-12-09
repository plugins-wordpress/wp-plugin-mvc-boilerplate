exports.auth = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login');
exports.admin = (req, res, next) => req.isAuthenticated() && req.user.isAdmin ? next() : res.redirect('back');
exports.login = (req, res, next) => req.isAuthenticated() ? res.redirect('/'): next()
