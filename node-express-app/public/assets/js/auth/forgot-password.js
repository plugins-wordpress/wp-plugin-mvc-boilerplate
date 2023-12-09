((window, document, $, io) => {

    $(document).ready(function () {
        // Hide the element with the ID "user-not-found"
        $(`#user-not-found`).hide();
    
        // Establish a socket connection to "http://localhost:3000/passord-forgot" with the 'secure' option set to true
        const socket = io.connect("https://nodecraftsman.com/passord-forgot", { secure: true });
    
        // Log a message when connected to the "password-forgot" socket
        socket.on("connect", () => console.log("Connected to password-forgot socket"));
    
        // Prevent the default form submission behavior when the form with the ID "formAuthentication" is submitted
        $(`#formAuthentication`).submit(function (event) {
            event.preventDefault();
        });
    
        // Attach a click event handler to the element with the ID "password-forgot-form"
        $("#password-forgot-form").click(function (event) {
            event.preventDefault();
    
            // Get the value of the input element with the ID "email"
            const email = $("#email").val();
    
            // Emit the "password-forgot-email" event with the email value to the socket
            socket.emit("password-forgot-email", email);
        });
    
        // Listen for the "email-found" event and log the user object when received
        socket.on("email-found", (user) => console.log(user));
    
        // Listen for the "email-does-not-exist" event and handle it by showing an error message
        socket.on("email-does-not-exist", (message) => {
            // Show the element with the ID "user-not-found"
            $(`#user-not-found`).show();
            // Add CSS classes for styling and animation
            $(`#user-not-found`).addClass("invalid-feedback animate__animated animate__flash");
            // Set the text of the element to the received message
            $(`#user-not-found`).text(message);
        });
    
        // Listen for the "email-found" event and handle it by showing a success message
        socket.on("email-found", (message) => {
            // Show the element with the ID "user-not-found"
            $(`#user-not-found`).show();
            // Add CSS classes for styling and animation
            $(`#user-not-found`).addClass("text-success animate__animated animate__flash");
            // Set the text of the element to the received message
            $(`#user-not-found`).text(message);
        });

    });
    
})(window, document, jQuery, io)

