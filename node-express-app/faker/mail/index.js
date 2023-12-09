const { faker } = require('@faker-js/faker');


const User = require('../../models/User');
const Contact = require('../../models/Contact');
const Mail = require('../../models/Mail');
const user = new User 
const contact = new Contact
const mail = new Mail

// user.findByEmail('Zoey_Wiegand@yahoo.com', {}, async (error, result) => {
//     if(error) return console.log(error);

//     // const mails = await mail.inbox(result);

//     // console.log(mails)


//     const contacts = await contact.contacts(result)
//     const emails = contacts.map(contact => contact.email)
//     const receiver  = await user.findByEmail(emails[2])
  
//     const makeFakeMails = async (dataNumber = 1, sentence =7, paragraph = 50) => {

//         for(let i = 0; i < emails.length; i++) {
//             let mailSender = await user.findByEmail(emails[i])
//             const fakeMail = (sender = mailSender) => ({
//                 from: sender ,
//                 to: result,
//                 cc: contacts,
//                 bcc: contacts,
//                 seen: false,
//                 open: false, 
//                 read: false,
//                 subject: faker.lorem.sentence(sentence),
//                 body: faker.lorem.paragraph(paragraph),
//                 attachements: [],
//                 createdAt: Date.now(),
//                 updatedAt: Date.now(),
               
//             })
//             mail.create(fakeMail())
//             mail.on('create', result => console.log(result))
//             mail.on('create-error', error => console.log(error))
//             // for(let i = 0; i < dataNumber; i++){
//             //     mail.create(fakeMail())
//             //     mail.on('create', result => console.log(result))
//             //     mail.on('create-error', error => console.log(error))
//             // }
//         }
        
//     }

//     makeFakeMails()

//     // const contacts = await contact.contacts(user)
//     // const emails = contacts.map(contact => contact.email)
  
//     // const makeFakeMails = (dataNumber = 300, sentence =7, paragraph = 50) => {
//     //       const fakeMail = () => ({
//     //         from: user.email,
//     //         to: emails[1],
//     //         cc: emails,
//     //         bcc: emails,
//     //         seen: false,
//     //         open: false, 
//     //         read: false,
//     //         subject: faker.lorem.sentence(sentence),
//     //         body: faker.lorem.paragraph(paragraph),
//     //         attachements: [],
//     //         createdAt: Date.now(),
//     //         updatedAt: Date.now(),
           
//     //     })
//     //     for(let i = 0; i < dataNumber; i++){
//     //         mail.create(fakeMail())
//     //         mail.on('create', result => console.log(result))
//     //         mail.on('create-error', error => console.log(error))
//     //     }
//     // }

//     // makeFakeMails()

// })