'use strict';
/*
|------------------------------------------------------------------------------------
| App Cluster Server
|------------------------------------------------------------------------------------
|
| This code is a common pattern for creating Node.js applications that utilize cluster-based parallelism.
| The master process is responsible for managing worker processes, and worker processes are responsible for
| handling the actual workload of the application. This pattern helps improve the application's performance 
| and utilization of multiple CPU cores.
|
| 1. The code starts by using 'use strict', which enforces stricter syntax rules and better error handling in JavaScript.
|
| 2. It checks whether the current process is the master process using require("cluster").isMaster. If the current process is indeed the master process, the code proceeds with the if block.
|
| 3. In the if block, it requires and executes the script located at './master'. This is typically the entry point for the master process and may contain code related to cluster management and other master-specific tasks.
|
| 4. If the current process is not the master process (i.e., it's a worker process), the code proceeds to the else block.
|
| 5. In the else block, it requires and executes the script located at './cluster'. This is typically the entry point for worker processes and may contain code related to handling specific tasks for individual worker processes.
|
*/
require("cluster").isMaster ? require('./master')() : require('./cluster')();
