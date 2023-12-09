'use strict';
/*
|------------------------------------------------------------------------------------
| Master Cluster 
|------------------------------------------------------------------------------------
|
| This code is used for creating a cluster of worker processes to improve the performance and
| scalability of a Node.js application by distributing incoming connections among multiple worker
| processes. Sticky sessions ensure that a client's subsequent requests are directed to the same
| worker process to maintain session state.
|
| 1. The code first loads environment variables from a .env file using the dotenv package to ensure that configuration options are available.
|
| 2. It uses the cluster module to create multiple worker processes, each capable of handling incoming connections.
|
| 3. The normalizePort function is used to determine the port on which the server should listen. It checks for environment variables like PORT or falls back to port 3000 if not provided.
|
| 4. The number of worker processes (num_processes) is determined based on the number of CPU cores available on the system.
|
| 5. The code exports a function that sets up the cluster of worker processes and a load balancing mechanism.
|
| 6. The spawn function is used to create and spawn worker processes. It also handles respawning of workers if they exit.
|
| 7. The worker_index function uses the farmhash library to determine the worker index based on the source IP address of incoming connections. This is used for distributing connections among worker processes.
|
| 8. The setupMaster function from the @socket.io/sticky package is used to configure the master process for sticky sessions and load balancing.
|
| 9. A server is created using createServer that listens on the specified port. It routes incoming connections to the appropriate worker process based on the source IP address.
*/

// Load environment variables from a .env file
require('dotenv').config();

const session = require('express-session');
const MongoStore = require('connect-mongo');//(session);
const nunjucks = require('nunjucks');
const express = require('express');
const http = require('http');
const path = require('path');
const morgan = require("morgan");
const cors = require("cors");
const cookieSession = require('cookie-session');

const createError = require('http-errors');
const cookieParser = require('cookie-parser');
// const { renderFile } = require('ejs')
const debug = require('debug')('ongo:server');
const flash = require('express-flash')
const User = require('./models/User');

const online   = require('./middlewares/online');



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

    nunjucks.configure('views', {
        autoescape: true,
        express: app
      });
  
    app.set('view engine', 'njk');
    app.set('views', path.join(__dirname, './views'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(cookieParser());
   
    const corsOptions = () => ({
        origin: process.env.CORS_OPTIONS_ORIGIN,
        credentials: process.env.SOCKETIO_CLIENT_CORS_CREDENTIALS,
        "access-control-allow-credentials": true,
        withCredentials: true,
        allowedHeaders: ['Access-Control-Allow-Origin'],
        optionSuccessStatus: 200,
    });

    app.use(cors(corsOptions()));

    app.use(session({
        secret: process.env.APP_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            mongoUrl: process.env.DATABASE_URL,
            autoRemove: 'native', // Default
            autoRemoveInterval: 10,
            ttl: 14 * 24 * 60 * 60,
            touchAfter: 24 * 3600,
            crypto: {
                secret: 'squirrel'
            }
        })
    }))
    app.use(flash());
    app.use(auth().initialize)
    app.use(auth().session)
    // app.use(auth().setUser)

    //Mount Web Routes (HTTP routes to main app)
    app.use(routes());
    //require('./mounts')(app)

   

    // Add a route to accept incoming post requests for the fileupload.
    // Also, attach two callback functions to handle the response.

    // Don't expose internal server to the outside.
    // const server = app.listen(0, "localhost");

   
    const server = http.createServer(app);

    //app.get('/logout', require('./logout')(server));
    
    app.use(auth().setUser(server))
    app.use(online(server))
    // require('./mounts')(server, app)
    // require('./routes')(server, app)
     //app.use(fn(server))
    // Mount TCP Routes (sockets) to main app
     require('./sockets')(server)
     //app.use(socketMiddleware(server))
  

    // Don't expose internal server to the outside.
    server.listen(0, "localhost");
    // server.on('error', onError);
    server.on('listening', onListening);

    // catch 404 and forward to error handler

    // app.use((req, res, next) => req.user ? next() : res.redirect('/login'))
    // app.use(function (req, res, next){
    //     req.isAuthenticated() ? next() : res.redirect('/login');
    // })
    // app.use(function (req, res, next) {
    //     next(createError(404));
    // });

    // // error handler
    // app.use(function (err, req, res, next) {
    //     // set locals, only providing error in development
    //     res.locals.message = err.message;
    //     res.locals.error = req.app.get('env') === 'development' ? err : {};

    //     // render the error page
    //     res.status(err.status || 500);
    //     res.render('error');
    // });

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