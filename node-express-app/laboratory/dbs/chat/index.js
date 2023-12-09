const { faker } = require('@faker-js/faker');
const User = require('../../../models/User');
const Contact = require('../../../models/Contact');
const Chat = require('../../../models/Chat');

const user = new User();
const chat = new Chat();
const contact = new Contact();



user.findByUsername('Ulices_Bogisich', {}, async(error, result) => {
    if(error) return console.log(error);
    try{


        const chatUser = await user.findOne({firstname: 'Fernando'})

        const lastMessage =  await chat.lastMessageUserReceivedFromChatUser(result, chatUser)

        console.log(lastMessage);
        // console.log(chatUser)
        // console.log(result)
        // lastMessageUserReceivedFromChatUser(user, chatUser, fn = () => {})
        const contacts = await contact.contacts(result)

        let newChat;
        for(let i = 0; i < 15; i++){
            // const statuses =  ['offline', 'online', 'away', 'busy']
        const randomIndex = Math.floor(Math.random() * contacts.length);
        let data = {
           createdAt: Date.now(),
           updatedAt: Date.now(),
           message: faker.lorem.lines(1),
           seen: false, 
           read: false
        }
        //  if( i % 2 == 0){
        //     newChat =  await chat.send(data, contacts[randomIndex], result)
        //  }else{
        //     newChat =  await chat.send(data, result, contacts[randomIndex])
        //  }
        if( i % 2 == 0){
            newChat =  await chat.send(data, contacts[0], result)
         }else{
            newChat =  await chat.send(data, result, contacts[0])
         }
       console.log(newChat)
        }
        
  
    }catch(error){
        console.log(error)
    }
   
})
