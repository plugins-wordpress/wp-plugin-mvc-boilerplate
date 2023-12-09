const User = require('../../../models/User');
const Contact = require('../../../models/Contact');
const { ObjectId } = require('mongodb')
const contact = new Contact();



// User.prototype.addId = function () {
//    new User.count(function(error, counter){
//         if(error) return; 
//         this.id = counter;
//     })
// }
const user = new User();
//user.populate(1000)
user.findByUsername('Ulices_Bogisich', {}, async(error, result) => {
   if(error) return console.log(error);
    try{
        const users = await user.find({}, {limit: 100})
        for(let userContact of users) {
            result.action = 'invited';
            userContact.action = 'received';
            contact.add(result, userContact, (err, addResult) => {
                if(err) console.log(err);
                console.log(addResult)
            });
            //break;
        }
    }catch(error){
        console.log(error)
    }
   
})
//.then(console.log).catch(console.log)



// user.find({}, { limit: 2 }, async (error, users) => {
//     if (error) return console.log(error);
//     const sender = users[0];
//     const receiver = users[1];

//     sender.action = 'invited';
//     receiver.action = 'received';

//     contact.add(sender, receiver, (error, result) => {
//         if (error) return console.log(error)
//         console.log(result)
//     })
// })

