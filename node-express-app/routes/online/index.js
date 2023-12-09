'use strict';
/**
 * @param {object} router - An optional Express.js router to extend.
 * @returns {object} - An Express.js router that handles routes related to user online status.
 */
module.exports = (router = require('express').Router()) => {
    // Import required modules and create a Redis client
    const redis = require('redis');
    const client = redis.createClient();

    // Import the Model class to interact with MongoDB
    const Model = require('../../src/modules/model');
    const User = new Model({ collection: 'users' });

    // Define a function to map user statuses to numeric values
    const statuses = () => ({
        active: 0,
        busy: 1,
        away: 2,
        offline: 3,
    });

    // Define a route to update the online status of a user
    const update = async (req, res, next) => {
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
    };

    // Define a route to retrieve the online status of a user
    const status = async (req, res, next) => {
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
    };

    // Define and configure routes for updating and retrieving online status
    router.put('/user/:id/status', update); // Route to update online status
    router.get('/user/:id/status', status); // Route to get online status

    return router;
};
