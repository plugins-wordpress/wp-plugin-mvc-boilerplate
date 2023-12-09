const bcrypt = require("bcrypt");
const User = require("../../../../../models/User");
const Mailer = require("../../../../../src/modules/mail");

const { expiresIn, makePasswordResetURL } = require("../../../../../src/modules/helper")();

// Export the 'store' function as part of the module
exports.store = (io, socket, sub, pub, user = new User()) => {
    // Listen for the 'password-forgot-email' event from the client
    socket.on("password-forgot-email", (email) => {
        // Attempt to find a user by their email address
        user.findByEmail(email);

        // Listen for the 'findByEmail' event triggered when user information is found
        user.on("findByEmail", async (reqUser) => {
            // If no user is found or it's null, emit an 'email-does-not-exist' event
            if (!reqUser || reqUser == null) return socket.emit("email-does-not-exist", "This email is not associated with any user!");

            // Create a token based on user data (email, password, and email again)
            const token = await bcrypt.hash(`${reqUser.email}:${reqUser.password}:${reqUser.email}`, 10);

            // Remove '/' characters from the token to make it safe for URLs
            const passwordResetToken = token.split("/").join("");

            // Calculate the password reset token's expiration time
            const passwordResetTokenLifetime = expiresIn();

            // Update the user object with the new password reset token and related data
            reqUser.passwordResetToken = passwordResetToken;
            reqUser.passwordResetTokenLifetime = passwordResetTokenLifetime;
            reqUser.passwordResetURL = makePasswordResetURL(passwordResetToken);

            // Update the user's information in the database
            user.updateByEmail(email, reqUser);

            // Listen for the 'updateByEmail' event when the update operation is complete
            user.on("updateByEmail", (result) => {
                if (result.acknowledged && result.modifiedCount >= 1) {
                    // If the update is successful, send a password reset email
                    const passwordResetURL = makePasswordResetURL(passwordResetToken);
                    const option = {
                        passwordResetURL,
                        email: "andre.demaison@gmail.com",
                        subject: "Password Reset Link",
                        title: "Here We Go",
                        buttonTitle: "Reset Password Now",
                        headlineTitle: `<strong><h4>Please Reset Your Password!</h4></strong>`,
                    };
                    const Mail = new Mailer(reqUser, option);
                    Mail.sendPasswordResetEmail(reqUser, option);
                    // Emit 'email-found' event to the client
                    return socket.emit("email-found", "We have emailed you a password reset link!");
                } else {
                    // If the update fails, emit 'email-found' event with an appropriate message
                    return socket.emit("email-found", "We decided to do nothing!");
                }
            });

            // Listen for the 'updateByEmail-error' event in case of an error during the update
            user.on("updateByEmail-error", (error) => socket.emit("email-does-not-exist", error));
        });

        // Listen for the 'findByEmail-error' event if there's an error when finding the user by email
        user.on("findByEmail-error", (error) => socket.emit("email-does-not-exist", error));
    });
};

const prepareUserData = async (reqUser, socket) => {
    if (!reqUser || reqUser == null) return socket.emit("email-does-not-exist", "This email is not associated with any user!");

    const token = await bcrypt.hash(`${reqUser.email}:${reqUser.password}:${reqUser.email}`, 10);
    const passwordResetToken = token.split("/").join("");
    const passwordResetTokenLifetime = expiresIn();

    reqUser.passwordResetToken = passwordResetToken;
    reqUser.passwordResetTokenLifetime = passwordResetTokenLifetime;
    reqUser.passwordResetURL = makePasswordResetURL(passwordResetToken);
    return reqUser;
};

const emailOnUpdate = (reqUser, result, socket) => {
    if (result.acknowledged && result.modifiedCount >= 1) {
        const passwordResetUrL = makePasswordResetURL(passwordResetToken);
        const option = { passwordResetUrL, email: "andre.demaison@gmail.com", subject: "Password Reset Link", title: "Here We Go", buttonTitle: "Reset Password Now", headlineTitle: `<strong><h4>Please Reset Your Password!</h4></strong>` };
        const Mail = new Mailer(reqUser, option);
        Mail.sendPasswordResetEmail(reqUser, option);
        return socket.emit("email-found", "We have emailed you a password reset link!");
    } else {
        return socket.emit("email-found", "We decided to do nothing!");
    }
};

exports.index = (io, socket, sub, pub, ...args) => {};
exports.show = (io, socket, sub, pub, ...args) => {};
exports.edit = (io, socket, sub, pub, ...args) => {};
exports.update = (io, socket, sub, pub, ...args) => {};
exports.destroy = (io, socket, sub, pub, ...args) => {};
