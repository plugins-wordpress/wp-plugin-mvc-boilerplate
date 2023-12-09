"use strict";

const Redis = require("ioredis");


/*
|--------------------------------------------------------------------------
| TCP Routes: undefined Namespace
|--------------------------------------------------------------------------
|
|
*/

module.exports = (io, namespace = '/users') => io.of(namespace);
