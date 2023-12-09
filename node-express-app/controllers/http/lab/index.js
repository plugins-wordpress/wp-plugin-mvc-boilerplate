const Redis = require('ioredis');

const sub = new Redis();
const pub = new Redis();
const Socket = require('../../../src/modules/socket')

const {index} = require('../../tcp/lab')

exports.controller = (io = server) => (req, res, next ) => {
    const main = Socket(io).of('/')

    const mainOnConnection = socket => {
        index(req, res, next, main, socket, sub, pub)
    }

    main.on('connection', mainOnConnection)
    res.render('lab')
    next();
}