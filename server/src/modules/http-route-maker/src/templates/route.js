module.exports = (options = {}) => `
"use strict";

/*
|--------------------------------------------------------------------------
| User Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register users routes for your application. These
| routes are first mounted to the Router (see Router Class in /src/Router.js)
| and then to the  App (See  App Class in /src/App.js)
| Now create something great!
|
*/
module.exports = (router = require('express').Router()) => {    
    router.get("/${options.endpoint}", (req, res, next) => {});
    router.post("/${options.endpoint}", (req, res, next) => {});
    router.get("/${options.endpoint}/:id", (req, res, next) => {});
    router.post('/${options.endpoint}/:id', (req, res, next) => {})
    router.put("/${options.endpoint}/:id", (req, res, next) => {});
    router.delete("/${options.endpoint}/:id", (req, res, next) => {});  

    return router;
}
` 