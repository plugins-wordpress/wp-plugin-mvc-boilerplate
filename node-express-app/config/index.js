'use strict';
/*
|------------------------------------------------------------------------------------
| Evironment Variables 
|------------------------------------------------------------------------------------
|
| This code allows you to manage and load configuration values from a .env.js file and ensure 
| that they are available as environment variables for your Node.js application. It provides flexibility
| in how configuration is stored and loaded.
|
| 1. It starts by requiring the path module to join the current working directory (process.cwd()) with the .env.js file's path. The result is a full path to the .env.js file.
|
| 2. The code then requires the .env.js file using the full path and invokes it as a function (require(...)). This is expected to load and return configuration values.
|
| 3. It exports a function that configures environment variables based on the values loaded from the .env.js file.
|
| 4. Inside the exported function, it iterates through the properties in the env object, which presumably contains configuration values.
|
| 5. For each property, it checks whether the corresponding environment variable already exists (!process.env[prop]).
|
| 5. If the environment variable does not exist, it checks the data type of the property in the env object. If it's a string, it directly assigns it to the environment variable process.env[prop].
|
| 6. If the property is an object, it converts the object to a string using env[prop].toString() and assigns the result to the environment variable.
*/

// Load the configuration from a .env.js file and set environment variables
const env = require(require('path').join(process.cwd(), './.env.js'))()

// Export a function for configuring environment variables
module.exports = () => {
  // Iterate through properties in the 'env' object
  for (let prop in env) {
    // Check if the environment variable is not already defined
    if (!process.env[prop]) {
      // If the configuration property is a string, assign it directly to the environment variable
      if (typeof env[prop] === "string") {
        process.env[prop] = env[prop];
      } else if (typeof env[prop] === "object") {
        // If the configuration property is an object, convert it to a string and assign it
        process.env[prop] = `[${env[prop].toString()}]`;
      }
    }
  }
}
