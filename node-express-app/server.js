'use strict';
/*
|------------------------------------------------------------------------------------
| Server configuration
|------------------------------------------------------------------------------------
|
| This code provides a basic setup for a Node.js web application, including middleware
| for authentication, session management, and CORS handling, making it a good starting
| point for building web applications
|
| 1. It imports various Node.js modules and packages required to set up a web server.
|
| 2. Creates an instance of the Express application.
|
| 3. Configures settings for the Express application, such as using the Nunjucks template engine, serving static files, and setting up middleware for request parsing, cookies, and session management.
|
| 4. Initializes and configures custom authentication middleware.
|
| 5. Enables parsing of JSON request bodies and sets up request logging.
|
| 6. Configures Cross-Origin Resource Sharing (CORS) options for incoming requests.
|
| 7. Mounts custom routes and error handling middleware.
|
| 8. Creates an HTTP server using Express and mounts TCP routes (sockets).
|
| 9. Starts the server and listens on port 3000.
*/

// Import required Node.js modules
const express = require('express'); // Express.js for building web applications
const http = require('http'); // HTTP server module
const path = require('path'); // Path manipulation module
const morgan = require("morgan"); // HTTP request logger middleware
const cors = require("cors"); // Cross-Origin Resource Sharing middleware
const cookieSession = require('cookie-session'); // Cookie session management
const cookieParser = require('cookie-parser'); // Cookie parsing middleware
const session = require('express-session'); // Express.js session management
const MongoStore = require('connect-mongo'); // MongoDB session store
const nunjucks = require('nunjucks'); // Template engine
const auth = require('./src/modules/auth'); // Custom authentication module

// Import custom route handlers
const routes = require('./routes');

// Create an instance of the Express application
const app = express();

// Set the port for the server
const port = 3000;

// Configure Express application settings

// Trust the proxy for client IP
app.set('trust proxy', 1); 

// Configure Nunjucks template engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Set the view engine to Nunjucks
app.set('view engine', 'njk');

// Set the directory for views
app.set('views', path.join(__dirname, './views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, './public')));

// Middleware setup

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: false }));

// Parse cookies
app.use(cookieParser());

// Configure Express session
app.use(session({
    secret: 'Super Secret 123333', // Secret key for session data
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongoUrl: 'mongodb://localhost:27017/node-express', // MongoDB connection URL
        autoRemove: 'native', // Session removal strategy
        autoRemoveInterval: 10, // Removal interval
        ttl: 14 * 24 * 60 * 60, // Session time-to-live (2 weeks)
        touchAfter: 24 * 3600, // Session "touch" time
        crypto: {
            secret: 'squirrel' // Secret key for encrypting session data
        }
    })
}));

// Initialize and configure authentication middleware
app.use(auth().initialize);
app.use(auth().session);
app.use(auth().setUser);

// Enable JSON request body parsing
app.use(express.json());

// Set up request logging with the "dev" format
app.use(morgan("dev"));

// Configure CORS options for incoming requests
const corsOptions = () => ({
    origin: 'http://localhost:3000', // Allowed origin for CORS
    credentials: true, // Enable CORS credentials
    "access-control-allow-credentials": true,
    withCredentials: true,
    allowedHeaders: ['Access-Control-Allow-Origin'],
    optionSuccessStatus: 200,
});

// Enable CORS with configured options
app.use(cors(corsOptions));

// Mount custom routes from the 'routes' module
app.use(routes());

// Mount custom error handling middleware
app.use(errors);

// Create an HTTP server using Express application
const server = http.createServer(app);

// Mount TCP Routes (sockets) to the main app
require('./sockets')(server);

// Define a listener for the server to log that it's running
const listenerHandler = () => console.log('Server is running on port ' + port);

// Start the server and listen on the specified port
server.listen(port, listenerHandler);
