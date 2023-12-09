
"use strict";

/**
 *
 * @module OnlineController
 * @kind class
 *
 * @extends Controller
 * @requires Controller
 *
 * @classdesc OnlineController class
 */


const redis = require('redis');
const client = redis.createClient();

const Model = require('../../models/User');



class OnlineController extends require("../Controller") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(OnlineController);
    // auto invoke methods
    this.autoinvoker(OnlineController);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }




async status (req, res, next, User = new Model) {
    const { id } = req.params;

    // Check Redis for cached online status
    client.get(id, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (result === 'true') {
            return res.json({ online: true });
        } else if (result === 'false') {
            return res.json({ online: false });
        } else {
            // If not found in Redis, check MongoDB
            User.findById(id, (err, user) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                // Cache in Redis for future requests
                client.set(id, user.online.toString());
                return res.json({ online: user.online });
            });
        }
    });
}

    /**
   * @name index
   * @function
   *
   * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
   * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
   * @param {Object|Function} next middleware
   * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
   *
   * @description gets and return all users from the database
   *
   * @return {Object|Array|List}  users collections/array/object
   *
   */

     async index(req, res, next) {}
    
    
      /**
       * @name store
       * @function
       *
       * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
       * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
       * @param {Object|Function} next middleware
       * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
       *
       * @description stores a user or multiple users to  database
       *
       * @return {Object|Array|List}  users collections/array/object
       *
       */
      async store(req, res, next) {}
    
      /**
       * @name show
       * @function
       *
       * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
       * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
       * @param {Object|Function} next middleware
       * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
       *
       * @description finds a user by id (':id') or username (':username') or email (':email') and returns it
       *
       * @return {Object}  user object
       *
       */
      async show(req, res, next) {}
    
      /**
       * @name edit
       * @function
       *
       * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
       * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
       * @param {Object|Function} next middleware
       * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
       *
       * @description finds a user by id (':id') or username (':username') or email (':email') and returns it to a view (if any) for editing/updating
       *
       * @return {Object}  user object
       *
       */
      async edit(req, res, next) {}
    
      /**
       * @name update
       * @function
       *
       * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
       * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
       * @param {Object|Function} next middleware
       * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
       *
       * @description updates a user by id (':id') or username (':username') or email (':email')
       *
       * @return {Object}  user object
       *
       */
      async update (req, res, next, User = new Model) {
        const { id } = req.params;
        const { online } = req.body;
    
        try {
            const user = await User.findByIdAndUpdate(id, { online }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Update Redis with online status
            client.set(id, online.toString());
            return res.json(user);
        } catch (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    
      /**
       * @name destroy
       * @function
       *
       * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
       * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
       * @param {Object|Function} next middleware
       * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
       *
       * @description delete a user by id (':id') or username (':username') or email (':email')
       *
       * @return {Object}  user object
       *
       */
      async destroy(req, res, next) {}

}

module.exports = OnlineController;
