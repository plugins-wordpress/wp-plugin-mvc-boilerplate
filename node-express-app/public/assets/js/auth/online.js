((window, document, $, io) => {

    $(document).ready(function () {
        // Your code here
        const socket = io('http://localhost:3000/logout', { secure: true })
        socket.on('connect', () => {
            console.log('connected to logout socket')
        } )
        socket.on('userStatusChange', data => {
            console.log('on user has logout', data)
        })
        socket.emit('is-user-online', user)
    });
      
})(window, document, jQuery, io)