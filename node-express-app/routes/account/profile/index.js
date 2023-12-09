
// const pagesProfileUser = (req, res, next) => {
//     res.render('pages-profile-user');
// }
// const pagesProfileTeams = (req, res, next) => {
//     res.render('pages-profile-teams');
// }
// const pagesProfileProjects = (req, res, next) => {
//     res.render('pages-profile-projects');
// }
// const pagesProfileConnections = (req,res, next) => {
//     res.render('pages-profile-connections');
// }


module.exports = (router = require('express').Router()) => {
    router.use(require('./connections')());
    router.use(require('./projects')());
    router.use(require('./teams')());
    //router.use(require('./user')());
    return router;
}