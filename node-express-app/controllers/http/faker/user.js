const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

const Model = require('../../../models/User');
const User = new Model();

const { makePasswordResetURL, makeActicationURL, expiresIn } = require('../../../src/modules/helper')();

module.exports = async (dataNumber = 10) => {
    const saltRounds = 10;
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = faker.internet.email()
    const password = 'AndreDemaison'
    const username = faker.internet.userName();

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const activationToken = await bcrypt.hash(`${username}:${password}:${email}`, saltRounds);
    const token = await bcrypt.hash(`${email}:${password}:${email}`, saltRounds);

    const passwordResetToken = token.split('/').join('')
    const passwordResetTokenLifetime = expiresIn();


    const randomArrayValue = (myArray = ["offline", "online", "busy", "away"]) => {
        // Define an array
        // Generate a random ind
        const randomIndex = Math.floor(Math.random() * myArray.length);
        // Get the random value from the array
        return myArray[randomIndex];
    }


    const fakeUser = () => ({
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        middlname: faker.person.middleName(),
        fullname: firstName + ' ' + lastName,
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
        username: username,
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
        password: hashedPassword,
        'password-confirm': hashedPassword,
        emoji: faker.internet.emoji(),
        terms: 'on',
        activationToken: activationToken.split('/').join(''),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isAdmin: false,
        isActive: true,
        isDeleted: false,
        background: false,
        status: randomArrayValue() ,//| Math.floor(Math.random() * 4),
        activationTokenDuration: expiresIn(),
        activationURL: makeActicationURL(activationToken.split('/').join('')),
        passwordResetToken: passwordResetToken,
        passwordResetTokenLifetime: passwordResetTokenLifetime,
        passwordResetURL: makePasswordResetURL(passwordResetToken)
    })

    for(let i = 0; i < dataNumber; i++){
        User.create(fakeUser())
    }
    
}
