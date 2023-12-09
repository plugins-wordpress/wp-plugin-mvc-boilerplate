'use strict';
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

const Model = require('../src/modules/model');

class SampleModel extends Model{

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
    constructor(dbOptions = {collection: 'samples', url: 'mongodb+srv://ericsonweah:OMo2n4vXeeP40doA@nodecraftsman.yyggxpo.mongodb.net/?retryWrites=true&w=majority', db: 'nodecraftsman'},...options){
   
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

    if(!this['hasOwnProperty']['collection']) this.collection = 'samples';
    if(!this['hasOwnProperty']['url']) this.url = 'mongodb+srv://ericsonweah:OMo2n4vXeeP40doA@nodecraftsman.yyggxpo.mongodb.net/?retryWrites=true&w=majority';
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
        })
    }

    /*
    |---------------------------------------------------------------------------------------
    |                   Bellow, you may add properties and methods to your model. 
    |---------------------------------------------------------------------------------------
    |
    */

 }


 /*
 |-----------------------------------------------------------------------------------------------
 |                                       exports model 
 |-----------------------------------------------------------------------------------------------
 |
 */
 module.exports = SampleModel;
