'use strict';
/*
|------------------------------------------------------------------------------------
| Registration Controller
|------------------------------------------------------------------------------------
|
| This code is responsible for user registration and includes functions to prepare user data,
| handle user registration, and send activation emails. It also performs various checks, such as
| email validation and duplicate email/username checks before registering a new user.
| The Gravatar library is used to generate avatars based on the user's email address.

*/

// Import necessary libraries and modules
const bcrypt = require("bcrypt");               // Library for password hashing
const crypto = require("crypto");               // Crypto library for generating hashes
const gravatar = require("gravatar");           // Gravatar library for generating avatars
const emailValidator = require("email-validator");  // Library for email validation
const Model = require("../../../../models/User");  // User model
const Mailer = require("../../../../src/modules/mail");  // Mailer module for sending emails
const emailData = require("../../../../src/modules/mail/templates/account/activation/data");  // Email template data
const User = new Model();                        // Create a new instance of the User model

// Middleware to check if the user is already authenticated; if yes, redirect them
exports.registerMiddleware = (req, res, next) => (req.isAuthenticated() ? res.redirect("/") : next());

// Function to calculate the expiration time (default 24 hours)
const expiresIn = (hours = 24, currentDate = new Date()) => currentDate.setHours(currentDate.getHours() + hours);

// Function to generate an activation URL with a token (default URL is https://nodecraftsman.com)
const makeActicationURL = (token = "token", url = "https://nodecraftsman.com") => `${url}/account/activate/${token}`;

// Function to get a Grate
const getGravatarUrl = (email, options = { s: "200", r: "pg", d: "identicon" }) => gravatar.url(email, options, true);

// Controller function to render the user registration page
exports.showRegister = (req, res, next) => res.render("auth-register-cover");

// Function to prepare user object from the registration form data
const parepareUserObject = async (req, res, next) => {
    const { username, password, email } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const activationToken = await bcrypt.hash(`${username}:${password}:${email}`, saltRounds);

    req.body.password = hashedPassword;
    req.body.activationToken = activationToken.split("/").join("");
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
    req.body.isAdmin = false;
    req.body.isActive = false;
    req.body.isDeleted = false;
    req.body.avatar = getGravatarUrl(email);
    req.body.background = false;
    req.body.status = "offline" || "busy";

    req.body.activationTokenDuration = expiresIn();
    req.body.activationUrl = makeActicationURL(activationToken.split("/").join(""), "https://nodecraftsman.com");

    return req.body;
};

// Function to register a user with the prepared user object
const registerUser = (userData = {}, req, res, next) => {
    User.create(userData);
    User.once("create", (result) => {
        User.findById(result.insertedId);
        User.once("findById", (user) => {
            const option = {
                email: "andre.demaison@gmail.com",
                subject: "Please Activate Your Account By Verifying Your Email",
                title: "Here We Go",
                buttonTitle: "Activate Account Now",
                headlineTitle: `<strong><h4>Please Activate Your Account!</h4></strong>`,
            };
            const Mail = new Mailer(user, option);
            Mail.sendActivationEmail(emailData(user, option));
            res.locals.registeredUser = user;
            res.render("auth-verify-email-cover", { user: res.locals.registeredUser });
        });
        User.once("findById-error", (error) => res.status(200).send(error));
    });
    User.once("create-error", (error) => res.status(200).send(error));
};

// Controller function for user registration
exports.userRegistration = async (req, res, next) => {
    const { username, password, email } = req.body;

    // Validate the email address
    if (!emailValidator.validate(email)) {
        return res.status(400).json({ error: "Invalid email address" });
    }

    // Check if the email or username already exists
    const emailExists = await User.emailExists(email);
    if (emailExists) return res.status(200).send("email already exists!");
    const usernameExists = await User.usernameExists(username);
    if (usernameExists) return res.status(200).send("username already exists");

    // Prepare the user object and register the user
    const userObject = await parepareUserObject(req, res, next);
    registerUser(userObject, req, res, next);
};
