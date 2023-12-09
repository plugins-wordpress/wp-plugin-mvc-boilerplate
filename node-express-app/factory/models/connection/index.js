'use strict';
/**
 * @function
 * Generates a fake user object with random properties.
 *
 * @returns {Object} - A fake user object with random properties.
 */
module.exports = () => {
    // Import the faker instance from the @faker-js/faker library.
    const { faker } = require('@faker-js/faker');
    // Generate a random name and email address.
    const randomName = faker.person.fullName(); // Rowan Nikolaus
    const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
    // Generate a random password using faker's internet.password method.
    const password = faker.internet.password();

    // Generate a fake user object with various properties.
    const userObject = {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        fullname: faker.person.firstName() + ' ' + faker.person.lastName(),
        middlname: faker.person.middleName(),
        gender: faker.person.gender(),
        sex: faker.person.sex(),
        sexType: faker.person.sexType(),
        bio: faker.person.bio(),
        prefix: faker.person.prefix(),
        suffix: faker.person.suffix(),
        jobTitle: faker.person.jobTitle(),
        jobDescriptor: faker.person.jobDescriptor(),
        jobArea: faker.person.jobArea(),
        jobType: faker.person.jobType(),
        zodiacSign: faker.person.firstName(),
        avatar: faker.internet.avatar(),
        email: faker.internet.email(),
        workEmail: faker.internet.exampleEmail(),
        username: faker.internet.userName(),
        displayName: faker.internet.displayName(),
        protocol: faker.internet.protocol(),
        httpMethod: faker.internet.httpMethod(),
        httpStatusCode: faker.internet.httpStatusCode(),
        url: faker.internet.url(),
        domainName: faker.internet.domainName(),
        domainSuffix: faker.internet.domainSuffix(),
        domainWord: faker.internet.domainWord(),
        ip: faker.internet.ip(),
        ipv4: faker.internet.ipv4(),
        ipv6: faker.internet.ipv6(),
        port: faker.internet.port(),
        userAgent: faker.internet.userAgent(),
        color: faker.internet.color(),
        mac: faker.internet.mac(),
        password: password,
        'password-confirm': password,
        emoji: faker.internet.emoji(),
        terms: 'on',
        activationToken: null,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isAdmin: false,
        isActive: true,
        isDeleted: false,
        background: false,
        isOnline: false,
        status: 'offline',
        activationTokenDuration: 1693779605162,
        activationUrl: 'http://localhost:3000/account/activate/$2b$10$XL.hiln3VobLfmxvRaFS.ZNB4n6OBrcpxtEPGtpRuBsaqjczsEhm',
        passwordResetToken: '$2b$10$h0Vowi9rh3Ogso7JrqnKO6X9jI.29u8LQGMzNseEK1eYCw97fR4y',
        passwordResetTokenLifetime: 1693971561758,
        passwordResetUrL: 'http://localhost:3000/password/reset/$2b$10$lE94X4wxb8R2Im8N4QWz4uhbOGjY19avJEPjH.yoNSvL2uZBIPIbm',
        passwordResetURL: 'http://localhost:3000/password/reset/$2b$10$h0Vowi9rh3Ogso7JrqnKO6X9jI.29u8LQGMzNseEK1eYCw97fR4y',
    };

    return userObject;
};
