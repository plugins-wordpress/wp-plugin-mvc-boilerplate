module.exports = async (req, res, next) => {
    if (!req.session.messages) req.session.messages = [];
    res.locals.message = req.session.messages
    return next();
}