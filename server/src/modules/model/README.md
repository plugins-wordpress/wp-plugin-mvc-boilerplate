# Mongodb Model 

Model is an exceptional and dynamic tool that excels in facilitating seamless interaction with MongoDB databases, constructing robust internal or external APIs, establishing efficient TCP connections, and enabling real-time communication. Developed as a comprehensive wrapper around the Native Node.js MongoDB driver, it effectively streamlines the intricacies typically associated with this technology, as well as with Mongoose.js. Acting as a duplex stream, particularly a Transform stream, Model maximizes the potential of both the MongoDB driver and the Node.js Transform Stream API. Essentially, any task achievable with these cutting-edge technologies can be effortlessly accomplished using Model. Furthermore, Model operates with a strong emphasis on event-driven architecture and maintains impeccable compatibility with Mongoose.js, enhancing its overall versatility and usability.

### Installation

 <br />

```bash
$ yarn add @mongodb-model/model

```
 or 

```bash

$ npm i @mongodb-model/model

```
### That's it: start using it!
Instantiate the Model class by providing an object with your database URL and collection name as keys. <ins> ***This will give you the corresponding collection model!***</ins>
 ```javascript 
  const Model = require('@mongodb-model/model');
  const User = new Model({url: 'mongodb://localhost:27017/model', collection: 'users'});
 ```
 By initializing the Model class, the database connection process is automated, eliminating the need for manual handling. The instantiation of the Model class seamlessly takes care of the database connection. ***Additionally, using a schema is entirely optional!***
* CREATE
  * Use Promise

    ```javascript 
      User.insertOne({firstname: 'John', lastname: 'Doe', email: 'john.doe@gmail.com', username: 'johndoe'});
          .then(result => console.log('user inserted', result))
          .catch(error => console.log('error inserting user', error));
    ```

   * Or Use Event

      ```javascript 
      User.insertOne({firstname: 'John', lastname: 'Doe', email: 'john.doe@gmail.com', username: 'johndoe'});
      User.on('insertOne', result => console.log('user inserted', result));
      User.on('insertOne-error', error => console.log('error inserting user', error));
      ```

   * Or Use Callback

      ```javascript 
        User.insertOne({firstname: 'John', lastname: 'Doe', email: 'john.doe@gmail.com', username: 'johndoe'},{},(error, users) => {
            if(error) return console.log('error inserting user', error);
            console.log('user inserted', result);
        });
      ```
* READ
  * Use Promise

    ```javascript 
      User.find()
          .then(users => console.log('users found', users))
          .catch(error => console.log('error finding users', error));
    ```

   * Or Use Event

      ```javascript 
      User.find();
      User.on('find', users => console.log('users found', users));
      User.on('find-error', users => console.log('error finding users', users));
      ```

   * Or Use Callback

      ```javascript 
        User.find({},{},(error, users) => {
            if(error) return console.log('error finding users', error);
            console.log('users found', users);
        });
      ```
* UPDATE
  * Use Promise

    ```javascript 
      User.updateOne({username: 'johndoe'},{email: 'johndoe@gmail.com'})
          .then(result => console.log('user updated', result))
          .catch(error => console.log('error updating', error));
    ```

   * Or Use Event

      ```javascript 
      User.updateOne({username: 'johndoe'},{email: 'johndoe@gmail.com'});
      User.on('updateOne', result => console.log('user updated', result));
      User.on('updateOne-error', error => console.log('error updating', error));
      ```

   * Or Use Callback

      ```javascript 
        User.updateOne({username: 'johndoe'},{email: 'johndoe@gmail.com'},{},(error, result) => {
            if(error) return console.log('error updating', error);
            console.log('user updated', result);
        });
      ```
* DELETE
  * Use Promise

    ```javascript 
      User.deleteOne({username: 'johndoe'})
          .then(result => console.log('user deleted', result))
          .catch(error => console.log('error deleting user', error));
    ```

   * Or Use Event

      ```javascript 
      User.deleteOne({username: 'johndoe'});
      User.on('deleteOne', result => console.log('user deleted', result));
      User.on('deleteOne-error', error => console.log('error deleting user', error));
      ```

   * Or Use Callback

      ```javascript 
        User.deleteOne({username: 'johndoe'},{},(error, result) => {
            if(error) return console.log('error deleting user', error);
            console.log('user deleted', result);
        });
      ```
  <ins>**That's it! It's that simple!**</ins>



### A MORE DETAILED EXPLANATION 
#### 1. add .env file in your project root directory with these environment variables (at least the first two: DATABASE_NAME and DATABASE_URL, DATABASE_)
 *** No need for installing dotenv npm package ***
```bash
DATABASE_NAME='Your Mongodb Database Name'
DATABASE_URL='Your Mongodb Database URL'
JSON_FAKER_URL='Your json faker url'
BUCKET_NAME='Your GridFS bucket name'

```
**Here is an example**: 
```bash
DATABASE_NAME='my_app'
DATABASE_URL='mongodb://localhost:27017'
JSON_FAKER_URL='https://jsonplaceholder.typicode.com/'
BUCKET_NAME='myGridFSBucket'

```

#### 2. Make sure you have mongodb server running if you are using mongodb server locally.

<ins> NOTE: The .env file is not required. It is completely optional. It only helps instantiate the MongoDB Model by passing the object with only one key: the collection name as shown in the rest of this documentation. </ins> 

 <br />

### **Start using it**
Mongodb-model leverages the power of the MongoDB Native Node.js Driver, simplifying its complexities. It utilizes the same set of methods with identical parameters, seamlessly integrating with the Mongodb Native Node.js Driver. When employing the callback style, an additional callback function is included for flexibility.

 ### **Usage**
 Simply initialize the Model class. This automates the database connection process. There's no need for manual database connection handling, as it is seamlessly taken care of during the instantiation of the Model class.

 ```javascript 
const Model = require('@mongodb-model/model');
const ModelName = new Model({collection: 'collectionName'});
 ```

 Depending on your requirements, you have the flexibility to opt for one or a combination of three approaches: the promise approach, the event approach, and the callback approach. By leveraging these approaches, you can effectively address various scenarios and accomplish your goals. The versatility provided by these options empowers you to tailor your solution to meet your specific needs. Embracing the simplicity and power of these approaches, you can confidently navigate your development journey.

 * Using Promise
    ```javascript
    ModelName.methodName(parameter1, parameter2, ...)
             .then(result => /** Your success codes here**/)
             .catch(error => /** Your error codes here**/);
    ```
* Using Event

    ```javascript
    ModelName.methodName(parameter1, parameter2, ...);
    ModelName.on('methodName', result => /** Your success codes here**/);
    ModelName.on('methodName-error', error => /** Your error codes here**/);
    ```
* Using Callback: ***all parameters are required (not optional) when using the callback approach***.
  ```javascript
  ModelName.methodName(parameter1, parameter2, ...,(error, result) => {
    /** Your successs and error codes here**/
  });
  ```
  <ins>***That's all there is! It's that simple!***</ins>


### Examples
The following examples showcase mongodb-model capabilities.

 <br />
 To get started, simply initialize the Model class, which automates the database connection process. With this approach, there's no need for manual database connection handling, as it is seamlessly taken care of during the instantiation of the Model class. Streamline your workflow by letting Model handle the database connection for you.


 ```javascript 
const Model = require('@mongodb-model/model');
const User = new Model({collection: 'users'});
 ```

#### Find all users

  * Using Promise

    ```javascript 
      User.find()
          .then(users => console.log('all users found', users))
          .catch(error => console.log('error finding all users', error));
    ```

   * Using Event

      ```javascript 
      User.find();
      User.on('find', users => console.log('all users found', users));
      User.on('find-error', users => console.log('error finding all users', users));
      ```

   * Using Callback

      ```javascript 
        User.find({},{},(error, users) => {
            if(error) return console.log('error finding all users', error);
            console.log('all users found', users);
        });
      ```
***Find or retrieve all users based on their last name while excluding their _ids and usernames***

  * Using Promise

      ```javascript 
        User.find({lastname: 'Doe'}, {projection: {_id: 0, username: 0}})
            .then(users => console.log('all users found', users))
            .catch(error => console.log('error finding all users', error));
      ```

   * Using Event

      ```javascript 
        User.find({lastname: 'Doe'}, {projection: {_id: 0, username: 0}});
        User.on('find', users => console.log('all users found', users));
        User.on('find-error', users => console.log('error finding all users', users));
      ```

   * Using Callback

      ```javascript 
        User.find({lastname: 'Doe'}, {projection: {_id: 0, username: 0}},(error, users) => {
            if(error) return console.log('error finding all users', error);
            console.log('all users found', users);
        });
      ```

 ***Find or retrieve all users based on their last name while excluding all other fields except their _id, first names, last names, emails, and phones***


  * Using Promise

      ```javascript 
        const options = {projection: {firstname: 1, lastname: 1, email: 1, phone: 1}};

        User.find({lastname: 'Doe'}, options)
            .then(users => console.log('all users found', users))
            .catch(error => console.log('error finding all users', error));
      ```

   * Using Event

      ```javascript 
          const options = {projection: {firstname: 1, lastname: 1, email: 1, phone: 1}};

          User.find({lastname: 'Doe'}, options);
          User.on('find', users => console.log('all users found', users));
          User.on('find-error', users => console.log('error finding all users', users));
      ```

   * Using Callback

      ```javascript 
        const options = {projection: {firstname: 1, lastname: 1, email: 1, phone: 1}};

        User.find({lastname: 'Doe'}, options,(error, users) => {
            if(error) return console.log('error finding all users', error);
            console.log('all users found', users);
        });
      ```


 ***Find or retrieve all users based on their last name, excluding all other fields except _id, first names, last names, emails, and phones. Additionally, sort the results by _id in descending order to obtain a desired sorting arrangement***


   * Using Promise

        ```javascript 
            const options = {projection: {firstname: 1, lastname: 1, email: 1, phone: 1, sort: {_id: -1}}};

            User.find({lastname: 'Doe'}, options)
                .then(users => console.log('all users found', users))
                .catch(error => console.log('error finding all users', error));
        ```

   * Using Event

        ```javascript 
              const options = {projection: {firstname: 1, lastname: 1, email: 1, phone: 1, sort: {_id: -1}}};

              User.find({lastname: 'Doe'}, options);
              User.on('find', users => console.log('all users found', users));
              User.on('find-error', users => console.log('error finding all users', users));
        ```

   * Using Callback

        ```javascript 
            const options = {projection: {firstname: 1, lastname: 1, email: 1, phone: 1, sort: {_id: -1}}};

            User.find({lastname: 'Doe'}, options,(error, users) => {
                if(error) return console.log('error finding all users', error);
                console.log('all users found', users);
            });
        ```


#### *Basic CRUD (Create, Read, Update, Delete)*

Mongodb-model is designed to harness the full potential of the MongoDB Native Node.js Driver while offering a simplified experience. It seamlessly incorporates the underlying Mongodb Native Node.js Driver, offering an identical set of methods with consistent parameters. Moreover, when employing the callback style, Mongodb-model conveniently includes an extra callback function to facilitate seamless integration. With Mongodb-model, you can leverage the power of the MongoDB Native Node.js Driver without compromising on ease of use or functionality.

#### CREATE 


1. Using Promise
   * Using the **create** method 
      ```javascript 
        const userData = {firstname: 'John', lastname: 'Doe'}; 

        User.create(userData)
            .then(result => console.log('user created successfully:' + result));
            .catch(err => console.log('error creating user: ' + err));
      ```

   * Using the **insertOne** Method 
      ```javascript 
        const userData = {firstname: 'John', lastname: 'Doe'}; 

        User.insertOne(userData).
            .then(result => console.log('user created successfully'));
            .catch(err => console.log('error creating user: ' + err));
      ```
      ```
2. Using Callback
   * Using the **create** method 
      ```javascript 
        const userData = {firstname: 'John', lastname: 'Doe'}; 

        User.create(userData,{},(error, result) => {
            if(error) return console.log('error creating user', result);
            console.log('created user', result);
        })
      ```

   * Using the **insertOne** Method 
      ```javascript 
        const userData = {firstname: 'John', lastname: 'Doe'}; 

        User.insertOne(userData,{},(error, result) => {
            if(error) return console.log('error creating user', result);
            console.log('created user', result);
        })
      ```
3. Using Event
   * Using the **create** method 
      ```javascript 
        const userData = {firstname: 'John', lastname: 'Doe'}; 

        User.create(userData);

        User.on('create', user => console.log('user created', user));
        User.on('create-error', error => console.log('error creating user', error));
      ```

   * Using the **insertOne** Method 
      ```javascript 
        const userData = {firstname: 'John', lastname: 'Doe'}; 
        
        User.insertOne(userData);

        User.on('insertOne', user => console.log('user inserted', user));
        User.on('insertOne-error', error => console.log('error inserting user', error));
      ```

#### READ 


1. Using Promise
   * Using the **all** method 
      ```javascript 
        User.all()
            .then(users => console.log('users found', users))
            .catch(error => console.log('error finding users', error));
      ```

   * Using the **find** Method 
      ```javascript 
       User.find()
            .then(users => console.log('users found', users))
            .catch(error => console.log('error finding users', error));
      ```


   * Using the **findById** Method 
      ```javascript 
       User.findById('645e4d81c050a750429b4421')
            .then(user => console.log('user by id', user))
            .catch(error => console.log('error finding user by id', error));
      ```

    * Using the **lastByEmail** Method 
      ```javascript 
      User.lastByEmail('john@example.com')
          .then(user => console.log('last user by email found', user))
          .catch(error => console.log('error finding last user by email', error));
      ```
2. Using Callback
   * Using the **all** method 
      ```javascript 
        User.all({},{},(error, users) => {
            if(error) return console.log('error getting users', error);
            console.log('all users', users);
        })
      ```

   * Using the **find** Method 
      ```javascript 
        User.find({},{},(error, users) => {
          if(error) return console.log('error finding users', error);
          console.log('all users', users);
        })
      ```
   * Using the **findById** method 
      ```javascript 
       User.findById('645e4d81c050a750429b4421',{},(error, user) => {
          if(error) return console.log('error finding user by id', error);
          console.log('found user by id', user);
      })
      ```
   * Using the **lastByEmail** Method 
      ```javascript 
        User.lastByEmail('john@example.com',{},(error, user) => {
            if(error) return console.log('error finding last user by email', error);
            console.log('last user by email found', user);
        });
      ```
2. Using Event
   * Using the **all** method 
      ```javascript 
        User.all();
        User.on('all', users => console.log('all users', users));
        User.on('all-error', error => console.log('error getting all users', error));
      ```

   * Using the **find** Method 
      ```javascript 
        User.find();
        User.on('find', users => console.log('all found users', users));
        User.on('find-error', error => console.log('error finding users', error));
      ```
   * Using the **findById** method 
      ```javascript 
        User.findById('645e4d81c050a750429b4421');
        User.on('findById', user => console.log(user));
        User.on('findById-error', error => console.log(error));
      ```
   * Using the **lastByEmail** Method 
      ```javascript 
        User.lastByEmail('john@example.com');
        User.on('lastByEmail', user => console.log(user));
        User.on('lastByEmail-error', error => console.log(error));
      ```

#### UPDATE 


1. Using Promise
   * Using the **update** method 
      ```javascript 
        const filter = {_id: '645e4d81c050a750429b4421'};
        const update = {firstname: 'John', lastname: 'Doe'};

        User.update(filter, update)
            .then(result => console.log('updated user', result))
            .catch(error => console.log('error updating user', error));
      ```

   * Using the **updateOne** Method 
      ```javascript 
        const filter = {_id: '645e4d81c050a750429b4421'};
        const update = {firstname: 'John', lastname: 'Doe'};
        
        User.updateOne(filter, update)
            .then(result => console.log('updated user', result))
            .catch(error => console.log('error updated user', error));
      ```

   * Using the **updateMany** Method 
      ```javascript 
        const filterForMany = {lastname: 'DeMaison'};
        const updateForMany = {firstname: 'André De', lastname: 'Maison'};
        
        User.updateMany(filterForMany, updateForMany)
            .then(result => console.log('updated users', result))
            .catch(error => console.log('error updated users', error));
      ```

    * Using the **updateById** Method 
      ```javascript 
          const update = {firstname: 'John', lastname: 'Doe'};
        
          User.updateById('645e4d81c050a750429b4421', update)
              .then(result => console.log('updated user', result))
              .catch(error => console.log('error updated user', error));
      ```
2. Using Callback
   * Using the **update** method 
      ```javascript 
        const filter = {_id: '645e4d81c050a750429b4421'};
        const update = {firstname: 'John', lastname: 'Doe'};

        User.update(filter, update, {}, (error, result) => {
            if(error) return console.log('error updating user', result);
            console.log('updated user', result);
        });
      ```

   * Using the **updateOne** Method 
      ```javascript 
          const filter = {_id: '645e4d81c050a750429b4421'};
          const update = {firstname: 'John', lastname: 'Doe'};
        
          User.updateOne(filter, update, {}, (error, result) => {
              if(error) return console.log('error updating user', result);
              console.log('updated user', result);
          });
      ```
   * Using the **updateMany** method 
      ```javascript 
        const filterForMany = {lastname: 'DeMaison'};
        const updateForMany = {firstname: 'André De', lastname: 'Maison'};
        
        User.updateMany(filterForMany, updateForMany, {},(error, result) => {
            if(error) return console.log('error updating users', result);
            console.log('updated users', result);
        });
      ```
   * Using the **updateById** Method 
      ```javascript 
        const update = {firstname: 'John', lastname: 'Doe'};
        User.updateById('645e4d81c050a750429b4421',{},(error, result) => {
            if(error) return console.log('error updating last user by id', error);
            console.log('user updated by id', result);
        });
      ```
2. Using Event
   * Using the **update** method 
      ```javascript 
        const filter = {_id: '645e4d81c050a750429b4421'};
        const update = {firstname: 'John', lastname: 'Doe'};

        User.update(filter, update);
        User.on('update', user => console.log('updated user', user));
        User.on('update-error', error => console.log('error updating user', error));
      ```

   * Using the **updateOne** Method 
      ```javascript 
        const filter = {_id: '645e4d81c050a750429b4421'};
        const update = {firstname: 'John', lastname: 'Doe'};
        
        User.updateOne(filter, update);
        User.on('updateOne', user => console.log('updated user', user));
        User.on('updateOne-error', error => console.log('error updating user', error));
      ```
   * Using the **updateMany** method 
      ```javascript 
        const filterForMany = {lastname: 'DeMaison'}
        const updateForMany = {firstname: 'André De', lastname: 'Maison'};
        
        User.updateMany(filterForMany, updateForMany);
        User.on('updateMany', result => console.log('updated users', result));
        User.on('updateMany-error', error => console.log('error updating users', error));
      ```
   * Using the **updateById** Method 
      ```javascript 
        const update = {firstname: 'John', lastname: 'Doe'};
        User.updateById('645b9cf776b7fb46975316d9', update)

        User.on('updateById', result => console.log('updated user by id', result));
        User.on('updateById-error', error => console.log('error updating user by id', error));
      ```

#### DELETE 


1. Using Promise
   * Using the **destroy** method 
      ```javascript 
        User.destroy({username: 'johndoe'})
            .then(result => console.log('user destroyed', result))
            .catch(error => console.log('error destroying user', error));
      ```

   * Using the **remove** method 
      ```javascript 
        User.remove({username: 'johndoe'})
            .then(result => console.log('user removed', result))
            .catch(error => console.log('error removining user', error));
      ```

   * Using the **deleteOne** Method 
      ```javascript 
        User.deleteOne({username: 'johndoe'})
            .then(result => console.log('user deleted', result))
            .catch(error => console.log('error deleting user', error));
      ```

   * Using the **updateMany** Method 
      ```javascript 
        User.deleteMany({username: 'johndoe'})
            .then(result => console.log('users deleted', result))
            .catch(error => console.log('error deleting users', error));
      ```

    * Using the **deleteById** Method 
      ```javascript 
          User.deleteById('645b9cf776b7fb46975316d9')
              .then(user => console.log('user deleted by id', user))
              .catch(error => console.log('error deleting user by id', error));
      ```

    * Using the **removeById** Method 
      ```javascript 
          User.removeById('645b9cf776b7fb46975316d9')
              .then(user => console.log('user removed by id', user))
              .catch(error => console.log('error removing user by id', error));
      ```
    * Using the **deleteByEmail** Method 
      ```javascript 
          User.deleteByEmail('john@example.com')
              .then(user => console.log('user deleted by email', user))
              .catch(error => console.log('error deleting user by email', error));
      ```

    * Using the **deleteByUsername** Method 
      ```javascript 
          User.deleteByUsername('johndoe')
              .then(user => console.log('user deleted by username', user))
              .catch(error => console.log('error deleting user by username', error));
      ```

2. Using Callback
   * Using the **destroy** method 
      ```javascript 
        User.destroy({username: 'johndoe'},{}, (error,result) => {
            if(error) console.log('error destroying user', error);
            console.log('user deleted', result);
        })
      ```

   * Using the **remove** method 
      ```javascript 
         User.remove({username: 'johndoe'},{}, (error,result) => {
            if(error) console.log('error removing user', error);
            console.log('user removed', result);
        })
      ```

   * Using the **deleteOne** Method 
      ```javascript 
        User.deleteOne({username: 'johndoe'},{},(error, result) => {
            if(error) console.log('error deleting user', error);
            console.log('user deleted', result);
        })
      ```

   * Using the **deleteMany** Method 
      ```javascript 
        User.deleteMany({username: 'johndoe'},{}, (error, result) =>{
            if(error) console.log('error deleting users', error);
            console.log('users deleted', result);
        })
      ```

    * Using the **deleteById** Method 
      ```javascript 
          User.deleteById('645b9cf776b7fb46975316d9', {}, (error, result) =>{
              if(error) console.log('error deleting user by id', error);
              console.log('user deleted by id', result);
        })
      ```

    * Using the **removeById** Method 
      ```javascript 
          User.removeById('645b9cf776b7fb46975316d9', {}, (error, result) =>{
              if(error) console.log('error removing user by id', error);
              console.log('user removed by id', result);
          })
      ```
    * Using the **deleteByEmail** Method 
      ```javascript 
          User.deleteByEmail('john@example.com', {}, (error, result) =>{
              if(error) console.log('error deleting user by email', error);
              console.log('user deleted by email', result);
          })
      ```

    * Using the **deleteByUsername** Method 
      ```javascript 
          User.deleteByUsername('johndoe', {}, (error, result) =>{
              if(error) console.log('error deleting user by username', error);
              console.log('user deleted by username', result);
          })
      ```

3. Using Event
   * Using the **destroy** method 
      ```javascript 
        User.destroy({username: 'johndoe'});
        User.on('delete', result => console.log('user destroyed', result));
        User.on('delete-error', error => console.log('error destroying user', error));
      ```

   * Using the **remove** method 
      ```javascript 
        User.remove({username: 'johndoe'});
        User.on('delete', result => console.log('user removed', result));
        User.on('delete-error', error => console.log('error removing user', error));
      ```

   * Using the **deleteOne** Method 
      ```javascript 
        User.deleteOne({username: 'johndoe'});
        User.on('deleteOne',result => console.log('user deleted', result));
        User.on('deleteOne-error',error => console.log('error deleting user', error));
      ```

   * Using the **deleteMany** Method 
      ```javascript 
          User.deleteMany({username: 'johndoe'});
          User.on('deleteMany', result => console.log('user deleted', result));
          User.on('deleteMany-error', error => console.log('error deleting user', error));
      ```

    * Using the **deleteById** Method 
      ```javascript 
        User.deleteById('645b9cf776b7fb46975316d9');
        User.on('deleteById',result => console.log('user deleted', result));
        User.on('deleteById-error',error => console.log('error deleting user', error));
      ```

    * Using the **removeById** Method 
      ```javascript 
        User.removeById('645b9cf776b7fb46975316d9');
        User.on('removeById',result => console.log('user removed by id', result));
        User.on('removeById-error',error => console.log('error removing user by id', error));
      ```
    * Using the **deleteByEmail** Method 
      ```javascript 
        User.deleteByEmail('john@example.com');
        User.on('deleteByEmail',result => console.log('user deleted by email', result));
        User.on('deleteByEmail-error',error => console.log('error deleting user by email', error));
      ```

    * Using the **deleteByUsername** Method 
      ```javascript 
        User.deleteByUsername('johndoe');
        User.on('deleteByUsername', result => console.log('user deleted by username', result));
        User.on('deleteByUsername-error', error => console.log('error deleting user by username', error));
      ```

### *Using it in a framework*

Integrating the Mongodb Model into your application framework brings numerous benefits. It allows you to leverage the flexibility and scalability of MongoDB while seamlessly integrating with your existing application infrastructure.

By incorporating the Mongodb Model, you can take advantage of its intuitive methods and functions for data management. It provides an organized approach to defining models, handling data validations, and performing CRUD operations, making it easier to work with MongoDB within the context of your application framework.

#### *Using it in Express*

##### *Setting up a simple express server*

```javascript 
  const express = require('express');
  const Model = require('@mongodb-model/model');
                              
  const app = express();
  app.use(express.json()); 

  const User = new Model({collection: 'users'});
                              
  /**
    Each of the example codes for the remaining of this section will go right here.
  **/      
                              
  app.listen(3000, () => console.log('listening on port 3000'));
```
##### *CREATE*

  1. Using Promise

      * Using the **create** method 
        ```javascript 
        app.post('/users', async (req, res, next) => {
          try{
            const result = await User.create(req.body);
            res.status(200).send({result});
          }catch(error){
            res.status(500).send({error});
          }
        });
        ```

      * Using the **insertOne** method 
        ```javascript 
        app.post('/users', async (req, res, next) => {
           try{
            const result = await User.insertOne(req.body);
            res.status(200).send({result});
          }catch(error){
            res.status(500).send({error});
          }
        });
        ```
  2. Using Callback

      * Using the **create** method 
        ```javascript 
        app.post('/users', (req, res, next) => {
            User.create(req.body,{},(error, result) => {
                if(error) return res.status(500).send({error});
                res.status(200).send({result});
            });
        });
        ```

      * Using the **insertOne** method 
        ```javascript 
        app.post('/users', (req, res, next) => {
           User.insertOne(req.body,{},(error, result) => {
              if(error) return res.status(500).send({error});
              res.status(200).send({result});
          });
        });
        ```


  3. Using Event

      * Using the **create** method 
        ```javascript 
        app.post('/users', (req, res, next) => {
           
            User.create(req.body);

            User.on('create', result => res.status(200).send({result}));
            User.on('create-error', error => res.status(500).send({error}));
        });
        ```

      * Using the **insertOne** method 
        ```javascript 
        app.post('/users', (req, res, next) => {

            User.insertOne(req.body);

            User.on('insertOne', result => res.status(200).send({result}));
            User.on('insertOne-error', error => res.status(500).send({error}));
        });
        ```

##### *READ*

  1. Using Promise

      * Using the **all** method 
        ```javascript 
        app.get('/users', async (req, res, next) => {
          try{
            const users = await User.all();
            res.status(200).send(users);
          }catch(error){
            res.status(500).send({error});
          }
        });
        ```

      * Using the **find** method 
        ```javascript 
        app.get('/users', async (req, res, next) => {
           try{
            const users = await User.find();
            res.status(200).send(users);
          }catch(error){
            res.status(500).send({error});
          }
        });
        ```
      * Using the **findById** method 
        ```javascript 
        app.get('/users/:id', async (req, res, next) => {
           try{
            const user = await User.findById(req.params.id);
            res.status(200).send(user);
          }catch(error){
            res.status(500).send({error});
          }
        });
        ```
      * Using the **findByEmail** method 
        ```javascript 
        app.get('/user-email', async (req, res, next) => {
           try{
            const user = await User.findByEmail(req.body.email);
            res.status(200).send(user);
          }catch(error){
            res.status(500).send({error});
          }
        });
        ```
  2. Using Callback

      * Using the **all** method 
        ```javascript 
        app.get('/users', (req, res, next) => {
            User.all({},{},(error, users) => {
                if(error) return res.status(500).send({error});
                res.status(200).send(users);
            });
        });
        ```

      * Using the **find** method 
        ```javascript 
        app.get('/users', (req, res, next) => {
           User.find({},{},(error, users) => {
              if(error) return res.status(500).send({error});
              res.status(200).send(users);
          });
        });
        ```

      * Using the **findById** method 
        ```javascript 
        app.get('/users/:id', (req, res, next) => {
           User.findById(req.params.id,{},(error, user) => {
              if(error) return res.status(500).send({error});
              res.status(200).send(user);
          });
        });
        ```
      * Using the **findByEmail** method 
        ```javascript 
        app.get('/user-email', (req, res, next) => {
           User.findByEmail(req.body.email,{},(error, user) => {
              if(error) return res.status(500).send({error});
              res.status(200).send(user);
          });
        });
        ```


  3. Using Event

      * Using the **all** method 
        ```javascript 
        app.get('/users', (req, res, next) => {
           
            User.all();

            User.on('all', result => res.status(200).send(users));
            User.on('all-error', error => res.status(500).send({error}));
        });
        ```

      * Using the **find** method 
        ```javascript 
        app.get('/users', (req, res, next) => {

            User.find();

            User.on('find', users => res.status(200).send(users));
            User.on('find-error', error => res.status(500).send({error}));
        });
        ```

      * Using the **findById** method 
        ```javascript 
        app.get('/users/:id', (req, res, next) => {

            User.findById(req.params.id);

            User.on('findById', user => res.status(200).send(user));
            User.on('findById-error', error => res.status(500).send({error}));
        });
        ```

      
      * Using the **findByEmail** method 
        ```javascript 
        app.get('/user-email', (req, res, next) => {

            User.findByEmail(req.body.email);

            User.on('findByEmail', user => res.status(200).send(user));
            User.on('findByEmail-error', error => res.status(500).send({error}));
        });
        ```
##### *UPDATE*

  1. Using Promise

      * Using the **update** method 
        ```javascript 
        app.put('/users/:id', async (req, res, next) => {
          try{
            const userId = User.objectId(req.params.id);
            const updated = await User.update({_id: userId},req.body);
            res.status(200).send({updated});
          }catch(error){
            res.status(500).send({error});
          }
        });
        ```

      * Using the **updateById** method 
        ```javascript 
        app.put('/users/:id', async (req, res, next) => {
          try{
            const updated = await User.updateById(req.params.id, req.body);
            res.status(200).send({updated});
          }catch(error){
            res.status(500).send({error});
          }
        });
        ```

      * Using the **updateByUsername** method 
        ```javascript 
        app.put('/user-username', async (req, res, next) => {
          try{
            const updated = await User.updateByUsername(req.body.username, req.body);
            res.status(200).send({updated});
          }catch(error){
            res.status(500).send({error});
          }
        });
        ```

      * Using the **updateByEmail** method 
        ```javascript 
        app.put('/user-email', async (req, res, next) => {
          try{
            const updated = await User.updateByEmail(req.body.email, req.body);
            res.status(200).send({updated});
          }catch(error){
            res.status(500).send({error});
          }
        });
        ```
  2. Using Callback

      * Using the **create** method 
        ```javascript 
        app.post('/users', (req, res, next) => {
            User.create(req.body,{},(error, result) => {
                if(error) return res.status(500).send({error});
                res.status(200).send({result});
            });
        });
        ```

      * Using the **insertOne** method 
        ```javascript 
        app.post('/users', (req, res, next) => {
           User.insertOne(req.body,{},(error, result) => {
              if(error) return res.status(500).send({error});
              res.status(200).send({result});
          });
        });
        ```


  3. Using Event

      * Using the **create** method 
        ```javascript 
        app.post('/users', (req, res, next) => {
           
            User.create(req.body);

            User.on('create', result => res.status(200).send({result}));
            User.on('create-error', error => res.status(500).send({error}));
        });
        ```

      * Using the **insertOne** method 
        ```javascript 
        app.post('/users', (req, res, next) => {

            User.insertOne(req.body);

            User.on('insertOne', result => res.status(200).send({result}));
            User.on('insertOne-error', error => res.status(500).send({error}));
        });
        ```

##### *DELETE*

  1. Using Promise

      * Using the **deleteOne** method 
        ```javascript 
        app.delete('/users/:id', async (req, res, next) => {
          try{
            const userId = User.objectId(req.params.id);
            const result = await deleteOne({_id: userId});
            res.status(200).send({result});
          }catch(error){
            res.status(500).send({error});
          }
        });
        ```

      * Using the **destroy** method 
        ```javascript 
        app.delete('/users/:id', async (req, res, next) => {
          try{
              const userId = User.objectId(req.params.id);
              const result = await destroy({_id: userId});
              res.status(200).send(result);
          }catch(error){
            res.status(500).send({error});
          }
        });
        ```

      * Using the **deleteById** method 
        ```javascript 
        app.delete('/users/:id', async (req, res, next) => {
          try{
            const result = await deleteById(req.params.id);
            res.status(200).send(result);
          }catch(error){
            res.status(500).send({error});
          }
        });
        ```


        * Using the **remove** method 
        ```javascript 
        app.delete('/users/:id', async (req, res, next) => {
          try{
            const userId = User.objectId(req.params.id);
            const result = await remove({_id: userId});
            res.status(200).send(result);
          }catch(error){
            res.status(500).send({error});
          }
        });
        ```

      * Using the **deleteByEmail** method 
        ```javascript 
        app.delete('/delete-user-by-email', async (req, res, next) => {
          try{
            const result = await User.deleteByEmail(req.body.email);
            res.status(200).send({result});
          }catch(error){
            res.status(500).send({error});
          }
        });
        ```
  2. Using Callback

      * Using the **deleteOne** method 
        ```javascript 
          app.delete('/users/:id', (req, res, next) => {
              const userId = User.objectId(req.params.id);

              User.deleteOne({_id: userId},{}, (error,result) => {
                  if(error) console.log('error deleting user', error);
                  console.log('user deleted', result);
              });
          });
        ```
      * Using the **destroy** method 
        ```javascript 
         app.delete('/users/:id', (req, res, next) => {
              const userId = User.objectId(req.params.id);

              User.destroy({_id: userId},{}, (error,result) => {
                  if(error) console.log('error deleting user', error);
                  console.log('user deleted', result);
              });
          });
        ```

      * Using the **deleteById** method 
        ```javascript 
         app.delete('/users/:id', (req, res, next) => {
              User.deleteById(req.params.id,{}, (error,result) => {
                  if(error) console.log('error deleting user', error);
                  console.log('user deleted', result);
              });
          });
        ```

      * Using the **remove** method 
        ```javascript 
         app.delete('/users/:id', (req, res, next) => {
              const userId = User.objectId(req.params.id);

              User.remove({_id: userId},{}, (error,result) => {
                  if(error) console.log('error deleting user', error);
                  console.log('user deleted', result);
              });
          });
        ```

      * Using the **deleteByEmail** method 
        ```javascript 
         app.delete('/delete-user-by-email', (req, res, next) => {
              const userId = User.objectId(req.params.id);

              User.deleteByEmail(req.body.email,{}, (error,result) => {
                  if(error) console.log('error deleting user', error);
                  console.log('user deleted', result);
              });
          });
        ```
  3. Using Event

      * Using the **deleteOne** method 
        ```javascript 
         app.delete('/users/:id', (req, res, next) => {
              const userId = User.objectId(req.params.id);

              User.deleteOne({_id: userId});
              User.on('deleteOne', result => console.log('user deleted', result));
              User.on('deleteOne-error', error => console.log('error user deleting user', error));
          });
        ```

      * Using the **destroy** method 
        ```javascript 
         app.delete('/users/:id', (req, res, next) => {
              const userId = User.objectId(req.params.id);

              User.destroy({_id: userId});
              User.on('destroy', result => console.log('user destroyed', result));
              User.on('destroy-error', error => console.log('error user destroying user', error));
          });
        ```
      
      * Using the **deleteById** method 
        ```javascript 
         app.delete('/users/:id', (req, res, next) => {
              const userId = User.objectId(req.params.id);

              User.deleteById(req.params.id);
              User.on('deleteById', result => console.log('user deleted by id', result));
              User.on('deleteById-error', error => console.log('error deleting user by id', error));
          });
        ```

      * Using the **remove** method 
        ```javascript 
         app.delete('/users/:id', (req, res, next) => {
              const userId = User.objectId(req.params.id);

              User.remove({_id: userId});
              User.on('remove', result => console.log('user removed', result));
              User.on('remove-error', error => console.log('error user removing user', error));
          });
        ```

      * Using the **deleteByEmail** method 
        ```javascript 
         app.delete('/delete-user-by-email', (req, res, next) => {
          
              User.deleteByEmail(req.body.email);
              User.on('deleteByEmail', result => console.log('user deleted by email', result));
              User.on('deleteByEmail-error', error => console.log('error user deleting user by email', error));
          });
        ```
### *Making HTTP/HTTPS Requests: Internal/External API calls*

In today's interconnected world, applications often need to interact with external services and APIs to retrieve or manipulate data. Whether it's fetching weather information, integrating with social media platforms, or accessing internal microservices, the ability to make HTTP/HTTPS requests is a crucial aspect of modern application development.

With mongodb-model, developers can harness the power of MongoDB's document-based data model while effortlessly integrating with various APIs to create dynamic and data-driven experiences.

This section explores the mechanisms and best practices for making HTTP/HTTPS requests within the mongodb-model framework. We will delve into topics such as performing CRUD operations on external resources, handling authentication and authorization, managing request timeouts and retries, and efficiently processing API responses. By understanding these concepts, developers can extend the capabilities of their mongodb-model applications and leverage the vast array of services available through APIs. So, let's dive into the world of making HTTP/HTTPS requests with mongodb-model and unlock the potential for building truly interconnected applications.

To begin, we initialize the Model class, which automatically establishes a connection with the database. Hence, manual database connection becomes unnecessary as it is handled by the instantiation process itself.

 ```javascript 
    const Model = require('@mongodb-model/model');
    const User = new Model({collection: 'users'});
```
### *Usage*

##### *HTTPS*
  * get 
    * Using promise
      ```javascript 
        User.get('api_endpoint_https_url')
            .then(response => /** Your response codes here**/)
            .catch(error => /** Your error codes here**/);
      ```
    * Using Callback
      ```javascript 
        User.get('api_endpoint_https_url', (error, result) => {
          /** Your success and error codes here**/
      });
      ```
    * Using Event
      ```javascript 
        User.get('api_endpoint_https_url');
        User.on('get', result =>  /** Your success codes here**/);
        User.on('get-error', error =>  /** Your error codes here**/);
      ```
  * post 
    * Using promise
      ```javascript 
        User.post('api_endpoint_https_url', postData)
            .then(response => /** Your response codes here**/)
            .catch(error => /** Your error codes here**/);
      ```
    * Using Callback
      ```javascript 
        User.post('api_endpoint_https_url', postData, (error, result) => {
          /** Your success and error codes here**/
      });
      ```
    * Using Event
      ```javascript 
        User.post('api_endpoint_https_url', postData);
        User.on('post', result =>  /** Your success codes here**/);
        User.on('post-error', error =>  /** Your error codes here**/);
      ```

  * put
    * Using promise
      ```javascript 
        User.put('api_endpoint_https_url', updateData)
            .then(response => /** Your response codes here**/)
            .catch(error => /** Your error codes here**/);
      ```
    * Using Callback
      ```javascript 
        User.put('api_endpoint_https_url', updateData,(error, result) => {
          /** Your success and error codes here**/
      });
      ```
    * Using Event
      ```javascript 
        User.put('api_endpoint_https_url', updateData);
        User.on('put', result =>  /** Your success codes here**/);
        User.on('put-error', error =>  /** Your error codes here**/);
      ```

  * delete
    * Using promise
      ```javascript 
        User.delete('api_endpoint_https_url')
            .then(response => /** Your response codes here**/)
            .catch(error => /** Your error codes here**/);
      ```
    * Using Callback
      ```javascript 
        User.delete('api_endpoint_https_url', (error, result) => {
          /** Your success and error codes here**/
      });
      ```
    * Using Event
      ```javascript 
        User.delete('api_endpoint_https_url');
        User.on('delete', result =>  /** Your success codes here**/);
        User.on('delete-error', error =>  /** Your error codes here**/);
      ```
       
##### *HTTP*
  * GET 
    * Using promise
      ```javascript 
        User.GET('api_endpoint_http_url')
            .then(response => /** Your response codes here**/)
            .catch(error => /** Your error codes here**/);
      ```
    * Using Callback
      ```javascript 
        User.GET('api_endpoint_http_url', (error, result) => {
          /** Your success and error codes here**/
      });
      ```
    * Using Event
      ```javascript 
        User.GET('api_endpoint_http_url');
        User.on('GET', result =>  /** Your success codes here**/);
        User.on('GET-error', error =>  /** Your error codes here**/);
      ```

  * POST 
    * Using promise
      ```javascript 
        User.POST('api_endpoint_http_url', postData)
            .then(response => /** Your response codes here**/)
            .catch(error => /** Your error codes here**/);
      ```
    * Using Callback
      ```javascript 
        User.POST('api_endpoint_http_url', postData, (error, result) => {
          /** Your success and error codes here**/
      });
      ```
    * Using Event
      ```javascript 
        User.POST('api_endpoint_http_url', postData);
        User.on('POST', result =>  /** Your success codes here**/);
        User.on('POST-error', error =>  /** Your error codes here**/);
      ```

  * PUT
    * Using promise
      ```javascript 
        User.PUT('api_endpoint_http_url', updateData)
            .then(response => /** Your response codes here**/)
            .catch(error => /** Your error codes here**/);
      ```
    * Using Callback
      ```javascript 
        User.PUT('api_endpoint_http_url', updateData,(error, result) => {
          /** Your success and error codes here**/
      });
      ```
    * Using Event
      ```javascript 
        User.PUT('api_endpoint_http_url', updateData);
        User.on('PUT', result =>  /** Your success codes here**/);
        User.on('PUT-error', error =>  /** Your error codes here**/);
      ```


  * DELETE
    * Using promise
      ```javascript 
        User.DELETE('api_endpoint_http_url')
            .then(response => /** Your response codes here**/)
            .catch(error => /** Your error codes here**/);
      ```
    * Using Callback
      ```javascript 
        User.DELETE('api_endpoint_http_url', (error, result) => {
          /** Your success and error codes here**/
      });
      ```
    * Using Event
      ```javascript 
        User.DELETE('api_endpoint_http_url');
        User.on('DELETE', result =>  /** Your success codes here**/);
        User.on('DELETE-error', error =>  /** Your error codes here**/);
      ```
### *Examples*

***We will use the following example data for POST and PUT requests throughout the remain of this section:***

```javascript 
  const data =  {
    postId: 20,
    name: 'laudantium delectus nam',
    email: 'Hildegard.Aufderhar@howard.com',
    body: 'NEW POST aut quam consequatur sit et\n' +
         'repellat maiores laborum similique voluptatem necessitatibus nihil\n' +
          'et debitis nemo occaecati cupiditate\n' +
          'modi dolorum quia aut'
  } 
```

##### *HTTPS*
  * get: perform a GET request to 'https://jsonplaceholder.typicode.com/comments'
    * Using promise
      ```javascript 
        User.get('https://jsonplaceholder.typicode.com/comments')
            .then(response => console.log(response))
            .catch(error => console.log(error));
      ```
    * Using Callback
      ```javascript 
          User.get('https://jsonplaceholder.typicode.com/comments', (error, result) => {
              if(error) return console.log(error);
              console.log(result);
          });
      ```
    * Using Event
      ```javascript 
        User.get('https://jsonplaceholder.typicode.com/comments');
        User.on('get', result => console.log(result));
        User.on('get-error', error => console.log(error));
      ```

  * post: perform a POST request to 'https://jsonplaceholder.typicode.com/comments'
    
    * Using promise
      ```javascript 
        User.post('https://jsonplaceholder.typicode.com/comments', data)
            .then(response => console.log(response))
            .catch(error => console.log(error));
      ```
    * Using Callback
      ```javascript 
        User.post('https://jsonplaceholder.typicode.com/comments', data, (error, result) => {
          if(error) return console.log(error);
          console.log(result);
        });
      ```
    * Using Event
      ```javascript 
          User.post('https://jsonplaceholder.typicode.com/comments', data);
          User.on('post', result => console.log(result));
          User.on('post-error', error => console.log(error));
      ```
  * put: perform a PUT request to 'https://jsonplaceholder.typicode.com/comments/1'
  
    * Using promise
      ```javascript 
        User.put('https://jsonplaceholder.typicode.com/comments/1', data)
          .then(response => console.log(response))
          .catch(error => console.log(error));
      ```
    * Using Callback
      ```javascript 
        User.put('https://jsonplaceholder.typicode.com/comments/1', data, (error, result) => {
            if(error) return console.log(error);
            console.log(result);
        });
      ```
    * Using Event
      ```javascript 
        User.put('https://jsonplaceholder.typicode.com/comments/1', data);
        User.on('put', result => console.log(result));
        User.on('put-error', error => console.log(error));
      ```


  * delete: perform a DELETE request to 'https://jsonplaceholder.typicode.com/comments/1
    * Using promise
      ```javascript 
       User.delete('https://jsonplaceholder.typicode.com/comments/1')
          .then(response => console.log(response))
          .catch(error => console.log(error));
      ```
    * Using Callback
      ```javascript 
        User.delete('https://jsonplaceholder.typicode.com/comments/1', (error, result) => {
          if(error) return console.log(error);
          console.log(result);
        });
      ```
    * Using Event
      ```javascript 
        User.delete('https://jsonplaceholder.typicode.com/comments/1');
        User.on('delete', result => console.log(result));
        User.on('delete-error', error => console.log(error));
      ```
       
##### *HTTP*
  * GET: perform a GET request to a local server 'http://localhost:3000/users'
    * Using promise
      ```javascript 
        User.GET('http://localhost:3000/users')
          .then(users => console.log(users))
          .catch(error => console.log(error));
      ```
    * Using Callback
      ```javascript 
         User.GET('http://localhost:3000/users', (error, users) => {
          if(error) return console.log(error);
          console.log(users);
        });
      ```
    * Using Event
      ```javascript 
        User.GET('http://localhost:3000/users');
        User.on('GET', users => console.log(users));
        User.on('GET-error', error => console.log(error));
      ```

  * POST: Perform a POST request to a local server 'http://localhost:3000/users'
    
    * Using promise
      ```javascript 
        User.POST('http://localhost:3000/users', data)
            .then(result => console.log(result))
            .catch(error => console.log(error));
      ```
    * Using Callback
      ```javascript 
        User.post('https://jsonplaceholder.typicode.com/comments', data, (error, result) => {
          if(error) return console.log(error);
          console.log(result);
        });
      ```
    * Using Event
      ```javascript 
        User.POST('http://localhost:3000/users', data);
        User.on('POST', result => console.log(result));
        User.on('POST-error', error => console.log(error));      
      ```
  * PUT: perform a PUT request to a local server 'http://localhost:3000/users/1'
  
    * Using promise
      ```javascript 
        User.PUT('http://localhost:3000/users/1', data)
            .then(result => console.log(result))
            .catch(error => console.log(error));
      ```
    * Using Callback
      ```javascript 
       User.PUT('http://localhost:3000/users/1', data, (error, result) => {
          if(error) return console.log(error);
          console.log(result);
      });
      ```
    * Using Event
      ```javascript 
        User.put('https://jsonplaceholder.typicode.com/comments/1', data);
        User.on('put', result => console.log(result));
        User.on('put-error', error => console.log(error));
      ```


  * DELETE: perform a DELETE request to a local server 'http://localhost:3000/users/1'

    * Using promise
      ```javascript 
       User.DELETE('http://localhost:3000/users/1')
            .then(result => console.log(result))
            .catch(error => console.log(error));
      ```
    * Using Callback
      ```javascript 
        User.DELETE('http://localhost:3000/users/1', (error, result) => {
          if(error) return console.log(error);
          console.log(result);
      });
      ```
    * Using Event
      ```javascript 
        User.DELETE('http://localhost:3000/users/1');
        User.on('DELETE', result => console.log(result));
        User.on('DELETE-error', error => console.log(error));
      ```
### *Making TCP Requests*  

When working with Mongodb model, making TCP requests is a crucial aspect of communication between the client and the MongoDB server. TCP (Transmission Control Protocol) provides a reliable and ordered channel for transmitting data, ensuring the integrity and accuracy of the information exchanged.

With the Mongodb model, you can easily make TCP requests to perform various operations on the MongoDB database. Whether it's inserting new data, updating existing records, or querying for specific information, the framework provides intuitive methods and functions to interact with the database using TCP/IP protocols.

To begin, we initialize the Model class, which automatically establishes a connection with the database. Hence, manual database connection becomes unnecessary as it is handled by the instantiation process itself.

 ```javascript 
  const Model = require('@mongodb-model/model');
  const User = new Model({collection: 'users'});
 ```

***Basics*** 

***Creating a TCP Server*** 

1. Create a TCP server with Redis using the User model.

    ```javascript 
      const server = User.createTCPServerWithRedis();
    ```

2. Listen for 'connection' event on the TCP server
    ```javascript 
      server.on('connection', socket => {
        console.log('Client is ready!');
      });
    ```
3. Start listening on a port. Port 8000 is used in this example
   
    ```javascript 
      server.listen(8000);
    ```
   ***Basic TCP Server Creation Full Code***

    ```javascript 
      // Import the Model module
      const Model = require('@mongodb-model/model');
        
      // Create a new instance of Model for the 'users' collection
      const User = new Model({ collection: 'users' });
        
      // Create a TCP server with Redis using the User model
      const server = User.createTCPServerWithRedis();
        
      // Listen for 'connection' event on the TCP server
      server.on('connection', socket => {
        console.log('Client is ready!');
      });
      // Start listening on port 8000
      server.listen(8000);
   ```
***Creating a TCP Client*** 

 1. Create a TCP client for the server at 'http://localhost:8000'
 
    ```javascript 
      const client = User.createTCPClient('http://localhost:8000');
    ```

 2. Handle the 'connect' event when the client connects to the server
 
    ```javascript 
      client.on('connect', () => {
        console.log('Connected to server');
      });
    ```

    ***Basic TCP Client Creation Full Code***

    ```javascript 
      // Import the Model module
      const Model = require('@mongodb-model/model');

      // Create a new instance of Model for the 'users' collection
      const User = new Model({ collection: 'users' });

      // Create a TCP client for the server at 'http://localhost:8000';
      const client = User.createTCPClient('http://localhost:8000');

      // Handle the 'connect' event when the client connects to the server
      client.on('connect', () => {
        console.log('Connected to server');
      });
    ```
***Example*** 

***TCP Server***

1. Create a TCP server with Redis using the User model.

    ```javascript 
      const server = User.createTCPServerWithRedis();
    ```
2. Function to handle socket event listener for finding models

    ```javascript 
     /**
    * Registers a socket event listener for finding models.
    * @param {Socket} socket - The socket object
    * @param {string} [event='find'] - The event name
    * @param {Model} [Model=User] - The model class to perform the find operation on
    */
       
    const onFind = (socket, event = 'find', Model = User) => socket.on(event, () => {
      // Find models
      Model.find();
          
      // Handle 'find' event
      Model.on('find', models => socket.emit(`${Model.collection}-${event}-success`, models));
              
      // Handle 'find-error' event
      Model.on('find-error', error => socket.emit(`${Model.collection}-${event}-error`, error));
              
      // Handle 'find-done' event
      socket.on(`${event}-done`, () => console.log(`${Model.collection}-${event} done!`));
              
      // Handle 'find-failed' event
      socket.on(`${event}-failed`, () => console.log(`${Model.collection}-${event} failed!`));
    }); 
    ```
3. Function to handle socket event listener for finding a model by ID.

    ```javascript 
      /**
    * Registers a socket event listener for finding a model by ID.
    * @param {Socket} socket - The socket object
    * @param {string} [event='findById'] - The event name
    * @param {Model} [Model=User] - The model class to perform the find operation on
    */
       
    const onFindById = (socket, event = 'findById', Model = User) => socket.on(event, modelId => {
       
        //Find model by id
        Model.findById(modelId);

        // Handle 'findById' event
        Model.on('findById', model => socket.emit(`${Model.collection}-${event}-success`, model));
          
        // Handle 'findById-error' event
        Model.on('findById-error', error => socket.emit(`${Model.collection}-${event}-error`, error));
          
        // Handle 'findById-done' event
        socket.on(`${event}-done`, () => console.log(`${Model.collection}-${event} done!`));
          
        // Handle 'findById-failed' event
        socket.on(`${event}-failed`, () => console.log(`${Model.collection}-${event} failed!`));
    }); 
    ```
4. Function to handle socket event listener for creating a model.

    ```javascript 
    /**
    * Registers a socket event listener for creating a model.
    * @param {Socket} socket - The socket object
    * @param {string} [event='create'] - The event name
    * @param {Model} [Model=User] - The model class to perform the create operation on
    */
    const onCreate = (socket, event = 'create', Model = User) => socket.on(event, modelData => {
        // Create model
        Model.create(modelData);
          
        // Handle 'create' event
        Model.on('create', result => socket.emit(`${Model.collection}-${event}-success`, result));
          
        // Handle 'create-error' event
        Model.on('creat-error', error => socket.emit(`${Model.collection}-${event}-error`, error));
          
        // Handle 'create-done' event
        socket.on(`${event}-done`, () => console.log(`${Model.collection}-${event} done!`));
          
        // Handle 'create-failed' event
        socket.on(`${event}-failed`, () => console.log(`${Model.collection}-${event} failed!`));
    });
    ```
5. Function to handle client connections

    ```javascript 
      const onConnection = socket => {
          console.log('Socket connection established.');
          console.log('=============================');

          onFind(socket, 'all-users', User);
          onFindById(socket, 'this-user', User);
          onCreate(socket, 'create-this-user', User);
    }
    ```
6. Listen for 'connection' event on the TCP server
    ```javascript 
      server.on('connection', onConnection);
    ```
6. Start listening on a port. Port 8000 is used in this example
    ```javascript 
      server.listen(8000);
    ```

   ***Example TCP Server Full Code***

    ```javascript 
      // Import the Model module
      const Model = require('@mongodb-model/model');
        
      // Create a new instance of Model for the 'users' collection
      const User = new Model({ collection: 'users' });
            
      // Create a TCP server with Redis using the User model
      const server = User.createTCPServerWithRedis();

      /**
      * Registers a socket event listener for finding models.
      * @param {Socket} socket - The socket object
      * @param {string} [event='find'] - The event name
      * @param {Model} [Model=User] - The model class to perform the find operation on
      */
       
      const onFind = (socket, event = 'find', Model = User) => socket.on(event, () => {
          // Find models
          Model.find();
          
          // Handle 'find' event
          Model.on('find', models => socket.emit(`${Model.collection}-${event}-success`, models));
              
          // Handle 'find-error' event
          Model.on('find-error', error => socket.emit(`${Model.collection}-${event}-error`, error));
              
          // Handle 'find-done' event
          socket.on(`${event}-done`, () => console.log(`${Model.collection}-${event} done!`));
              
          // Handle 'find-failed' event
          socket.on(`${event}-failed`, () => console.log(`${Model.collection}-${event} failed!`));
      }); 

      /**
      * Registers a socket event listener for finding a model by ID.
      * @param {Socket} socket - The socket object
      * @param {string} [event='findById'] - The event name
      * @param {Model} [Model=User] - The model class to perform the find operation on
      */
       
      const onFindById = (socket, event = 'findById', Model = User) => socket.on(event, modelId => {
       
          //Find model by id
          Model.findById(modelId);

          // Handle 'findById' event
          Model.on('findById', model => socket.emit(`${Model.collection}-${event}-success`, model));
          
          // Handle 'findById-error' event
          Model.on('findById-error', error => socket.emit(`${Model.collection}-${event}-error`, error));
          
          // Handle 'findById-done' event
          socket.on(`${event}-done`, () => console.log(`${Model.collection}-${event} done!`));
          
          // Handle 'findById-failed' event
          socket.on(`${event}-failed`, () => console.log(`${Model.collection}-${event} failed!`));
      }); 

      /**
      * Registers a socket event listener for creating a model.
      * @param {Socket} socket - The socket object
      * @param {string} [event='create'] - The event name
      * @param {Model} [Model=User] - The model class to perform the create operation on
      */
      const onCreate = (socket, event = 'create', Model = User) => socket.on(event, modelData => {
        // Create model
        Model.create(modelData);
          
        // Handle 'create' event
        Model.on('create', result => socket.emit(`${Model.collection}-${event}-success`, result));
          
        // Handle 'create-error' event
        Model.on('creat-error', error => socket.emit(`${Model.collection}-${event}-error`, error));
          
        // Handle 'create-done' event
        socket.on(`${event}-done`, () => console.log(`${Model.collection}-${event} done!`));
          
        // Handle 'create-failed' event
        socket.on(`${event}-failed`, () => console.log(`${Model.collection}-${event} failed!`));
      });     

    // Function to handle client connections
    const onConnection = socket => {

        console.log('Socket connection established.');
        console.log('=============================');

        onFind(socket, 'all-users', User);
        onFindById(socket, 'this-user', User);
        onCreate(socket, 'create-this-user', User);
    }

    // Listen for 'connection' event on the TCP server
      server.on('connection', onConnection);
            
    // Start listening on port 8000
      server.listen(8000);
    ```

***TCP Client***
1. Create a TCP client for the server at 'http://localhost:8000'
    ```javascript 
      const client = User.createTCPClient('http://localhost:8000');
    ```
2. Handle the 'connect' event when the client connects to the server
    ```javascript 
      client.on('connect', () => {
         console.log('Connected to server');
      });
    ```
3. Request all users by emitting 'all-users' event
    ```javascript 
      client.emit('all-users');
    ```
4. Handle the 'users-all-users-success' event when all users are received from the server
    ```javascript 
      client.on('users-all-users-success', (users) => {
          if (Object.prototype.toString.call(users) === '[object Array]') {
              console.log('All users received from server!');
              client.emit('all-users-done', users); 
          }else{
              console.log('All users reception from server failed!');
              client.emit('all-users-not-received');
          }  
      });
    ```
5. Handle or listen for 'users-all-users-error' event from server
    ```javascript 
      client.on('users-all-users-error', error => {
          console.log('Server encountered error in finding all users!', error);
      })
    ```
6. Request a user by id by emitting 'this-user' event with the corresponding user's id
    ```javascript 
      client.emit('this-user', '645e4d81c050a750429b4421');
    ```
6. Handle the 'users-this-user-success' event when a specific user is received from the server
    ```javascript 
      client.on('users-this-user-success', (user) => {
          // Check if the received data is an object
          if (Object.prototype.toString.call(user) === '[object Object]')  {
              console.log('This user received from the server!');
              client.emit('this-user-done', user);
          }else {
              console.log('This user reception from the server failed!');
              client.emit('this-user-not-received');
          }    
      });
    ```
7. Request user creation by emitting the 'create-this-user' event with the corresponding user data
    ```javascript 
      client.emit('create-this-user', { name: 'John Doe', username: 'jon.doe-' + Date.now(), email: 'john.doe@gmail.com' , age: 34});
    ```
8. Handle the 'users-create-this-user-success' event when a user is created on the server
    ```javascript 
      client.on('users-create-this-user-success', (result) => {
          // Check if the received data is an object
          if (Object.prototype.toString.call(result) === '[object Object]') {
              console.log('This user created successfully!');
              client.emit('create-this-user-done', result);
          }else {
              console.log('This user created failed!');
              client.emit('this-user-not-created');
          }
      });
    ```
   ***Example TCP Client Full Code***
    ```javascript 
    // Import the Model module
    const Model = require('base-model');

    // Create a new instance of Model for the 'users' collection
    const User = new Model({ collection: 'users' });
    
    // Create a TCP client for the server at 'http://localhost:8000'
    const client = User.createTCPClient('http://localhost:8000');
    
    // Handle the 'connect' event when the client connects to the server
    client.on('connect', () => {
        console.log('Connected to server');
        console.log('==================================');
    });
    
    // Request all users by emitting the 'all-users' event
    client.emit('all-users');

    // Handle the 'users-all-users-success' event when all users are received from the server
    client.on('users-all-users-success', (users) => {
        if (Object.prototype.toString.call(users) === '[object Array]') {
            console.log('All users received from server!');
            client.emit('all-users-done', users); 
        }else{
            console.log('All users reception from server failed!');
            client.emit('all-users-not-received');
        }  
    })  

    // Handle or listen for 'users-all-users-error' event from server
    client.on('users-all-users-error', error => {
        console.log('Server encountered error in finding all users!', error);
    })
    
    // Request a user by ID by emitting the 'this-user' event
    client.emit('this-user', '645e4d81c050a750429b4421');
    
    // Handle the 'users-this-user-success' event when a specific user is received from the server
    client.on('users-this-user-success', (user) => {
      // Check if the received data is an object
        if (Object.prototype.toString.call(user) === '[object Object]')  {
            console.log('This user received from the server!');
            client.emit('this-user-done', user);
        }else {
            console.log('This user reception from the server failed!');
            client.emit('this-user-not-received');
        }  
    });
    
    // Request user creation by emitting the 'create-this-user' event
    client.emit('create-this-user', { name: 'John Doe', username: 'jon.doe-' + Date.now(), email: 'john.doe@gmail.com' , age: 34});
    
    // Handle the 'users-create-this-user-success' event when a user is created on the server
    client.on('users-create-this-user-success', (result) => {
        // Check if the received data is an object
        if (Object.prototype.toString.call(result) === '[object Object]') {
            console.log('This user created successfully!');
            client.emit('create-this-user-done', result);
        }else {
            console.log('This user created failed!');
            client.emit('this-user-not-created'); }
    });
    ```

#### By extension

```javascript
 class MyWonderfulClass extends require('@mongodb-model/model') {

    constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    this.autobind(MyWonderfulClass);
    this.autoinvoker(MyWonderfulClass);
    this.setMaxListeners(Infinity);
  }
 };
 
```
#### Detailed explanation with first contructor parameter object
```javascript
 const Model = require('@mongodb-model/model');
                
// Usage 
const YourCustomModel = new Model({db: 'your_database_name', collection: 'your_collection_name', url: 'your_database_url', faker_url: 'your_faker_url'})
                
// No constructor Parameter provided: 
 const User = new Model;
// Default collection is 'users'
// Default database name is your .env DATABASE_NAME 
// Default database url is your .env DATABASE_URL or 'mongodb://localhost:27017'
// Default faker_url url is your .env JSON_FAKER_URL or 'https://jsonplaceholder.typicode.com/'
                
// Constructor first parameter object with only collection key
const User = new Model({collection: 'users'});
// Default database name is your .env DATABASE_NAME 
// Default database url is your .env DATABASE_URL or 'mongodb://localhost:27017'
// Default faker_url url is your .env JSON_FAKER_URL or 'https://jsonplaceholder.typicode.com/'
                
// Connecting to multiple databases
const BlogUser = new Model({db: 'blog', collection: 'users'})
const WorkChat = new Model({db: 'work', collection: 'chats'})
const ForumUser = new Model({db: 'forum', collection: 'users'})

// query (create query using ForumUser)
const userData = {firstname: 'John', lastname: 'Doe', email: 'john.doe@mail.com'};
ForumUser.create(userData);

ForumUser.on('create', user => console.log('new user created', user));
ForumUser.on('create-error', error => console.log('new user creation error', error));
 
```

#### Detailed explanation with all other contructor parameter objects
```javascript
const Model = require('@mongodb-model/model');
  
const User = new Model({},{title: 'Cool Users', age: 25, fullName: () => 'User Full Name', Post: class Post {}});

// The User model now has the following added to its prototype and they are bounded to it: title,age, fullName, post
// So now we can do things like the following: 
            
const title = User.title 
const age = User.age 
const fullname = User.fullName();
const FirstPost = new User.Post 
            
// Or using object destructuring 
const {title, age, fullName, Post} = User
 
```

#### CLI example
```bash
 ## make User Model 
model make:model User

## Schema 
model make:schema UserSchema 
model make:schema --schema=Chat

## Migration

model make:migration users 
model make:migration --schema=chats 


# migrating 
# migrate all migrations and schemas 
model migrate # will migrate all migrations found in /app/schemas/ and /app/database/migrations
model migrate --schema=schema-name # will only migrate provided schema name or migration name 
model migrate --migration=migration-name # will only migrate provided schema name or migration name 
```

#### Some available instance methods 
```javascript

const DB = require('@mongodb-model/model');
const db = new DB();

// The following functions are available on db, the DB instance, as methods.
// The majority of them, especially the ones with name very similar to the Mongodb native driver methods, are actually the corresponding 
// mongodb native driver methods. In other words, they take the exact same arguments as the corresponding  native mongodb driver methods with the addtional fns function: the optional callback function.


// Note that the callback function (fns) comes last (the last parameter or comes right after the second parameter )



async createFn(method = 'find', ...args) 
async makeFn(method = 'find', toArray = false,  ...args) 
fake(collection = this.collection, faker_url = this.faker_url) 

async aggregate(pipeline = [], options = {}, fns = () => {})
async bulkwrite(operations = [], options = {}, fns = () => {})
async count(query = {}, options = {}, fns = () => {})
async countDocuments(query = {}, options = {},fns = () => {})
async createIndex(keys = {}, options = {}, fns = () => {}, commitQuorum = 1 || 'string') 
async createIndexes(keyPatterns = [], options = {},fns = () => {}, commitQuorum = 1 || 'string') 
async dataSize(fns = () => {})
async deleteOne(filter = {}, options = {},fns = () => {})
async destroy(filter = {}, options = {}, fns = () => {})
    
async updateById(id = '645b9cf776b7fb46975316d9', update = {}, options = {}, fns = () => {})
async updateByUsername(username = 'username', update = {}, options = {}, fns = () => {})
async updateByEmail(email = '645b9cf776b7fb46975316d9', update = {}, options = {}, fns = () => {})
async updateByCode(code = '645b9cf776b7fb46975316d9', update = {}, options = {}, fns = () => {})
async updateByToken(token = '645b9cf776b7fb46975316d9', update = {}, options = {}, fns = () => {})
async updateLastByUsername(username = '645b9cf776b7fb46975316d9', update = {}, options = {sort: {_id: - 1}}, fns = () => {})
async updateLastByEmail(email = '645b9cf776b7fb46975316d9', update = {}, options = {sort: {_id: - 1}}, fns = () => {})
async updateLastByToken(token = '645b9cf776b7fb46975316d9', update = {}, options = {sort: {_id: - 1}}, fns = () => {})
async updateLastByCode(code = '645b9cf776b7fb46975316d9', update = {}, options = {sort: {_id: - 1}}, fns = () => {})

async deleteById(id = '645b9cf776b7fb46975316d9', options = {}, fns = () => {})
async removeById(id = '645b9cf776b7fb46975316d9', options = {},fns = () => {})
async deleteOneByEmail(email = 'john.doe@gmail', options = {}, fns = () => {})
async deleteOneByUsername(username = 'johndoe', options = {},fns = () => {})
async deleteOneByCode(code = 'FT', options = {},fns = () => {})

async remove(query = {}, options = {}, fns = () => {})
async deleteMany(filter = {}, options = {},fns = () => {})
async distinct(field = 'string', query = {}, fns = () => {}, options = {})
async drop(options = {}, fns = () => {})
async dropIndex(index = 'string' || {}, fns = () => {})
async dropIndexes(index = 'string' || {},fns = () => {})
async find(query = {}, options = {}, fns = () => {})
async all(query = {}, options = {}, fns = () => {})
async findAndModify(document = {},fns = () => {})
async findOne(query = {}, options = {}, fns = () => {})


async findById(id = '645b9cf776b7fb46975316d9', options = {}, fns = () => {})
async findByEmail(email = 'ericson.weah@gmail.com', options = {}, fns = () => {})
async findByUsername(username = 'username', options = {}, fns = () => {})
async findByPhone(phone = '2852045167', options = {}, fns = () => {})
async findByCode(code = 'FT', options = {}, fns = () => {})
async firstByEmail(email = 'ericson.weah@gmail.com', options = {},fns = () => {})
async firstByUsername(username = 'username', options = {},fns = () => {})
async firstByPhone(phone = '2852045167', options = {},fns = () => {})
async firstByCode(code = 'FT', options = {}, fns = () => {})


async findOneAndDelete(filter = {}, options = {}, fns = () => {})
async findOneAndReplace(filter = {}, replacement = {},fns = () => {}, options = {})
async findOneAndUpdate(filter = {}, update = {}, fns = () => {}, options = {})
async getIndexes(fns = () => {})
async getShardDistribution(fns = () => {})
async hideIndex(index = 'string' || {},fns = () => {})
async insertOne(document = {}, options = {},fns = () => {})
async insert(document = {}, options = {},fns = () => {})
async create(document = {}, options = {}, fns = () => {})
async insertMany(documents = [], options = {}, fns = () => {})
async createMany(documents = [], options = {}, fns = () => {})
async isCapped(fns = () => {})
async latencyStats(options = { histograms: true }, fns = () => {})
async reIndex(fns = () => {})
async renameCollection(target = 'string', fns = () => {}, dropTarget = false) 
async replaceOne(filter = {}, replacement = {}, fns = () => {}, options = {}) 
async stats(options = { scale: 1, indexDetails: true, indexDetailsKey: {}, indexDetailsName: 'name' }, fns = () => {})
async storageSize(fns = () => {})
async totalIndexSize(fns = () => {})
async totalSize(fns = () => {})
async unhideIndex(index = 'string' || {}, fns = () => {})
async updateOne(query = {}, update = {}, options = {}, fns = () => {})
async update(query = {}, update = {}, options = {}, fns = () => {}) 
async updateMany(query = {}, update = {},options = {}, fns = () => {}) 
async watch(pipeline = [], options = {}, fns = () => {})
async validate(document = { full: true, repair: true },fns = () => {})
async ensureIndex(keys = {}, options = {}, commitQuorum = 1 || 'string', fns = () => {}) 
async estimatedDocumentCount(options = {}, fns = () => {}) 

async lastById(id="645b9cf776b7fb46975316d9", fns = () => {}, options = { sort: {_id: -1}, projection: {}})
async lastByEmail(email = 'ericson.weah@gmail.com',  fns = () => {}, options = { sort: {_id: -1}, projection: {}})
async lastByToken(token = '645b9cf776b7fb46975316d9', fns = () => {}, options = { sort: {_id: -1}, projection: {}})  
async lastByPhone(phone = '2852045167',  fns = () => {}, options = { sort: {_id: -1}, projection: {}})
async lastByUsername(username = 'username', fns = () => {}, options = { sort: {_id: -1}, projection: {}}) 
async lastByCode(code = 'FT', fns = () => {}, options = { sort: {_id: -1}, projection: {}})
async lastByFirstname(firstname = 'firstname', fns = () => {}, options = { sort: {_id: -1}, projection: {}}) 
async lastByLastname(lastname = 'lastname',  fns = () => {}, options = { sort: {_id: -1}, projection: {}}) 
async lastByName(name = 'name', fns = () => {}, options = { sort: {_id: -1}, projection: {}})


objectId(string = '6476fe3e6e636c2f079eca69')
async saveFile(filePath, fileName)
async createManyFromJsonFile(path, options, fn = () => {})
async createOneFromJsonFile(path, options, fn = () => {})
async insertManyFromJsonFile(path, options, fn = () => {})
async insertOneFromJsonFile(path, options, fn = () => {})

```




#### Some available DB instance methods 
```javascript

const Model = require('@mongodb-model/model');
const {DB} = new Model();

// The following functions are available on db, the DB instance, as methods.
// The majority of them, especially the ones with name very similar to the Mongodb native driver methods, are actually the corresponding 
// mongodb native driver methods. In other words, they take the exact same arguments as the corresponding  native mongodb driver methods with the addtional fns function: the optional callback function.


// Note that the callback function (fns) comes last (the last parameter or comes right after the second parameter )

async aggregate(options = { collection: 1, pipeline: [], explain: true, allowDiskUse: true, cursor: {}, maxTimeMS: 0, bypassDocumentValidation: true, readConcern: {}, collation: {}, hint: {} | '', comment: '', writeConcern: {}, let: {} }, fns = () => {})

async count(options = { collection: this.collection, query: {}, limit: 1, skip: 1, hint: '' | {}, readConcern: {}, collation: {}, comment: '' },fns = () => { })
async buildInfo(options = {}, fns = () => { })
async listDatabases(options = { listDatabases: 1 }, fns = () => {})
async serverInfo(options = { serverInfo: 1 }, fns = () => {})
async ping(options = { ping: 1 }, fns = () => { })
async serverStatus(options = { serverStatus: 1 }, fns = () => {})

```



#### Basic Schema Structure
```javascript
'use strict';
/*
|--------------------------------------------------------------------------
| articles Migration
|--------------------------------------------------------------------------
|
| Here we you may add more options (keys) to your schema.
| There is nothing new here: this is the exact same schema validation as the native mongodb schema validation.
| For more information on mongodb schema validation please visit https://www.mongodb.com/docs/manual/core/schema-validation/specify-json-schema/
|
|
*/

module.exports = {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          title: "Articles Object Validation",
          required: ['name'],
          properties: {
             name: {
                bsonType: "string",
                description: "'name' must be a string and is required"
             },
             created_at: {
                bsonType: "date",
                description: "'created_at' must be a date"
             },
             updated_at: {
                bsonType: "date",
                description: "'updated_at' must be a date"
             },
          }
       }
    }
 };

```
#### Basic Model Structure
```javascript
'use strict';

const Model = require('@mongodb-model/model');

/*
|--------------------------------------------------------------------------------
| User Model
|--------------------------------------------------------------------------------
|
| User extends the base model (Model) class and thus has everything
| the base model has including all the basic CRUD methods or operations.
|
|
*/

                                                        
class User extends Model{
                                                        
    /*
    |----------------------------------------------------------------------------------
    |                                   constructor
    |----------------------------------------------------------------------------------
    |
    | dbOptions: default database options: collection, database url, and database name.
    | options: default model options: any other option  for the model.
    |
    |
    */

    constructor(dbOptions = {collection: 'users', url: 'mongodb://localhost:27017', db: 'my_app'},...options){
                                                           
    /*
    |-------------------------------------------------------------------------------------
    |                                       super
    |-------------------------------------------------------------------------------------
    |
    | dbOptions: default database options: collection, database url, and database name.
    |
    |
    */
                                                        
    super(dbOptions);
                                                        
    /*
    |--------------------------------------------------------------------------------------
    | default database options: in case dbOptions is set but collection and url 
    | keys on the dbOptions are not provided.
    |--------------------------------------------------------------------------------------
    |
    */
                                                        
    if(!this['hasOwnProperty']['collection']) this.collection = 'users';
    if(!this['hasOwnProperty']['url']) this.url = 'mongodb://localhost:27017';
    if(!this['hasOwnProperty']['faker_url']) this.faker_url = 'https://jsonplaceholder.typicode.com/';
                                                        
    /*
    |---------------------------------------------------------------------------------------
    |                                      model options
    |---------------------------------------------------------------------------------------
    | Any other optional options passed to the model.
    |
    */
    
    options.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach(key => {
                if(!this[key]) this[key] = option[key];
            })
        }
    })}
                                                        
    /*
    |---------------------------------------------------------------------------------------
    |                   Bellow, you may add properties and methods to your model. 
    |---------------------------------------------------------------------------------------
    |
    */
                                                        
                                                        
    /**
    * @name sayHello
    * @function
    *
    * @param {Object|String} toMyProject Project name or project object.
    *
    * @description says hello to my project
    *
    * @return does not return anything
    *
    */
                                                        
    async sayHello(toMyProject) {
        console.log('Hello there', toMyProject, '! I understand you are the new wonderful kid in the neighborhood!');
    }
                                                        
}
                                                        
                                                        
/*
|-----------------------------------------------------------------------------------------------
|                                       exports model 
|-----------------------------------------------------------------------------------------------
|
*/

module.exports = User;
```
#### CLI screenshot (terminal)

![cli](https://www.mongodb-model.com/frontend/img/cli/cli-terminal-screenshot.png "Model CLI")

#### Official Website
[https://www.mongodb-model.com](https://www.mongodb-model.com)

<!-- #### Author's Info


