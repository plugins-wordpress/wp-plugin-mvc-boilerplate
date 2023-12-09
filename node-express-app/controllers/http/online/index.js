const moment = require('moment')

// Import required modules and create a Redis client
const redis = require('redis');
const client = redis.createClient();
const User = require('../../../../models/User')
const user = new User()

    // Define a function to map user statuses to numeric values
    const statuses = () => ({
        active: 0,
        busy: 1,
        away: 2,
        offline: 3,
    });

exports.status = (io = server) => async (req, res, next) => {

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
exports.update = (io = server) => async (req, res, next) => {
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



