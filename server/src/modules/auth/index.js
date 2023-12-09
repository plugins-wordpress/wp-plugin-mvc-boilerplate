const passport= require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const Model = require('../../../app/models/User');
const User = new Model;

const login = async(username, password, done) => {
    try{
        const user = await User.findByEmail(username);// User.findOne({email: username});

        if(user.isActive === false) {
            //res.render('auth-login-cover', { error: req.query.error })
            return done(null, false, {message: 'Please activate your account first'});
        }

        if(!user) return done(null, false, {message: 'Invalid username or password'});

        bcrypt.hash(password, 10, function(err, hash) {
            if (err) { return done(null, false, {message: 'Invalid password or username'}) }
        
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) { return done(null, false, {message: 'Invalid password or username'}); }
                return done(null, user);
            });
        });
    }catch(err){
        return done(err);
    }
}
const serializer = (user, done) => done(null, user._id);
const deserializer = async (id, done) => {
    try{
        const user = await User.findById(id);
        return done(null, user);
    }catch(err){
        return done(err);
    }
}

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, login))
//passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(serializer)
passport.deserializeUser(deserializer)

 module.exports = () => ({
    initialize: passport.initialize(),
    session: passport.session(),
    setUser: (req, res, next) => {
        res.locals.user = req.user;
        if(!res.locals.auth) res.locals.auth = req.isAuthenticated
        return next();
    }
 })