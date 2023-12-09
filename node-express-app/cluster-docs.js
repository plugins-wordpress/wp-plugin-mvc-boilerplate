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

const cluster = require("cluster");
const { createServer } = require("net");
const farmhash = require("farmhash");
const { setupMaster } = require("@socket.io/sticky");

// Configure the normalized port number or default to 3000
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) return val; // Named pipe
    if (port >= 0) return port; // Port number
    return false;
}

// Determine the port to listen on
const port = normalizePort(process.env.PORT || '3000' || process.env.SERVER_PORT);

// Determine the number of worker processes based on CPU cores
const num_processes = require("os").cpus().length;

module.exports = () => {
    // Create an array to store worker processes
    const workers = [];

    // Function for spawning worker processes
    const spawn = function (i) {
        workers[i] = cluster.fork();

        // Optional: Restart worker on exit
        workers[i].on("exit", function (code, signal) {
            console.log("Respawning worker", i);
            spawn(i);
        });
    };

    // Spawn worker processes
    for (let i = 0; i < num_processes; i++) {
        spawn(i);
    }

    // Function for getting a worker index based on IP address
    const worker_index = function (ip, len) {
        return farmhash.fingerprint32(ip) % len; // Fast IP-based worker selection
    };

    // Set up the master process with sticky-session support
    setupMaster(createServer(), {
        loadBalancingMethod: "least-connection", // Load balancing method
    });

    // Create the server that listens on the specified port
    const server = createServer({ pauseOnConnect: true }, function (connection) {
        // Determine the worker process for the incoming connection and pass it the connection
        const worker = workers[worker_index(connection.remoteAddress, num_processes)];
        worker.send("sticky-session:connection", connection);
    }).listen(port);
}
