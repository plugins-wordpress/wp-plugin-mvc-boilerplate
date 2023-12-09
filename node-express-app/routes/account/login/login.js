
// const LoginController = require('../../controllers/http/login/LoginContoller');

// const {google, github} = require('../../src/modules/social/login')()

// const {showLogin, login, logout} = new LoginController();
// const loginMiddleware = (req, res, next) => req.isAuthenticated() ? res.redirect('/'): next()
  
// module.exports = (router = require('express').Router()) => {
//   router.get('/login', loginMiddleware, showLogin);
//   router.post('/login', login());
//   router.get('/auth/google', google.authGoogle())
//   router.get('/auth/google/callback', google.authGoogleCallback())
//   router.get('/auth/github', github.authGithub())
//   router.get('/auth/github/callback', github.authGithubCallback())
//   router.get('/profile', (req, res, next) => {
//     // Access user data from req.user
//     res.send(req.user);
//   });
//   router.get('/logout', logout)
//   return router;
// }





const {showLogin, login, logout} = require('../../../controllers/http/account/login/login')

const {loginMiddleware} = require('../../../middlewares/account/login')
  
module.exports = (router = require('express').Router()) => {
  router.get('/login', loginMiddleware, showLogin);
  router.post('/login', login());
  router.get('/logout', logout)
  return router;
}