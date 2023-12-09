const { faker } = require('@faker-js/faker');

 // or, if desiring a different locale
// const { fakerDE: faker } = require('@faker-js/faker');

const randomName = faker.person.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz


// console.log(faker.person);

const firstName = faker.person.firstName()
const lastName = faker.person.lastName()
const password = faker.internet.password()
module.exports = () => ({
    firstname: firstName ,
    lastname: lastName,
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
    passwordResetURL: 'http://localhost:3000/password/reset/$2b$10$h0Vowi9rh3Ogso7JrqnKO6X9jI.29u8LQGMzNseEK1eYCw97fR4y'
})




