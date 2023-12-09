const { faker } = require('@faker-js/faker');

const Mail = require('../../models/Mail');
const User = require('../../models/User');
const Reply = require('../../models/Reply');

const user = new User
const mail = new Mail
const reply = new Reply;
// subject: faker.lorem.sentence(sentence),
//  body: faker.lorem.paragraph(paragraph),

const getIdFromString = id => id.toString()
const fakeReplies = async (counter = 1) => {
    for (let i = 0; i < counter; i++) {
        const auth = await user.findByEmail('Zoey_Wiegand@yahoo.com')
        // const mails = await mail.find();// mail.inbox(auth)
        const selectedMail = await mail.findById('64ffd4d3fba66c99174f528b')

        const users = await user.find();
        // const mailReply = mails[i];
        if (selectedMail) {
            delete selectedMail._id
            selectedMail.parent_id = '64ffd4d3fba66c99174f528b'// getIdFromString(selectedMails[i]._id)
            selectedMail.subject = faker.lorem.sentence(1)
            selectedMail.body = faker.lorem.paragraph(20);
            selectedMail.from = users[1];
            selectedMail.to = auth;
            const result = await reply.create(selectedMail)
            console.log(result)
        }

    }

}

fakeReplies(10)//.then(console.log).catch(console.error)

// mail.findById('64ffd4d3fba66c99174f528b', {}, (error, mail) => {
//     if(error) return console.log(error)
//     const replies = reply.replies(mail)
//     console.log(replies)
// })





