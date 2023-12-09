const User = require('../../../../../models/User');

exports.update  = (io, socket, sub, pub, user = new User()) => {
    
    socket.on('password-reset-data' , data => {
        console.log(data)
    })
}
