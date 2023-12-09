const bcrypt = require("bcrypt");
const Model = require("../../../../models/User");
const User = new Model();

exports.registerMiddleware = (req, res, next) => (req.isAuthenticated() ? res.redirect("/") : next());

exports.makePasswordResetURL = (token = "token", path = `password/reset`, url = `https://nodecraftsman.com`) => `${url}/${path}/${token}`;

exports.authResetPasswordCover = (req, res, next) => {
    User.findOne({ passwordResetToken: req.params.passwordResetToken });

    User.once("findOne", async (user) => {
        if (!user || user === null) return res.render("auth-reset-password-cover", { error: { message: "Invalid password reset link", title: "Invalid password reset link" } });
        if (user.passwordResetTokenLifetime < Date.now()) res.render("auth-reset-password-cover", { error: { message: "Password reset link has expired", title: "Expired password reset link" } });

        res.render("auth-reset-password-cover", { user });
    });
    User.once("findOne-error", (error) => res.render("auth-reset-password-cover", { error: { message: "Password reset link is bad and not acceptable", title: "Bad password reset link" } }));
};

exports.resetPassword = (req, res, next, User = new Model()) => {
    User.findOne({ passwordResetToken: req.params.passwordResetToken });

    User.once("findOne", async (user) => {
        if (!user || user === null) return res.render("auth-reset-password-cover", { error: { message: "Invalid password reset link", title: "Invalid password reset link" } });
        if (user.passwordResetTokenLifetime > Date.now()) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            User.updateById(user._id.toString(), { password: hashedPassword });
            User.on("updateById", (result) => {
                if (result.acknowledged && result.modifiedCount >= 1) {
                    return res.render("auth-reset-password-cover", { user, success: { message: "Password Changed Successfully" } });
                } else {
                    return res.render("auth-reset-password-cover", { user, success: { message: "Nothing happened" } });
                }
            });
            User.on("updateById-error", (error) => res.render("auth-reset-password-cover", { user, error: { message: "We could not change your password", title: "Fatal System Error" } }));
        } else {
            return res.render("auth-reset-password-cover", { user, error: { message: "Password reset link has expired", title: "Expired password reset link" } });
        }
    });
    User.once("findOne-error", (error) => res.render("auth-reset-password-cover", { error: { message: "Error changing your password", title: "System error" } }));
};
