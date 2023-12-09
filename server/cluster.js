
'use strict';
require('dotenv').config();
require('./config')();

const path = require('path');
const express = require("express");
const http = require("http");

const morgan = require("morgan");
const cors = require("cors");

const createError = require('http-errors');
const cookieParser = require('cookie-parser');
// const { renderFile } = require('ejs')
const debug = require('debug')('ongo:server');

const session = require('express-session');
const MongoStore = require('connect-mongo');//(session);
const nunjucks = require('nunjucks');


const routes = require('./routes');

const auth = require('./src/modules/auth');


const normalizePort = val => {
    const port = parseInt(val, 10);

    // named pipe
    if (isNaN(port)) return val;

    // port number
    if (port >= 0) return port;

    return false;
}
const ignoreFavicon = (req, res, next) => req.originalUrl.includes('favicon.ico') ? res.status(204).send(): next()

const setLocalVariables =  (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
}

/**
     * Event listener for HTTP server "error" event.
     */

const onError = error  => {
    if (error.syscall !== 'listen') throw error;
    
    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

const setFlashMessages = async (req, res, next) => {
    if(!req.session.messages) req.session.messages = [];
    res.locals.message = req.session.messages
    return next();
}

const port = normalizePort(process.env.PORT || '3000' || process.env.SERVER_PORT);


module.exports = () => {
    // No port used here because the master listens on it.
    const app = new express();
    /**
   * Get port from environment and store in Express.
   */
    app.set('port', port);
    app.set('trust proxy', 1)

    // Middleware,attach (or mount) routes, etc.

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(morgan("dev"));

    // nunjucks.configure('views', {
    //     autoescape: true,
    //     express: app
    //   });

    // app.use(express.static('public'));
    // app.engine('html', renderFile);
    // app.set('view engine', 'ejs');
    //   app.set('view engine', 'html');
    // app.set('view engine', 'njk');
    // app.set('views', path.join(__dirname, './views'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(cookieParser());


    const corsOptions = () => ({
        origin: 'http://localhost:3000',
        credentials: process.env.SOCKETIO_CLIENT_CORS_CREDENTIALS,
        "access-control-allow-credentials": true,
        withCredentials: true,
        allowedHeaders: ['Access-Control-Allow-Origin'],
        optionSuccessStatus: 200,
    });

    app.use(cors(corsOptions()));


    app.use(session({
        secret: 'Super Secret 123333',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            mongoUrl: 'mongodb://localhost:27017/node-express',
            autoRemove: 'native', // Default
            autoRemoveInterval: 10,
            ttl: 14 * 24 * 60 * 60,
            touchAfter: 24 * 3600,
            crypto: {
                secret: 'squirrel'
            }
        })
    }))
    app.use(auth().initialize)
    app.use(auth().session)
    app.use(auth().setUser)

    //Mount Web Routes (HTTP routes to main app)
    // require("./routes")(app)

       //Mount Web Routes (HTTP routes to main app)
       app.use(routes());

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });



    // Add a route to accept incoming post requests for the fileupload.
    // Also, attach two callback functions to handle the response.

    // Don't expose internal server to the outside.
    // const server = app.listen(0, "localhost");

    const server = http.createServer(app);

    // Mount TCP Routes (sockets) to main app
    require('./sockets')(server)

    // Don't expose internal server to the outside.
    server.listen(0, "localhost");
    server.on('error', onError);
    server.on('listening', onListening);

    /**
     * Event listener for HTTP server "error" event.
     */

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }


    // Here you might use Socket.IO middleware for authorization etc.

    // Listen to messages sent from the master. Ignore everything else.
    process.on("message", function (message, connection) {
        if (message !== "sticky-session:connection") {
            return;
        }
        // Emulate a connection event on the server by emitting the
        // event with the connection the master sent.
        server.emit("connection", connection);

        connection.resume();
    });
}