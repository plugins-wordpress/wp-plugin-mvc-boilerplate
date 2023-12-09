'use strict';


const {controller} = require('../../controllers/http/lab')


// module.exports = (server, router = require('express').Router()) => {
//   router.get('/lab', LabController.index(server) )
// }
const tcp = require('../../src/modules/socket');

module.exports = (server, app = require('express').Router()) => {
    // const controller = (io = server) => (req, res, next ) => {
    //     const main = tcp(io).of('/')
    //     main.on('connection', socket => {
    //         socket.emit('new-user', {user: req.user})
    //         socket.on('chats', data => console.log(data))
    //     })
    //     res.render('lab')
    // }

    app.get('/lab',controller(server) );
};
