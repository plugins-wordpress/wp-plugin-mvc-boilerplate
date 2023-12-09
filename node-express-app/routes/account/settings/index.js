// const {
//     registerMiddleware,
//     passwordForgotCover,
//     validateEmail,
//     authResetPasswordCover,
//     authPasswordForgotCover,
//     pagesAccountSettingsAccount,
//     pagesAccountSettingsSecurity,
//     pagesAccountSettingsBilling,
//     pagesAccountSettingsNotifications,
//     pagesAccountSettingsConnections
//   } = require('../../controllers/http/account');
  
  
  
  
//   module.exports = (router = require('express').Router()) => {
//     //router.get('/account', auth, account);
//     //auth-reset-password-cover
  
//     router.get('/passord/forgot', registerMiddleware, passwordForgotCover );
//     router.post('/password/forgot', validateEmail, authPasswordForgotCover);
//     router.get('/pages-account-settings-account', pagesAccountSettingsAccount);
//     router.get('/pages-account-settings-security',pagesAccountSettingsSecurity);
//     router.get('/pages-account-settings-billing', pagesAccountSettingsBilling);
//     router.get('/pages-account-settings-notifications', pagesAccountSettingsNotifications);
//     router.get('/pages-account-settings-connections',pagesAccountSettingsConnections);
//     router.get('/password/reset/:passwordResetToken',authResetPasswordCover)
    
//     return router;
//   }



// const {
//   registerMiddleware,
//   passwordForgotCover,
//   validateEmail,
//   authResetPasswordCover,
//   authPasswordForgotCover,
//   pagesAccountSettingsAccount,
//   pagesAccountSettingsSecurity,
//   pagesAccountSettingsBilling,
//   pagesAccountSettingsNotifications,
//   pagesAccountSettingsConnections
// } = require('../../controllers/http/account');




module.exports = (router = require('express').Router()) => {
  router.use(require('./account')())
  router.use(require('./billing')())
  router.use(require('./connections')())
  router.use(require('./security')())
  router.use(require('./notifications')())
  return router;
}