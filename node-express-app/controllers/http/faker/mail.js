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
        to: '',
        cc: [],
        bcc: [],
        seen: false,
        open: false, 
        read: false,
        subject: '',
        body: '',
        attachements: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
       
    })
    for(let i = 0; i < dataNumber; i++){
        User.create(fakeUser())
    }
    
}
