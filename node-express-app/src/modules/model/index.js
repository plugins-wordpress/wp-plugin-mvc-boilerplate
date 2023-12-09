// Copyright (c) 2023 Ericson S. Weah <ericsonweah.dev>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

"use strict";

/**
 * @module Model
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Model class
 */

require('dotenv').config();
const collectionMethod = require('./modules/collection');
const dbMethod = require('./modules/database');
const admin = require('./modules/admin');
const streamer = require('./modules/streamer');
const DB = require('./modules/db');
const passport = require('passport');
const bcrypt = require('bcrypt');

const { ObjectId } = require('mongodb');
const { isArray, isValid, isValidObjectId, isObject, isString, isNumber, fileExists, getDatabaseNameFromUrl, isUrlLocalhost} = require('./modules/helpers')();

/**
 * Represents a Model class that extends the base class. */
class Model extends require("./modules/base") {
  /**
   * Constructs a new instance of the Model class.
   *
   * @param {...Object} arrayOfObjects - Additional objects containing options to be assigned to the model.
   */
  constructor(...arrayOfObjects) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    // Assign additional options to the model
    arrayOfObjects.forEach(option => {
      if (Object.keys(option).length > 0) {
        Object.keys(option).forEach((key) => {
          if (!this[key]) this[key] = option[key];
        });
      }
    });

    // Auto bind methods of the model
    this.autobind(Model);

    // Auto invoke methods of the model
    this.autoinvoker(Model);

    // Add methods from other classes if they do not already exist
    //this.methodizer();
    // Example: this.methodizeProperty(require('./src/db/query')());

    // Set the maximum number of event listeners to infinity
    this.setMaxListeners(Infinity);
  }

  /**
 * Dynamically creates and executes a MongoDB collection method based on the provided method name and arguments.
 *
 * @param {string} method - The name of the MongoDB collection method to execute.
 * @param {...any} args - Additional arguments to be passed to the specified collection method.
 * @returns {any} - The result of executing the specified MongoDB collection method with the provided arguments.
 */
createFn(method = 'find', ...args) {
  // Call the specified MongoDB collection method with the provided arguments and return the result
  // The 'this[method]' expression allows accessing the collection method using the method name stored in the 'method' variable
  return this[method](...args);
}

/**
 * Dynamically creates and executes a MongoDB collection method based on the provided method name and arguments.
 *
 * @param {string} method - The name of the MongoDB collection method to execute.
 * @param {boolean} toArray - A flag indicating whether the method should return the result as an array.
 * @param {...any} args - Additional arguments to be passed to the specified collection method.
 * @returns {any} - The result of executing the specified MongoDB collection method with the provided arguments.
 */
makeFn(method = 'find', toArray = false, ...args) {
  // Obtain the collectionMethod function with the current context (this) and the 'countDocuments' operation flag
  let fn;
  const fns = args.find(el => typeof (el) === 'function');

  // Determine the correct collection method based on the 'toArray' flag and the presence of callback function 'fns'
  if (toArray) {
    if (fns && fns !== undefined) {
      fn = collectionMethod(this)(`${method}`, fns, toArray);
    } else {
      fn = collectionMethod(this)(`${method}`);
    }
  } else {
    if (fns && fns !== undefined) {
      fn = collectionMethod(this)(`${method}`, fns);
    } else {
      fn = collectionMethod(this)(`${method}`);
    }
  }

  // Invoke the obtained function passing the arguments, and return the result
  return fn(...args);
}


  /**
 * Fetches data from a specified URL and performs operations based on the received data.
 *
 * @param {string} [collection=this.collection] - The name of the collection.
 * @param {string} [faker_url=this.faker_url] - The URL to fetch the data from.
 * @returns {void}
 */
fake(collection = this.collection, faker_url = this.faker_url) {
  // Make a fetch request to the specified URL
  fetch(faker_url + collection)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      // Check if the received data is an array
      if (isArray(data)) {
        // Call the 'insertMany' method with the data array
        this.insertMany(data);
      }
      // Check if the received data is an object
      if (isObject(data)) {
        // Call the 'insertOne' method with the data object
        this.insertOne(data);
      }
    })
    .catch(err => {
      // Log any errors to the console
      console.error(err);
    });
}

  /**
 * Creates a collection with the given name and options.
 *
 * @param {string} [name='users'] - The name of the collection to create.
 * @param {Object} [options={}] - The options for creating the collection.
 * @returns {Promise} - A Promise that resolves to the created collection.
 */
    async createCollection(name = 'users', options = {}, fns = () => { }) {
      // Check if the name is provided and is a string
      if (name && !isString(name)) return 'Invalid name';

      // Check if the options are provided and are an object
      if (options && !isObject(options)) return 'Invalid options';

      const fn = dbMethod(this)('createCollection', fns);

      return fn(name, options);
  }

  /**
 * Asynchronously performs an aggregation operation on the collection using the specified pipeline and options.
 * 
 * @param {Array} [pipeline=[]] - An array of pipeline stages for the aggregation operation.
 * @param {Object} [options={}] - Additional options for the aggregation operation.
 * @returns {Promise<any>|string} - A promise that resolves to the result of the aggregation or an error message.
 */
async aggregate(pipeline = [], options = {}, fns = () => {}) {
  // Check if the pipeline is provided and is an array
  if (pipeline && !isArray(pipeline)) return 'Invalid pipeline';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'aggregate' operation flag set to true
  const fn = collectionMethod (this)('aggregate', fns, true);

  // Invoke the obtained function passing the pipeline and options, and return the result
  return fn(pipeline, options);
}

  /**
 * Asynchronously performs a bulk write operation on the collection using the specified operations and options.
 * 
 * @param {Array} [operations=[]] - An array of write operations for the bulk write operation.
 * @param {Object} [options={}] - Additional options for the bulk write operation.
 * @returns {Promise<any>|string} - A promise that resolves to the result of the bulk write operation or an error message.
 */
  async bulkwrite(operations = [], options = {}, fns = () => {}) {
    // Check if the operations are provided and are an array
    if (operations && !isArray(operations)) return 'Invalid operations';
    
  
    // Check if the options are provided and are an object
    if (options && !isObject(options)) return 'Invalid options';
    
  
    // Obtain the collectionMethod  function with the current context (this) and the 'bulkwrite' operation flag
    const fn = collectionMethod (this)('bulkwrite', fns);
  
    // Invoke the obtained function passing the operations and options, and return the result
    return fn(operations, options);
  }

  /**
 * Asynchronously retrieves the count of documents in the collection that match the specified query and options.
 * 
 * @param {Object} [query={}] - The query object to filter the documents.
 * @param {Object} [options={}] - Additional options for the count operation.
 * @returns {Promise<number>|string} - A promise that resolves to the count of matching documents or an error message.
 */
async count(query = {}, options = {}, fns = () => {}) {
  // Check if the query is provided and is an object
  if (query && !isObject(query)) return 'Invalid query';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'count' operation flag
  const fn = collectionMethod (this)('count', fns, false, 'count');

  // Invoke the obtained function passing the query and options, and return the result
  return fn(query, options);
}

 /**
 * Asynchronously retrieves the count of documents in the collection that match the specified query and options.
 * 
 * @param {Object} [query={}] - The query object to filter the documents.
 * @param {Object} [options={}] - Additional options for the countDocuments operation.
 * @returns {Promise<number>|string} - A promise that resolves to the count of matching documents or an error message.
 */
 async countDocuments(query = {}, options = {},fns = () => {}) {
  // Check if the query is provided and is an object
  if (query && !isObject(query)) return 'Invalid query';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'countDocuments' operation flag
  const fn = collectionMethod (this)('countDocuments', fns, false, 'countDocuments');

  // Invoke the obtained function passing the query and options, and return the result
  return fn(query, options);
}

 /**
 * Asynchronously deletes multiple documents from the collection that match the specified filter and options.
 * 
 * @param {Object} [filter={}] - The filter object to determine the documents to delete.
 * @param {Object} [options={}] - Additional options for the deleteMany operation.
 * @returns {Promise<DeleteResult>|string} - A promise that resolves to the delete result or an error message.
 */
 async deleteMany(filter = {}, options = {},fns = () => {}) {
  // Check if the filter is provided and is an object
  if (filter && !isObject(filter)) return 'Invalid filter';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'deleteMany' operation flag
  const fn = collectionMethod (this)('deleteMany', fns, false, 'deleteMany');

  // Invoke the obtained function passing the filter and options, and return the result
  return fn(filter, options);
}

/**
 * Asynchronously deletes a single document from the collection that matches the specified filter and options.
 * 
 * @param {Object} [filter={}] - The filter object to determine the document to delete.
 * @param {Object} [options={}] - Additional options for the deleteOne operation.
 * @returns {Promise<DeleteResult>|string} - A promise that resolves to the delete result or an error message.
 */
async deleteOne(filter = {}, options = {},fns = () => {}) {
  // Check if the filter is provided and is an object
  if (filter && !isObject(filter)) return 'Invalid filter';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'deleteOne' operation flag
  const fn = collectionMethod (this)('deleteOne', fns, false, 'deleteOne');

  // Invoke the obtained function passing the filter and options, and return the result
  return fn(filter, options);
}
/**
 * Asynchronously retrieves the distinct values for a field in the collection that match the specified query and options.
 * 
 * @param {string} [field='string'] - The field to retrieve distinct values from.
 * @param {Object} [query={}] - The query object to filter the documents.
 * @param {Object} [options={}] - Additional options for the distinct operation.
 * @returns {Promise<Array>|string} - A promise that resolves to an array of distinct values or an error message.
 */
async distinct(field = 'string', query = {}, fns = () => {}, projection = {}) {
  // Check if the field is provided and is a string
  if (field && !isString(field)) return 'Invalid field';
  

  // Check if the query is provided and is an object
  if (query && !isObject(query)) return 'Invalid query';
  

  // Check if the options are provided and are an object
  if (projection && !isObject(projection)) return 'Invalid projection';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'distinct' operation flag
  const fn = collectionMethod (this)('distinct', fns);

  // Invoke the obtained function passing the field, query, and options, and return the result
  return fn(field, query, projection);
}

async estimatedDocumentCount(options = {}, fns = () => { }) {

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';

  // Obtain the collectionMethod  function with the current context (this) and the 'estimatedDocumentCount' operation flag
  const fn = collectionMethod(this)('estimatedDocumentCount', fns, false, 'estimatedDocumentCount');

  // Invoke the obtained function passing the query and options, and return the result
  return fn(query, options);
}

/**
 * Asynchronously finds and retrieves documents from the collection based on the specified query, projection, and options.
 * 
 * @param {Object} [query={}] - The query object to filter the documents.
 * @param {Object} [projection={}] - The projection object to specify the fields to include or exclude.
 * @param {Object} [options={}] - Additional options for the find operation.
 * @returns {Promise<Cursor>|string} - A promise that resolves to a cursor or an error message.
 */
async find(query = {}, options = {}, fns = () => {}) {
  // Check if the query is provided and is an object
  if (query && !isObject(query)) return 'Invalid query';
  

  // Check if the options is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'find' operation flag
  const fn = collectionMethod(this)('find', fns, true);

  // Invoke the obtained function passing the query, options, and options, and return the result
  return fn(query, options);
}

/**
 * Asynchronously finds a document and modifies it in the collection based on the specified document.
 * 
 * @param {Object} [document={}] - The document object containing the update operations.
 * @returns {Promise<Document>|string} - A promise that resolves to the modified document or an error message.
 */
async findAndModify(document = {},fns = () => {}) {
  // Check if the document is provided and is an object
  if (document && !isObject(document)) return 'Invalid document';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'findAndModify' operation flag
  const fn = collectionMethod (this)('findAndModify',fns);

  // Invoke the obtained function passing the document, and return the result
  return fn(document);
}

/**
 * Asynchronously finds and retrieves a single document from the collection based on the specified query, projection, and options.
 * 
 * @param {Object} [query={}] - The query object to filter the documents.
 * @param {Object} [projection={}] - The projection object to specify the fields to include or exclude.
 * @returns {Promise<Document>|string} - A promise that resolves to the found document or an error message.
 */
async findOne(query = {}, options = {}, fns = () => {}) {
  // Check if the query is provided and is an object
  if (query && !isObject(query)) return 'Invalid query';
  

  // Check if the options is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // // Check if the options are provided and are an object
  // if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'findOne' operation flag
  const fn = collectionMethod (this)('findOne', fns, false, 'findOne');

  // Invoke the obtained function passing the query, options, and options, and return the result
  return fn(query, options);
}

/**
 * Asynchronously renames the collection to the specified target name.
 * 
 * @param {string} [target='string'] - The new name for the collection.
 * @param {boolean} [dropTarget=false] - Whether to drop the target collection if it already exists.
 * @returns {Promise<string>|string} - A promise that resolves to a success message or an error message.
 */
async renameCollection(target = 'string', fns = () => {}, dropTarget = false) {
  // Check if the target name is provided and is a string
  if (target && typeof target !== 'string') return target;
  

  // Check if the dropTarget flag is provided and is a boolean
  if (dropTarget && typeof dropTarget !== 'boolean') return dropTarget;
  

  // Obtain the collectionMethod  function with the current context (this) and the 'renameCollection' operation flag
  const fn = collectionMethod (this)('renameCollection', fns);

  // Invoke the obtained function passing the target name and dropTarget flag, and return the result
  return fn(target, dropTarget);
}

/**
 * Asynchronously finds and deletes a document from the collection based on the specified filter and options.
 * 
 * @param {Object} [filter={}] - The filter object to match the document to delete.
 * @param {Object} [options={}] - Additional options for the findOneAndDelete operation.
 * @returns {Promise<Document>|string} - A promise that resolves to the deleted document or an error message.
 */
async findOneAndDelete(filter = {}, options = {}, fns = () => {}) {
  // Check if the filter is provided and is an object
  if (filter && !isObject(filter)) return 'Invalid filter';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'findOneAndDelete' operation flag
  const fn = collectionMethod (this)('findOneAndDelete', fns);

  // Invoke the obtained function passing the filter and options, and return the result
  return fn(filter, options);
}
/**
 * Asynchronously finds a document based on the specified filter, replaces it with the specified replacement, and returns the original document or the modified document.
 * 
 * @param {Object} [filter={}] - The filter object to match the document to replace.
 * @param {Object} [replacement={}] - The replacement object with the updated values for the document.
 * @param {Object} [options={}] - Additional options for the findOneAndReplace operation.
 * @returns {Promise<Document>|string} - A promise that resolves to the original or modified document or an error message.
 */
async findOneAndReplace(filter = {}, replacement = {},fns = () => {}, options = {}) {
  // Check if the filter is provided and is an object
  if (filter && !isObject(filter)) return 'Invalid filter';
  

  // Check if the replacement is provided and is an object
  if (replacement && !isObject(replacement)) return 'Invalid replacement input';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'findOneAndReplace' operation flag
  const fn = collectionMethod (this)('findOneAndReplace', fns);

  // Invoke the obtained function passing the filter, replacement, and options, and return the result
  return fn(filter, replacement, options);
}

/**
 * Asynchronously finds a document based on the specified filter, updates it with the specified update, and returns the original document or the modified document.
 * 
 * @param {Object} [filter={}] - The filter object to match the document to update.
 * @param {Object} [update={}] - The update object with the fields and values to modify in the document.
 * @param {Object} [options={}] - Additional options for the findOneAndUpdate operation.
 * @returns {Promise<Document>|string} - A promise that resolves to the original or modified document or an error message.
 */
async findOneAndUpdate(filter = {}, update = {}, fns = () => {}, options = {}) {
  // Check if the filter is provided and is an object
  if (filter && !isObject(filter)) return 'Invalid filter';
  

  // Check if the update is provided and is an object
  if (update && !isObject(update)) return 'Invalid update input';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'findOneAndUpdate' operation flag
  const fn = collectionMethod (this)('findOneAndUpdate', fns);

  // Invoke the obtained function passing the filter, update, and options, and return the result
  return fn(filter, update, options);
}
/**
 * Asynchronously inserts a single document into the collection.
 * 
 * @param {Object} [document={}] - The document to insert.
 * @param {Object} [options={}] - Additional options for the insertOne operation.
 * @returns {Promise<Document>|string} - A promise that resolves to the inserted document or an error message.
 */
async insert(document = {}, options = {},fns = () => {}) {
  // Check if the document is provided and is an object
  if (document && !isObject(document)) return 'Invalid document';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'insertOne' operation flag
  const fn = collectionMethod (this)('insertOne', fns, false, 'insert');

  // Invoke the obtained function passing the document and options, and return the result
  return fn(document, options);
}

/**
 * Asynchronously inserts multiple documents into the collection.
 * 
 * @param {Array} [documents=[]] - The array of documents to insert.
 * @param {Object} [options={}] - Additional options for the insertMany operation.
 * @returns {Promise<Array<Document>>|string} - A promise that resolves to an array of inserted documents or an error message.
 */
async insertMany(documents = [], options = {}, fns = () => {}) {
  // Check if the documents array is provided and is an array
  if (documents && !isArray(documents)) return 'Invalid input documents';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'insertMany' operation flag
  const fn = collectionMethod (this)('insertMany', fns, false, 'insertMany');

  // Invoke the obtained function passing the documents array and options, and return the result
  return fn(documents, options);
}

/**
 * Asynchronously inserts a single document into the collection.
 * 
 * @param {Object} [document={}] - The document to insert.
 * @param {Object} [options={}] - Additional options for the insertOne operation.
 * @returns {Promise<Document>|string} - A promise that resolves to the inserted document or an error message.
 */
async insertOne(document = {}, options = {},fns = () => {}) {
  // Check if the document is provided and is an object
  if (document && !isObject(document)) return 'Invalid document';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'insertOne' operation flag
  const fn = collectionMethod (this)('insertOne', fns, false, 'insertOne');

  // Invoke the obtained function passing the document and options, and return the result
  return fn(document, options);
}
/**
 * Asynchronously checks if the collection is a capped collection.
 * 
 * @returns {Promise<boolean>|string} - A promise that resolves to a boolean value indicating if the collection is capped or an error message.
 */
async isCapped(fns = () => {}) {
  // Obtain the collectionMethod  function with the current context (this) and the 'isCapped' operation flag
  const fn = collectionMethod (this)('isCapped', fns);

  // Invoke the obtained function and return the result
  return fn();
}

/**
 * Asynchronously removes document(s) from the collection that match the specified query and options.
 * 
 * @param {Object} [query={}] - The query object to determine the documents to remove.
 * @param {Object} [options={justOne: true}] - Additional options for the remove operation.
 * @returns {Promise<DeleteResult>|string} - A promise that resolves to the remove result or an error message.
 */
async remove(query = {}, options = {}, fns = () => {}) {
  // Check if the query is provided and is an object
  if (query && !isObject(query)) return 'Invalid query';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'deleteOne' operation flag
  const fn = collectionMethod (this)('deleteOne', fns, false, 'remove');

  // Invoke the obtained function passing the query and options, and return the result
  return fn(query, options);
}
/**
 * Asynchronously replaces a single document in the collection that matches the filter.
 * 
 * @param {Object} [filter={}] - The filter to match documents for replacement.
 * @param {Object} [replacement={}] - The document to replace matching documents with.
 * @param {Object} [options={}] - Additional options for the replaceOne operation.
 * @returns {Promise<Document>|string} - A promise that resolves to the replaced document or an error message.
 */
async replaceOne(filter = {}, replacement = {}, fns = () => {}, options = {}) {
  // Check if the filter is provided and is an object
  if (filter && !isObject(filter)) return 'Invalid filter';
  

  // Check if the replacement is provided and is an object
  if (replacement && !isObject(replacement)) return 'Invalid replacement input';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'replaceOne' operation flag
  const fn = collectionMethod (this)('replaceOne', fns);

  // Invoke the obtained function passing the filter, replacement, and options, and return the result
  return fn(filter, replacement, options);
}
/**
 * Asynchronously updates multiple documents in the collection that match the query.
 * 
 * @param {Object} [query={}] - The query to match documents for updating.
 * @param {Object} [update={}] - The update to apply to matching documents.
 * @param {Object} [options={}] - Additional options for the update operation.
 * @returns {Promise<number>|string} - A promise that resolves to the number of modified documents or an error message.
 */
async update(query = {}, update = {}, options = {}, fns = () => {}) {
  // Check if the query is provided and is an object
  if (query && !isObject(query)) return 'Invalid query';
  

  // Check if the update is provided and is an object
  if (update && !isObject(update)) return 'Invalid update input';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'updateOne' operation flag
  const fn = collectionMethod (this)('updateOne', fns, false, 'update');

  // Invoke the obtained function passing the query, update, and options, and return the result
  return fn(query,{$set: update} , options);
}
/**
 * Asynchronously updates multiple documents in the collection that match the query.
 * 
 * @param {Object} [query={}] - The query to match documents for updating.
 * @param {Object} [update={}] - The update to apply to matching documents.
 * @param {Object} [options={}] - Additional options for the updateMany operation.
 * @returns {Promise<number>|string} - A promise that resolves to the number of modified documents or an error message.
 */
async updateMany(query = {}, update = {},options = {}, fns = () => {}) {
  // Check if the query is provided and is an object
  if (query && !isObject(query)) return 'Invalid query';
  

  // Check if the update is provided and is an object
  if (update && !isObject(update)) return 'Invalid update input';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'updateMany' operation flag
  const fn = collectionMethod (this)('updateMany', fns, false, 'updateMany');

  // Invoke the obtained function passing the query, update, and options, and return the result
  return fn(query, {$set: update}, options);
}
/**
 * Asynchronously updates a single document in the collection that matches the query.
 * 
 * @param {Object} [query={}] - The query to match documents for updating.
 * @param {Object} [update={}] - The update to apply to matching documents.
 * @param {Object} [options={}] - Additional options for the updateOne operation.
 * @returns {Promise<number>|string} - A promise that resolves to the number of modified documents or an error message.
 */
async updateOne(query = {}, update = {}, options = {}, fns = () => {}) {
  // Check if the query is provided and is an object
  if (query && !isObject(query)) return 'Invalid query';
  

  // Check if the update is provided and is an object
  if (update && !isObject(update)) return 'Invalid update input';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'updateOne' operation flag
  const fn = collectionMethod (this)('updateOne', fns, false, 'updateOne');

  // Invoke the obtained function passing the query, update, and options, and return the result
  return fn(query, {$set: update}, options);
}

async compactStructuredEncryptionData(fns = () => { }) {

  // Obtain the collectionMethod  function with the current context (this) and the 'compactStructuredEncryptionData' operation flag
  const fn = collectionMethod(this)('compactStructuredEncryptionData', fns, false, 'compactStructuredEncryptionData');

  // Invoke the obtained function passing the query and options, and return the result
  return fn(query, options);
}
async convertToCapped(size = 10000, fns = () => { }) {
  
  // Obtain the collectionMethod  function with the current context (this) and the 'convertToCapped' operation flag
  const fn = collectionMethod(this)('convertToCapped', fns, false, 'convertToCapped');

  // Invoke the obtained function passing the query and options, and return the result
  return fn(query, options);
}
 /**
 * Asynchronously creates multiple indexes in the collection with the specified key patterns and options.
 * 
 * @param {Array} [keyPatterns=[]] - An array of key pattern objects specifying the fields and their index types.
 * @param {Object} [options={}] - Additional options for creating the indexes.
 * @param {number|string} [commitQuorum=1] - The commit quorum for the index creation operation.
 * @returns {Promise<string>|string} - A promise that resolves to a success message or an error message.
 */
 async createIndexes(keyPatterns = [], options = {},fns = () => {}, commitQuorum = 1 || 'string') {
  // Check if the key patterns are provided and are an array
  if (keyPatterns && !isArray(keyPatterns)) return 'Invalid key pattern';
  

  // Check if the commitQuorum is provided and is a number or a string
  if (commitQuorum && !isNumber(commitQuorum) && !isString(commitQuorum)) return 'Invalid commit quorum';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'createIndexes' operation flag
  const fn = collectionMethod (this)('createIndexes', fns);

  // Invoke the obtained function passing the key patterns, options, and commitQuorum, and return the result
  return fn(keyPatterns, options, commitQuorum);
}

/**
 * Asynchronously creates an index in the collection with the specified keys and options.
 * 
 * @param {Object} [keys={}] - The keys object specifying the fields and their index types.
 * @param {Object} [options={}] - Additional options for creating the index.
 * @param {number|string} [commitQuorum=1] - The commit quorum for the index creation operation.
 * @returns {Promise<string>|string} - A promise that resolves to a success message or an error message.
 */
async createIndex(keys = {}, options = {}, fns = () => {}, commitQuorum = 1 || 'string') {
  // Check if the keys are provided and are an object
  if (keys && !isObject(keys)) return 'Invalid keys';
  

  // Check if the commitQuorum is provided and is a number or a string
  if (commitQuorum && !isNumber(commitQuorum) && !isString(commitQuorum)) return 'Invalid commit quorum';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'createIndex' operation flag
  const fn = collectionMethod (this)('createIndex',fns);

  // Invoke the obtained function passing the keys, options, and commitQuorum, and return the result
  return fn(keys, options, commitQuorum);
}
  /*
    Removed in 5.0
    ensureIndex() has been replaced by createIndex().
  */
/**
 * Asynchronously ensures the creation of an index in the collection.
 * 
 * @param {Object} [keys={}] - The keys for the index.
 * @param {Object} [options={}] - Additional options for the index creation.
 * @param {number|string} [commitQuorum=1 || 'string'] - The commit quorum value.
 * @returns {Promise<string>|string} - A promise that resolves to a success message or an error message.
 */
async ensureIndex(keys = {}, options = {}, commitQuorum = 1 || 'string', fns = () => {}) {
  // Check if the keys are provided and are an object
  if (keys && !isObject(keys)) return 'Invalid keys';
  

  // Check if the commitQuorum is provided and is either a number or a string
  if (commitQuorum && !isNumber(commitQuorum) && !isString(commitQuorum)) return commitQuorum;
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'createIndex' operation flag
  const fn = collectionMethod (this)('createIndex', fns);

  // Invoke the obtained function passing the keys, options, and commitQuorum, and return the result
  return fn(keys, options, commitQuorum);
}

/**
 * Asynchronously retrieves the indexes of the collection.
 * 
 * @returns {Promise<Array>} - A promise that resolves to an array of index objects or an error message.
 */
async getIndexes(fns = () => {}) {
  // Obtain the collectionMethod  function with the current context (this) and the 'getIndexes' operation flag
  const fn = collectionMethod (this)('getIndexes', fns);

  // Invoke the obtained function and return the result
  return fn();
}
async getIndexSpecs( fns = () => { }) {

  // Obtain the collectionMethod  function with the current context (this) and the 'getIndexSpecs' operation flag
  const fn = collectionMethod(this)('getIndexSpecs', fns, false, 'getIndexSpecs');

  // Invoke the obtained function passing the query and options, and return the result
  return fn(query, options);
}
async getIndices(fns = () => { }) {

  // Obtain the collectionMethod  function with the current context (this) and the 'getIndices' operation flag
  const fn = collectionMethod(this)('getIndices', fns, false, 'getIndices');

  // Invoke the obtained function passing the query and options, and return the result
  return fn(query, options);
}
async getIndexKeys(fns = () => { }) {
  // Obtain the collectionMethod  function with the current context (this) and the 'getIndexKeys' operation flag
  const fn = collectionMethod(this)('getIndexKeys', fns, false, 'getIndexKeys');

  // Invoke the obtained function passing the query and options, and return the result
  return fn(query, options);
}
/**
 * Asynchronously drops the specified index or indexes from the collection.
 * 
 * @param {string|Object} [index='string' or {}] - The index name or index specification object to drop.
 * @returns {Promise<boolean>|string} - A promise that resolves to true if the index or indexes are dropped successfully, or an error message.
 */
async dropIndexes(index = 'string' || {},fns = () => {}) {
  // Check if the index is provided and is an object or a string
  if (index && !isObject(index) && !isString(index)) return 'Invalid index';

  // Obtain the collectionMethod  function with the current context (this) and the 'dropIndexes' operation flag
  const fn = collectionMethod (this)('dropIndexes', fns);

  // Invoke the obtained function passing the index, and return the result
  return fn(index);
}
/**
 * Asynchronously drops the specified index from the collection.
 * 
 * @param {string|Object} [index='string' or {}] - The index name or index specification object to drop.
 * @returns {Promise<boolean>|string} - A promise that resolves to true if the index is dropped successfully, or an error message.
 */
async dropIndex(index = 'string' || {}, fns = () => {}) {
  // Check if the index is provided and is an object or a string
  if (index && !isObject(index) && !isString(index)) return 'Invalid index';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'dropIndex' operation flag
  const fn = collectionMethod (this)('dropIndex', fns);

  // Invoke the obtained function passing the index, and return the result
  return fn(index);
}

/**
 * Asynchronously retrieves the total index size of the collection.
 * 
 * @returns {Promise<number>|string} - A promise that resolves to the total index size of the collection or an error message.
 */
async totalIndexSize(fns = () => {}) {
  // Obtain the collectionMethod  function with the current context (this) and the 'totalIndexSize' operation flag
  const fn = collectionMethod (this)('totalIndexSize', fns);

  // Invoke the obtained function and return the result
  return fn();
}

/**
 * Asynchronously performs a reindex operation on the collection.
 * 
 * @returns {Promise<string>|string} - A promise that resolves to a success message or an error message.
 */
async reIndex(fns = () => {}) {
  // Obtain the collectionMethod  function with the current context (this) and the 'reIndex' operation flag
  const fn = collectionMethod (this)('reIndex',fns);

  // Invoke the obtained function and return the result
  return fn();
}
async getDB( fns = () => { }) {

  // Obtain the collectionMethod  function with the current context (this) and the 'getDB' operation flag
  const fn = collectionMethod(this)('getDB', fns, false, 'getDB');

  // Invoke the obtained function passing the query and options, and return the result
  return fn();
}

async getMongo(fns = () => { }) {

  // Obtain the collectionMethod  function with the current context (this) and the 'getMongo' operation flag
  const fn = collectionMethod(this)('getMongo', fns, false, 'getMongo');

  // Invoke the obtained function passing the query and options, and return the result
  return fn(query, options);
}

async dataSize(options = {collection: this.collection, scale: 1024}, fns = () => { }) {
 
  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';

  const fn = dbMethod(this)('command', fns, false, 'dataSize');
  const dataSizeOptions = this.options(options, 'collStats', 'collection');
  return fn(dataSizeOptions);
}

async storageSize(options = {collection: this.collection, scale: 1024}, fns = () => { }) {
 

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';

  const fn = dbMethod(this)('command', fns, false, 'storageSize');
  const storageSizeOptions = this.options(options, 'collStats', 'collection');
  return fn(storageSizeOptions);
}

async collStats(options = {collection: this.collection, scale: 1024}, fns = () => { }) {
 
  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';

  const fn = dbMethod(this)('command', fns, false, 'collStats');
  const collStatsOptions = this.options(options, 'collStats', 'collection');
  return fn(collStatsOptions);
}


async totalSize(options = {collection: this.collection, scale: 1024}, fns = () => { }) {
 

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';

  const fn = dbMethod(this)('command', fns, false, 'totalSize');
  const totalSizeOptions = this.options(options, 'collStats', 'collection');
  return fn(totalSizeOptions);
}


options(options = {}, command = 'createUser', value = 'name', option = {}){
  for(let key in options){
     if(key === value){
         option[command] = options[key];
     }else{
         option[key] = options[key];
     }
  }
 return option
}

async drop(options = {writeConcern: {} } , fns = () => { }) {

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';

  // Obtain the collectionMethod  function with the current context (this) and the 'drop' operation flag
  const fn = collectionMethod(this)('drop', fns, false, 'drop');

  // Invoke the obtained function passing the query and options, and return the result
  return fn(options);
}

async exists(fns = () => { }) {

  // Check if the options are provided and are an object
  // if (options && !isObject(options)) return 'Invalid options';

  // Obtain the collectionMethod  function with the current context (this) and the 'exists' operation flag
  const fn = collectionMethod(this)('exists', fns, false, 'exists');

  // Invoke the obtained function passing the query and options, and return the result
  return fn();
}//Todo: refactor

async getFullName(fns = () => { }) {
  // Check if the query is provided and is an object
  // if (query && !isObject(query)) return 'Invalid query';

  // // Check if the options are provided and are an object
  // if (options && !isObject(options)) return 'Invalid options';

  // Obtain the collectionMethod  function with the current context (this) and the 'getFullName' operation flag
  const fn = collectionMethod(this)('getFullName', fns, false, 'getFullName');

  // Invoke the obtained function passing the query and options, and return the result
  return fn();
}//todo

async getName(query = {}, options = {}, fns = () => { }) {
  // Check if the query is provided and is an object
  if (query && !isObject(query)) return 'Invalid query';

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';

  // Obtain the collectionMethod  function with the current context (this) and the 'getName' operation flag
  const fn = collectionMethod(this)('getName', fns, false, 'getName');

  // Invoke the obtained function passing the query and options, and return the result
  return fn(query, options);
}// todo



async runCommand(command = 'find', options = {}, fns = () => { }) {
  // Check if the query is provided and is an object
  if (command && !isString(command)) return 'Invalid command';

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';

  // Obtain the collectionMethod  function with the current context (this) and the 'runCommand' operation flag
  const fn = collectionMethod(this)('command', fns, false, 'command');

  // Invoke the obtained function passing the query and options, and return the result
  return fn(command, options);
}//todo 

async explain(query = {}, options = {}, fns = () => { }) {
  // Check if the query is provided and is an object
  if (query && !isObject(query)) return 'Invalid query';

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';

  // Obtain the collectionMethod  function with the current context (this) and the 'explain' operation flag
  const fn = collectionMethod(this)('explain', fns, false, 'explain');

  // Invoke the obtained function passing the query and options, and return the result
  return fn(query, options);
}// todo


/**
 * Asynchronously retrieves statistics for the collection.
 * 
 * @param {Object} [options={ scale: 1, indexDetails: true, indexDetailsKey: {}, indexDetailsName: 'name' }] - Additional options for the stats operation.
 * @returns {Promise<Object>|string} - A promise that resolves to an object containing the collection statistics or an error message.
 */
async stats(options = { scale: 1, indexDetails: true, indexDetailsKey: {}, indexDetailsName: 'name' }, fns = () => {}) {
  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'stats' operation flag
  const fn = collectionMethod (this)('stats', fns);

  // Invoke the obtained function passing the options, and return the result
  return fn(options);
}

/**
 * Asynchronously retrieves latency statistics for the collection.
 * 
 * @param {Object} [options={ histograms: true }] - Additional options for the latencyStats operation.
 * @returns {Promise<Object>|string} - A promise that resolves to an object containing the latency statistics or an error message.
 */
async latencyStats(options = { histograms: true }, fns = () => {}) {
  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  
  // Obtain the collectionMethod  function with the current context (this) and the 'latencyStats' operation flag
  const fn = dbMethod (this)('latencyStats', fns);

  // Invoke the obtained function passing the options, and return the result
  return fn(options);
}// todo: collection[method] is not a function

async initializeOrderedBulkOp(fns = () => { }) {

  // Obtain the collectionMethod  function with the current context (this) and the 'initializeOrderedBulkOp' operation flag
  const fn = collectionMethod(this)('initializeOrderedBulkOp', fns, false, 'initializeOrderedBulkOp');

  // Invoke the obtained function passing the query and options, and return the result
  return fn();
}// todo: MongoClient must be connected to perform this operation


async getPlanCache( fns = () => { }) {

  // Obtain the collectionMethod  function with the current context (this) and the 'getPlanCache' operation flag
  const fn = collectionMethod(this)('getPlanCache', fns, false, 'getPlanCache');

  // Invoke the obtained function passing the query and options, and return the result
  return fn();
}//todo: collection[method] is not a function

async mapReduce(query = {}, options = {}, fns = () => { }) {
  // Check if the query is provided and is an object
  if (query && !isObject(query)) return 'Invalid query';

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';

  // Obtain the collectionMethod  function with the current context (this) and the 'mapReduce' operation flag
  const fn = collectionMethod(this)('mapReduce', fns, false, 'mapReduce');

  // Invoke the obtained function passing the query and options, and return the result
  return fn(query, options);
}

// async validate(options = {collection: this.collection, full: false, repair: false,  metadata: false}, fns = () => { }) {
 
//   // Check if the options are provided and are an object
//   if (options && !isObject(options)) return 'Invalid options';

//   const fn = dbMethod(this)('command', fns, false, 'validate');
//   const collStatsOptions = this.options(options, 'validate', 'collection');
//   return fn(collStatsOptions);
// }


    /**
     * Asynchronously validates a collection in the database using the 'validateCollection' command with the provided options.
     * 
     * @param {string} collection - The name of the collection to be validated. (Default: 'users')
     * @param {Object} options - The options for the 'validateCollection' command. (Default: { validateCollection: 1 })
     * @param {function} fns - A callback function that is executed after the 'validateCollection' command. (Default: ()=> {})
     * @returns {Promise<Object|string>} A Promise that resolves to the validation result or a string indicating an error.
     */
    async validate(collection = this.collection, options = { validateCollection: 1 }, fns = () => { }) {
      // Call the 'admin' function to get the 'validateCollection' command function
      const fn = admin(this)('validateCollection', fns);

      // Check if 'options' is not an object
      if (options && !isObject(options)) return 'Invalid options';

      // Execute the 'validateCollection' command and return the result
      return fn(collection, options);
  }

  async getShardVersion(query = {}, options = {}, fns = () => { }) {
    // Check if the query is provided and is an object
    if (query && !isObject(query)) return 'Invalid query';

    // Check if the options are provided and are an object
    if (options && !isObject(options)) return 'Invalid options';

    // Obtain the collectionMethod  function with the current context (this) and the 'getShardVersion' operation flag
    const fn = collectionMethod(this)('getShardVersion', fns, false, 'getShardVersion');

    // Invoke the obtained function passing the query and options, and return the result
    return fn(query, options);
}//todo: collection[method] is not a function

async getShardDistribution(query = {}, options = {}, fns = () => { }) {
  // Check if the query is provided and is an object
  if (query && !isObject(query)) return 'Invalid query';

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';

  // Obtain the collectionMethod  function with the current context (this) and the 'getShardDistribution' operation flag
  const fn = collectionMethod(this)('getShardDistribution', fns, false, 'getShardDistribution');

  // Invoke the obtained function passing the query and options, and return the result
  return fn(query, options);
}
//todo: collection[method] is not a function


/**
 * Asynchronously watches changes on a MongoDB collection using the provided pipeline and options.
 * If no pipeline is provided, an empty array will be used.
 * If no options are provided, an empty object will be used.
 * If invalid pipeline or options are provided, an error message will be returned.
 *
 * @param {Array} pipeline - The aggregation pipeline to use for watching changes.
 * @param {Object} options - Additional options to customize the watch operation.
 * @param {Function} fns - A callback function that will be executed when changes occur.
 * @returns {Promise} - A promise that resolves with the result of the watch operation.
 */
async watch(pipeline = [], options = {}, fns = () => { }) {
  // Check if the pipeline is provided and is an array
  if (pipeline && !Array.isArray(pipeline)) return 'Invalid pipeline';

  // Check if the options are provided and are an object
  if (options && typeof options !== 'object') return 'Invalid options';

  // Obtain the collectionMethod function with the current context (this) and the 'watch' operation flag
  // collectionMethod is a function used to create a method with specific behavior for a collection
  const fn = collectionMethod(this)('watch', fns, false, 'watch');

  // Invoke the obtained function passing the pipeline and options, and return the result
  return fn(pipeline, options);
}

/**
 * Asynchronously hides an index on the MongoDB collection using the provided options.
 * If no options are provided, the collection property will be used by default.
 * If invalid options are provided, an error message will be returned.
 *
 * @param {Object} options - Additional options to customize the hideIndex command.
 *                          The options object can include 'collection' property as the target collection.
 *                          Other properties specific to the 'hideIndex' command can also be included.
 * @param {Function} fns - A callback function that will be executed during the hideIndex command.
 * @returns {Promise} - A promise that resolves with the result of the hideIndex command.
 */
async hideIndex(options = {collection: this.collection}, fns = () => { }) {

  // Call the 'dbMethod' function to get the 'hideIndex' command function
  // dbMethod is a function used to create a method with specific behavior for a database command
  const fn = dbMethod(this)('command', fns, false, 'collMod');

  // Check if 'options' is not an object
  if (options && typeof options !== 'object') return 'Invalid options';

  // Extract 'hideIndex' specific options and create the hideIndexOptions object
  // The 'options' parameter is passed to this.options along with 'collMod' and 'collection' flags to extract relevant options.
  const hideIndexOptions = this.options(options, 'collMod', 'collection');

  // Execute the 'hideIndex' command and return the result
  return fn(hideIndexOptions);
}


/**
 * Asynchronously unhides a hidden index on the MongoDB collection using the provided options.
 * If no options are provided, the collection property will be used by default.
 * If invalid options are provided, an error message will be returned.
 *
 * @param {Object} options - Additional options to customize the unhideIndex command.
 *                           The options object can include 'collection' property as the target collection.
 *                           Other properties specific to the 'unhideIndex' command can also be included.
 * @param {Function} fns - A callback function that will be executed during the unhideIndex command.
 * @returns {Promise} - A promise that resolves with the result of the unhideIndex command.
 */
async unhideIndex(options = { collection: this.collection }, fns = () => { }) {

  // Call the 'dbMethod' function to get the 'unhideIndex' command function
  // dbMethod is a function used to create a method with specific behavior for a database command
  const fn = dbMethod(this)('command', fns, false, 'collMod');

  // Check if 'options' is not an object
  if (options && typeof options !== 'object') return 'Invalid options';

  // Extract 'unhideIndex' specific options and create the unhideIndexOptions object
  // The 'options' parameter is passed to this.options along with 'collMod' and 'collection' flags to extract relevant options.
  const unhideIndexOptions = this.options(options, 'collMod', 'collection');

  // Execute the 'unhideIndex' command and return the result
  return fn(unhideIndexOptions);
}


// Custom 

/**
 * Asynchronously deletes a single document from the collection that matches the specified filter and options.
 * 
 * @param {Object} [filter={}] - The filter object to determine the document to delete.
 * @param {Object} [options={}] - Additional options for the deleteOne operation.
 * @returns {Promise<DeleteResult>|string} - A promise that resolves to the delete result or an error message.
 */
async destroy(filter = {}, options = {}, fns = () => {}) {
  // Check if the filter is provided and is an object
  if (filter && !isObject(filter)) return 'Invalid filter';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'deleteOne' operation flag
  const fn = collectionMethod (this)('deleteOne', fns, false, 'delete');

  // Invoke the obtained function passing the filter and options, and return the result
  return fn(filter, options);
}
 
/**
 * Asynchronously deletes a document from the collection by its ID, using the specified options.
 * 
 * @param {string} [id='645b9cf776b7fb46975316d9'] - The ID of the document to delete.
 * @param {Object} [options={}] - Additional options for the delete operation.
 * @returns {Promise<DeleteResult>|string} - A promise that resolves to the delete result or an error message.
 */
async deleteById(id = '645b9cf776b7fb46975316d9', options = {}, fns = () => {}) {
  // Check if the ID is provided and is a valid ObjectId
  if (id && !isValidObjectId(id)) return 'Invalid id provided';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'deleteOne' operation flag
  const fn = collectionMethod (this)('deleteOne', fns, false, 'deleteById' );

  // Invoke the obtained function passing the filter (using the ID converted to ObjectId) and options, and return the result
  return fn({ _id: new ObjectId(id) }, options);
}


/**
 * Asynchronously removes a document from the collection by its ID, using the specified options.
 * 
 * @param {string} [id='645b9cf776b7fb46975316d9'] - The ID of the document to remove.
 * @param {Object} [options={}] - Additional options for the remove operation.
 * @returns {Promise<DeleteResult>|string} - A promise that resolves to the remove result or an error message.
 */
async removeById(id = '645b9cf776b7fb46975316d9', options = {},fns = () => {}) {
  // Check if the ID is provided and is a valid ObjectId
  if (id && !isValidObjectId(id)) return 'Invalid id provided';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'deleteOne' operation flag
  const fn = collectionMethod (this)('deleteOne', fns, false, 'removeById');

  // Invoke the obtained function passing the filter (using the ID converted to ObjectId) and options, and return the result
  return fn({ _id: new ObjectId(id) }, options);
}


/**
 * Asynchronously removes a document from the collection by its ID, using the specified options.
 * 
 * @param {string} [id='645b9cf776b7fb46975316d9'] - The ID of the document to remove.
 * @param {Object} [options={}] - Additional options for the remove operation.
 * @returns {Promise<DeleteResult>|string} - A promise that resolves to the remove result or an error message.
 */
async updateById(id = '645b9cf776b7fb46975316d9', update = {}, options = {}, fns = () => {}) {
  // Check if the ID is provided and is a valid ObjectId
  if (id && !isValidObjectId(id)) return 'Invalid id provided';
  
  // Check if the options are provided and are an object
  if (update && !isObject(update)) return 'Invalid update';

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'deleteOne' operation flag
  const fn = collectionMethod (this)('updateOne', fns, false, 'updateById');

  // Invoke the obtained function passing the filter (using the ID converted to ObjectId) and options, and return the result
  return fn({ _id: new ObjectId(id) }, {$set: update}, options);
}


/**
 * Asynchronously removes a document from the collection by its ID, using the specified options.
 * 
 * @param {string} [id='645b9cf776b7fb46975316d9'] - The ID of the document to remove.
 * @param {Object} [options={}] - Additional options for the remove operation.
 * @returns {Promise<DeleteResult>|string} - A promise that resolves to the remove result or an error message.
 */
async updateByUsername(username = 'username', update = {}, options = {}, fns = () => {}) {
  
  // Check if the options are provided and are an object
  if (update && !isObject(update)) return 'Invalid update';

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'deleteOne' operation flag
  const fn = collectionMethod (this)('updateOne', fns, false, 'updateByUsername');

  // Invoke the obtained function passing the filter (using the ID converted to ObjectId) and options, and return the result
  return fn({username }, {$set: update}, options);
}



/**
 * Asynchronously removes a document from the collection by its ID, using the specified options.
 * 
 * @param {string} [id='645b9cf776b7fb46975316d9'] - The ID of the document to remove.
 * @param {Object} [options={}] - Additional options for the remove operation.
 * @returns {Promise<DeleteResult>|string} - A promise that resolves to the remove result or an error message.
 */
async updateByEmail(email = '645b9cf776b7fb46975316d9', update = {}, options = {}, fns = () => {}) {
  // Check if the ID is provided and is a valid ObjectId
  // if (id && !isValidObjectId(id)) return 'Invalid id provided';
  

  // Check if the options are provided and are an object
  if (update && !isObject(update)) return 'Invalid update';

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'deleteOne' operation flag
  const fn = collectionMethod (this)('updateOne', fns, false, 'updateByEmail');

  // Invoke the obtained function passing the filter (using the ID converted to ObjectId) and options, and return the result
  return fn({email}, {$set: update}, options);
}

/**
 * Asynchronously removes a document from the collection by its ID, using the specified options.
 * 
 * @param {string} [id='645b9cf776b7fb46975316d9'] - The ID of the document to remove.
 * @param {Object} [options={}] - Additional options for the remove operation.
 * @returns {Promise<DeleteResult>|string} - A promise that resolves to the remove result or an error message.
 */
async updateByCode(code = '645b9cf776b7fb46975316d9', update = {}, options = {}, fns = () => {}) {
  // Check if the ID is provided and is a valid ObjectId
  // if (id && !isValidObjectId(id)) return 'Invalid id provided';
  

  // Check if the options are provided and are an object
  if (update && !isObject(update)) return 'Invalid update';

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'deleteOne' operation flag
  const fn = collectionMethod (this)('updateOne', fns, false, 'updateByCode');

  // Invoke the obtained function passing the filter (using the ID converted to ObjectId) and options, and return the result
  return fn({code}, {$set: update}, options);
}


/**
 * Asynchronously removes a document from the collection by its ID, using the specified options.
 * 
 * @param {string} [id='645b9cf776b7fb46975316d9'] - The ID of the document to remove.
 * @param {Object} [options={}] - Additional options for the remove operation.
 * @returns {Promise<DeleteResult>|string} - A promise that resolves to the remove result or an error message.
 */
async updateByToken(token = '645b9cf776b7fb46975316d9', update = {}, options = {}, fns = () => {}) {
  // Check if the ID is provided and is a valid ObjectId
  // if (id && !isValidObjectId(id)) return 'Invalid id provided';
  

  // Check if the options are provided and are an object
  if (update && !isObject(update)) return 'Invalid update';

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'deleteOne' operation flag
  const fn = collectionMethod (this)('updateOne', fns, false, 'updateByToken');

  // Invoke the obtained function passing the filter (using the ID converted to ObjectId) and options, and return the result
  return fn({token}, {$set: update}, options);
}



/**
 * Asynchronously removes a document from the collection by its ID, using the specified options.
 * 
 * @param {string} [id='645b9cf776b7fb46975316d9'] - The ID of the document to remove.
 * @param {Object} [options={}] - Additional options for the remove operation.
 * @returns {Promise<DeleteResult>|string} - A promise that resolves to the remove result or an error message.
 */
async updateLastByUsername(username = '645b9cf776b7fb46975316d9', update = {}, options = {sort: {_id: - 1}}, fns = () => {}) {
  // Check if the ID is provided and is a valid ObjectId
  // if (id && !isValidObjectId(id)) return 'Invalid id provided';
  

  // Check if the options are provided and are an object
  if (update && !isObject(update)) return 'Invalid update';

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'deleteOne' operation flag
  const fn = collectionMethod (this)('updateOne', fns, false, 'updateLastByUsername');

  // Invoke the obtained function passing the filter (using the ID converted to ObjectId) and options, and return the result
  return fn({username}, {$set: update}, options);
}



/**
 * Asynchronously removes a document from the collection by its ID, using the specified options.
 * 
 * @param {string} [id='645b9cf776b7fb46975316d9'] - The ID of the document to remove.
 * @param {Object} [options={}] - Additional options for the remove operation.
 * @returns {Promise<DeleteResult>|string} - A promise that resolves to the remove result or an error message.
 */
async updateLastByEmail(email = '645b9cf776b7fb46975316d9', update = {}, options = {sort: {_id: - 1}}, fns = () => {}) {
  // Check if the ID is provided and is a valid ObjectId
  // if (id && !isValidObjectId(id)) return 'Invalid id provided';
  

  // Check if the options are provided and are an object
  if (update && !isObject(update)) return 'Invalid update';

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'deleteOne' operation flag
  const fn = collectionMethod (this)('updateOne', fns, false, 'updateLastByEmail');

  // Invoke the obtained function passing the filter (using the ID converted to ObjectId) and options, and return the result
  return fn({email}, {$set: update}, options);
}

/**
 * Asynchronously removes a document from the collection by its ID, using the specified options.
 * 
 * @param {string} [id='645b9cf776b7fb46975316d9'] - The ID of the document to remove.
 * @param {Object} [options={}] - Additional options for the remove operation.
 * @returns {Promise<DeleteResult>|string} - A promise that resolves to the remove result or an error message.
 */
async updateLastByToken(token = '645b9cf776b7fb46975316d9', update = {}, options = {sort: {_id: - 1}}, fns = () => {}) {
  // Check if the ID is provided and is a valid ObjectId
  // if (id && !isValidObjectId(id)) return 'Invalid id provided';
  

  // Check if the options are provided and are an object
  if (update && !isObject(update)) return 'Invalid update';

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'deleteOne' operation flag
  const fn = collectionMethod (this)('updateOne', fns, false, 'updateLastByToken');

  // Invoke the obtained function passing the filter (using the ID converted to ObjectId) and options, and return the result
  return fn({token }, {$set: update}, options);
}


/**
 * Asynchronously removes a document from the collection by its ID, using the specified options.
 * 
 * @param {string} [id='645b9cf776b7fb46975316d9'] - The ID of the document to remove.
 * @param {Object} [options={}] - Additional options for the remove operation.
 * @returns {Promise<DeleteResult>|string} - A promise that resolves to the remove result or an error message.
 */
async updateLastByCode(code = '645b9cf776b7fb46975316d9', update = {}, options = {sort: {_id: - 1}}, fns = () => {}) {
  // Check if the ID is provided and is a valid ObjectId
  // if (id && !isValidObjectId(id)) return 'Invalid id provided';
  

  // Check if the options are provided and are an object
  if (update && !isObject(update)) return 'Invalid update';

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'deleteOne' operation flag
  const fn = collectionMethod (this)('updateOne', fns, false, 'updateLastByCode');

  // Invoke the obtained function passing the filter (using the ID converted to ObjectId) and options, and return the result
  return fn({code}, {$set: update}, options);
}

  
/**
 * Asynchronously deletes a single document from the collection that matches the specified email and options.
 * 
 * @param {string} [email='ericson.weah@gmail'] - The email of the document to delete.
 * @param {Object} [options={}] - Additional options for the deleteOne operation.
 * @returns {Promise<DeleteResult>|string} - A promise that resolves to the delete result or an error message.
 */
async deleteOneByEmail(email = 'ericson.weah@gmail', options = {}, fns = () => {}) {
  // Check if the email is provided and is a valid email format
  if (email && !isValid('email', email)) return 'Invalid email';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'deleteOne' operation flag
  const fn = collectionMethod (this)('deleteOne', fns, false, 'deleteOneByEmail');

  // Invoke the obtained function passing the filter (using the email field) and options, and return the result
  return fn({ email }, options);
}


/**
 * Asynchronously deletes a single document from the collection that matches the specified username and options.
 * 
 * @param {string} [username='ericsonweah'] - The username of the document to delete.
 * @param {Object} [options={}] - Additional options for the deleteOne operation.
 * @returns {Promise<DeleteResult>|string} - A promise that resolves to the delete result or an error message.
 */
async deleteOneByUsername(username = 'ericsonweah', options = {},fns = () => {}) {
  // Check if the username is provided and is a valid username format
  if (username && !isValid('username', username)) return 'Invalid username';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'deleteOne' operation flag
  const fn = collectionMethod (this)('deleteOne', fns,false, 'deleteOneByUsername');

  // Invoke the obtained function passing the filter (using the username field) and options, and return the result
  return fn({ username }, options);
}


/**
 * Asynchronously deletes a single document from the collection that matches the specified code and options.
 * 
 * @param {string} [code='FT'] - The code of the document to delete.
 * @param {Object} [options={}] - Additional options for the deleteOne operation.
 * @returns {Promise<DeleteResult>|string} - A promise that resolves to the delete result or an error message.
 */
async deleteOneByCode(code = 'FT', options = {},fns = () => {}) {
  // Check if the code is provided and is a string
  if (code && !isString(code)) return 'Invalid code';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'deleteOne' operation flag
  const fn = collectionMethod (this)('deleteOne', fns, false, 'deleteOneByCode');

  // Invoke the obtained function passing the filter (using the code field) and options, and return the result
  return fn({ code }, options);
}

/**
 * Asynchronously finds and retrieves documents from the collection based on the specified query, projection, and options.
 * 
 * @param {Object} [query={}] - The query object to filter the documents.
 * @param {Object} [projection={}] - The projection object to specify the fields to include or exclude.
 * @param {Object} [options={}] - Additional options for the find operation.
 * @returns {Promise<Cursor>|string} - A promise that resolves to a cursor or an error message.
 */
async all(query = {}, options = {}, fns = () => {}) {
  // Check if the query is provided and is an object
  if (query && !isObject(query)) return 'Invalid query';
  

  // Check if the options is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // // Check if the options are provided and are an object
  // if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'find' operation flag
  const fn = collectionMethod(this)('find', fns, true, 'all');

  // Invoke the obtained function passing the query, options, and options, and return the result
  return fn(query, options);
}

/**
 * Asynchronously finds and retrieves a document from the collection based on the specified ID, projection, and options.
 * 
 * @param {string} [id='645b9cf776b7fb46975316d9'] - The ID of the document to find.
 * @param {Object} [projection={}] - The projection object to specify the fields to include or exclude.
 * @returns {Promise<Document>|string} - A promise that resolves to the found document or an error message.
 */
async findById(id = '645b9cf776b7fb46975316d9', options = {}, fns = () => {}) {
  // Check if the ID is provided and is a valid ObjectId
  if (id && !isValidObjectId(id)) return 'Invalid id provided';
  

  // Check if the options is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // // Check if the options are provided and are an object
  // if (options && !isObject(options)) return 'Invalid options';
  
 
  // Obtain the collectionMethod  function with the current context (this) and the 'findOne' operation flag
  const fn = collectionMethod (this)('findOne', fns, false, 'findById');

  // Invoke the obtained function passing the filter (using the ID converted to ObjectId), options, and options, and return the result
  return fn({ _id: new ObjectId(id) }, options);
}



/**
 * Asynchronously finds and retrieves a document from the collection based on the specified email, projection, and options.
 * 
 * @param {string} [email='ericson.weah@gmail.com'] - The email of the document to find.
 * @param {Object} [projection={}] - The projection object to specify the fields to include or exclude.

 * @returns {Promise<Document>|string} - A promise that resolves to the found document or an error message.
 */
async findByEmail(email = 'ericson.weah@gmail.com', options = {}, fns = () => {}) {
  // Check if the email is provided and is a valid email format
  if (email && !isValid('email', email)) return 'Invalid email';
  

  // Check if the options is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // // Check if the options are provided and are an object
  // if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'findOne' operation flag
  const fn = collectionMethod (this)('findOne', fns, false, 'findByEmail');

  // Invoke the obtained function passing the filter (using the email field), options, and options, and return the result
  return fn({ email }, options);
}




/**
 * Asynchronously finds and retrieves a document from the collection based on the specified username, projection, and options.
 * 
 * @param {string} [username='username'] - The username of the document to find.
 * @param {Object} [projection={}] - The projection object to specify the fields to include or exclude.
 * @returns {Promise<Document>|string} - A promise that resolves to the found document or an error message.
 */
async findByUsername(username = 'username', options = {}, fns = () => {}) {
  // Check if the username is provided and is a valid username format
  if (username && !isValid('username', username)) return 'Invalid username';
  

  // Check if the options is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // // Check if the options are provided and are an object
  // if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'findOne' operation flag
  const fn = collectionMethod (this)('findOne', fns,false, 'findByUsername');

  // Invoke the obtained function passing the filter (using the username field), options, and options, and return the result
  return fn({ username },options);
}



/**
 * Asynchronously finds and retrieves a document from the collection based on the specified phone number, projection, and options.
 * 
 * @param {string} [phone='2852045167'] - The phone number of the document to find.
 * @param {Object} [projection={}] - The projection object to specify the fields to include or exclude.
 * @param {Object} [options={}] - Additional options for the findByPhone operation.
 * @returns {Promise<Document>|string} - A promise that resolves to the found document or an error message.
 */
async findByPhone(phone = '2852045167', options = {}, fns = () => {}) {
  // Check if the phone number is provided and is a string
  if (phone && !isString(phone)) return 'Invalid phone';
  

  // Check if the options is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // // Check if the options are provided and are an object
  // if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'findOne' operation flag
  const fn = collectionMethod (this)('findOne', fns, false, 'findByPhone');

  // Invoke the obtained function passing the filter (using the phone field), options, and options, and return the result
  return fn({ phone }, options);
}


/**
 * Asynchronously finds and retrieves a document from the collection based on the specified code, projection, and options.
 * 
 * @param {string} [code='FT'] - The code of the document to find.
 * @param {Object} [projection={}] - The projection object to specify the fields to include or exclude.
 * @param {Object} [options={}] - Additional options for the findByCode operation.
 * @returns {Promise<Document>|string} - A promise that resolves to the found document or an error message.
 */
async findByCode(code = 'FT', options = {}, fns = () => {}) {
  // Check if the code is provided and is a string
  if (code && !isString(code)) return 'Invalid code';
  

  // Check if the options is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // // Check if the options are provided and are an object
  // if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'findOne' operation flag
  const fn = collectionMethod (this)('findOne', fns, false, 'findByCode');

  // Invoke the obtained function passing the filter (using the code field), options, and options, and return the result
  return fn({ code }, options);
}



/**
 * Asynchronously finds and retrieves the first document from the collection based on the specified email, projection, and options.
 * 
 * @param {string} [email='ericson.weah@gmail.com'] - The email of the document to find.
 * @param {Object} [projection={}] - The projection object to specify the fields to include or exclude.
 * @param {Object} [options={}] - Additional options for the firstByEmail operation.
 * @returns {Promise<Document>|string} - A promise that resolves to the found document or an error message.
 */
async firstByEmail(email = 'ericson.weah@gmail.com', options = {},fns = () => {}) {
  // Check if the email is provided and is a valid email format
  if (email && !isValid('email', email)) return 'Invalid email';


  // Check if the options is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';

  // // Check if the options are provided and are an object
  // if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'findOne' operation flag
  const fn = collectionMethod (this)('findOne', fns, false, 'firstByEmail');

  // Invoke the obtained function passing the filter (using the email field), options, and options, and return the result
  return fn({ email }, options);
}



/**
 * Asynchronously finds and retrieves the first document from the collection based on the specified username, projection, and options.
 * 
 * @param {string} [username='username'] - The username of the document to find.
 * @param {Object} [projection={}] - The projection object to specify the fields to include or exclude.
 * @param {Object} [options={}] - Additional options for the firstByUsername operation.
 * @returns {Promise<Document>|string} - A promise that resolves to the found document or an error message.
 */
async firstByUsername(username = 'username', options = {},fns = () => {}) {
  // Check if the username is provided and is a valid username format
  if (username && !isValid('username', username)) return 'Invalid username';
  

  // Check if the options is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Check if the options are provided and are an object
  // if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'findOne' operation flag
  const fn = collectionMethod (this)('findOne', fns, false, 'firstByUsername');

  // Invoke the obtained function passing the filter (using the username field), options, and options, and return the result
  return fn({ username }, options);
}


/**
 * Asynchronously finds and retrieves the first document from the collection based on the specified phone number, projection, and options.
 * 
 * @param {string} [phone='2852045167'] - The phone number of the document to find.
 * @param {Object} [projection={}] - The projection object to specify the fields to include or exclude.
 * @param {Object} [options={}] - Additional options for the firstByPhone operation.
 * @returns {Promise<Document>|string} - A promise that resolves to the found document or an error message.
 */
async firstByPhone(phone = '2852045167', options = {},fns = () => {}) {
  // Check if the phone number is provided and is a string
  if (phone && !isString(phone)) return 'Invalid phone';
  

  // Check if the options is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // // Check if the options are provided and are an object
  // if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'findOne' operation flag
  const fn = collectionMethod (this)('findOne', fns, false, 'firstByPhone');

  // Invoke the obtained function passing the filter (using the phone field), options, and options, and return the result
  return fn({ phone }, options, options);
}



/**
 * Asynchronously finds and retrieves the first document from the collection based on the specified code, projection, and options.
 * 
 * @param {string} [code='FT'] - The code of the document to find.
 * @param {Object} [projection={}] - The projection object to specify the fields to include or exclude.
 * @param {Object} [options={}] - Additional options for the firstByCode operation.
 * @returns {Promise<Document>|string} - A promise that resolves to the found document or an error message.
 */
async firstByCode(code = 'FT', options = {}, fns = () => {}) {
  // Check if the code is provided and is a string
  if (code && !isString(code)) return 'Invalid code';
  

  // Check if the options is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Check if the options are provided and are an object
  // if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'findOne' operation flag
  const fn = collectionMethod (this)('findOne',fns, false, 'firstByCode');

  // Invoke the obtained function passing the filter (using the code field), options, and options, and return the result
  return fn({ code }, options);
}

/**
 * Asynchronously creates a single document in the collection.
 * 
 * @param {Object} [document={}] - The document to create.
 * @param {Object} [options={}] - Additional options for the create operation.
 * @returns {Promise<Document>|string} - A promise that resolves to the created document or an error message.
 */
async create(document = {}, options = {}, fns = () => {}) {
  // Check if the document is provided and is an object
  if (document && !isObject(document)) return 'Invalid document';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'insertOne' operation flag
  const fn = collectionMethod (this)('insertOne', fns, false, 'create');

  // Invoke the obtained function passing the document and options, and return the result
  return fn(document, options);
}


/**
 * Asynchronously creates multiple documents in the collection.
 * 
 * @param {Array} [documents=[]] - The array of documents to create.
 * @param {Object} [options={}] - Additional options for the createMany operation.
 * @returns {Promise<Array<Document>>|string} - A promise that resolves to an array of created documents or an error message.
 */
async createMany(documents = [], options = {}, fns = () => {}) {
  // Check if the documents array is provided and is an array
  if (documents && !isArray(documents)) return 'Invalid input documents';
  

  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the collectionMethod  function with the current context (this) and the 'insertMany' operation flag
  const fn = collectionMethod (this)('insertMany', fns, false, 'createMany');

  // Invoke the obtained function passing the documents array and options, and return the result
  return fn(documents, options);
}

/**
 * Finds a document in the collection by the specified firstname.
 *
 * @param {string} [firstname='firstname'] - The firstname to search for.
 * @param {Object} [projection={}] - The projection options for the query.
 * @param {Object} [options={}] - The additional options for the query.
 * @returns {Promise} - A Promise that resolves with the matching document.
 * @throws {Error} - If the firstname is not a string or if the projection/options are not objects.
 */
async findByFirstname(firstname = 'firstname', options = {}, fns = () => {}) {
  // Check if the firstname parameter is provided and is a string
  if (firstname && !isString(firstname)) return 'Invalid firstname';
  

  // Check if the options parameter is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Check if the options parameter is provided and is an object
  // if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the appropriate function for executing the query
  const fn = collectionMethod(this)('findOne', fns, false, 'findByFirstname');

  // Execute the query with the provided parameters
  return fn({ firstname }, options);
}

/**
 * Finds a document in the collection by the specified lastname.
 *
 * @param {string} [lastname='lastname'] - The lastname to search for.
 * @param {Object} [projection={}] - The projection options for the query.
 * @param {Object} [options={}] - The additional options for the query.
 * @returns {Promise} - A Promise that resolves with the matching document.
 * @throws {Error} - If the lastname is not a string or if the projection/options are not objects.
 */
async findByLastname(lastname = 'lastname', options = {}, fns = () => {}) {
  // Check if the lastname parameter is provided and is a string
  if (lastname && !isString(lastname)) return 'Invalid lastname';
  

  // // Check if the projection parameter is provided and is an object
  // if (projection && !isObject(projection)) return 'Invalid projection';

  // Check if the options parameter is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the appropriate function for executing the query
  const fn = collectionMethod(this)('findOne', fns, false, 'findByLastname');

  // Execute the query with the provided parameters
  return fn({ lastname }, options);
}


async firstById(id="645b9cf776b7fb46975316d9", options = {sort: {_id: 1}}, fns = () => {}){
   // Check if the ID is provided and is a valid ObjectId
   if (id && !isValidObjectId(id)) return 'Invalid id provided';
  

  // // Check if the projection parameter is provided and is an object
  // if (projection && !isObject(projection)) return 'Invalid projection';
   
 
   //Check if the options are provided and are an object
   if (options && !isObject(options)) return 'Invalid options';
   
 
   // Obtain the collectionMethod  function with the current context (this) and the 'findOne' operation flag
   const fn = collectionMethod (this)('findOne', fns, false, 'firstById');
 
  // Invoke the obtained function passing the filter (using the ID converted to ObjectId), projection, and options, and return the result
  return fn({ _id: new ObjectId(id) }, options);
}
/**
 * Finds the first document in the collection by the specified email.
 *
 * @param {string} [email='ericson.weah@gmail.com'] - The email to search for.
 * @param {Object} [projection={}] - The projection options for the query.
 * @param {Object} [options={}] - The additional options for the query.
 * @returns {Promise} - A Promise that resolves with the matching document.
 * @throws {Error} - If the email is not a string, if the email is not valid, or if the projection/options are not objects.
 */
async firstByEmail(email = 'ericson.weah@gmail.com', options = {}, fns = () => {}) {
  // Check if the email parameter is provided and is a string
  if (email && !isString(email)) return 'Invalid email';
  

  // Check if the email parameter is provided and is a valid email
  if (email && !isValid('email', email)) return 'Invalid email';
  

  // Check if the projection parameter is provided and is an object
  // if (projection && !isObject(projection)) return 'Invalid projection';
  

  // Check if the options parameter is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the appropriate function for executing the query
  const fn = collectionMethod(this)('findOne', fns, false, 'firstByEmail');

  // Execute the query with the provided parameters
  return fn({ email }, options);
}

/**
 * Finds the first document in the collection by the specified token.
 *
 * @param {string} [token='645b9cf776b7fb46975316d9'] - The token to search for.
 * @param {Object} [projection={}] - The projection options for the query.
 * @param {Object} [options={}] - The additional options for the query.
 * @returns {Promise} - A Promise that resolves with the matching document.
 * @throws {Error} - If the token is not a string or if the projection/options are not objects.
 */
async firstByToken(token = '645b9cf776b7fb46975316d9', options = {}, fns = () => {}) {
  // Check if the token parameter is provided and is a string
  if (token && !isString(token)) return 'Invalid token';
  

  // Check if the projection parameter is provided and is an object
  // if (projection && !isObject(projection)) return 'Invalid projection';
  

  // Check if the options parameter is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the appropriate function for executing the query
  const fn = collectionMethod(this)('findOne', fns, false, 'firstByToken');

  // Execute the query with the provided parameters
  return fn({ token }, options);
}

/**
 * Finds the first document in the collection based on the phone field.
 *
 * @param {string} phone - The phone number to search for.
 * @param {object} projection - The projection object to specify which fields to include or exclude.
 * @param {object} options - The options object for additional query options.
 * @returns {Promise} - A promise that resolves to the first matching document or an error message.
 */
async firstByPhone(phone = '2852045167', options = {}, fns = () => {}) {
  // Validate the phone parameter
  if (phone && typeof phone !== 'string') return 'Invalid phone';

  // // Check if the projection parameter is provided and is an object
  // if (projection && !isObject(projection)) return 'Invalid projection';

  // Validate the options object
  if (options && !isObject(options)) return 'Invalid options';

  // Call the findOne method on the collection using the provided parameters
  const fn = collectionMethod(this)('findOne', fns, false, 'firstByPhone');
  return fn({ phone }, options);
}

/**
 * Finds the first document in the collection by the specified username.
 *
 * @param {string} [username='username'] - The username to search for.
 * @param {Object} [projection={}] - The projection options for the query.
 * @param {Object} [options={}] - The additional options for the query.
 * @returns {Promise} - A Promise that resolves with the matching document.
 * @throws {Error} - If the username is not a string or if the projection/options are not objects.
 */
async firstByUsername(username = 'username', options = {}, fns = () => {}) {
  // Check if the username parameter is provided and is a string
  if (username && !isString(username)) return 'Invalid username';
  

  // // Check if the projection parameter is provided and is an object
  // if (projection && !isObject(projection)) return 'Invalid projection';
  

  // Check if the options parameter is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the appropriate function for executing the query
  const fn = collectionMethod(this)('findOne', fns, false, 'firstByUsername');

  // Execute the query with the provided parameters
  return fn({ username }, options);
}

/**
 * Finds the first document in the collection by the specified code.
 *
 * @param {string} [code='FT'] - The code to search for.
 * @param {Object} [projection={}] - The projection options for the query.
 * @param {Object} [options={}] - The additional options for the query.
 * @returns {Promise} - A Promise that resolves with the matching document.
 * @throws {Error} - If the code is not a string or if the projection/options are not objects.
 */
async firstByCode(code = 'FT', options = {}, fns = () => {}) {
  // Check if the code parameter is provided and is a string
  if (code && !isString(code)) return 'Invalid code';
  

  // // Check if the projection parameter is provided and is an object
  // if (projection && !isObject(projection)) return 'Invalid projection';
  

  // Check if the options parameter is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the appropriate function for executing the query
  const fn = collectionMethod(this)('findOne', fns, false, 'firstByCode');

  // Execute the query with the provided parameters
  return fn({ code }, options);
}

/**
 * Finds the first document in the collection by the specified firstname.
 *
 * @param {string} [firstname='firstname'] - The firstname to search for.
 * @param {Object} [projection={}] - The projection options for the query.
 * @param {Object} [options={}] - The additional options for the query.
 * @returns {Promise} - A Promise that resolves with the matching document.
 * @throws {Error} - If the firstname is not a string or if the projection/options are not objects.
 */
async firstByFirstname(firstname = 'firstname', options = {}, fns = () => {}) {
  // Check if the firstname parameter is provided and is a string
  if (firstname && !isString(firstname)) return 'Invalid firstname';
  

  // // // Check if the projection parameter is provided and is an object
  // if (projection && !isObject(projection)) return 'Invalid projection';
  

  // Check if the options parameter is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the appropriate function for executing the query
  const fn = collectionMethod(this)('findOne', fns, false, 'firstByFirstname');

  // Execute the query with the provided parameters
  return fn({ firstname }, options);
}

/**
 * Finds the first document in the collection by the specified lastname.
 *
 * @param {string} [lastname='lastname'] - The lastname to search for.
 * @param {Object} [projection={}] - The projection options for the query.
 * @param {Object} [options={}] - The additional options for the query.
 * @returns {Promise} - A Promise that resolves with the matching document.
 * @throws {Error} - If the lastname is not a string or if the projection/options are not objects.
 */
async firstByLastname(lastname = 'lastname', options = {}, fns = () => {}) {
  // Check if the lastname parameter is provided and is a string
  if (lastname && !isString(lastname)) return 'Invalid lastname';
  

  // // // Check if the projection parameter is provided and is an object
  // if (projection && !isObject(projection)) return 'Invalid projection';
  

  // Check if the options parameter is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the appropriate function for executing the query
  const fn = collectionMethod(this)('findOne', fns, false, 'firstByLastname');

  // Execute the query with the provided parameters
  return fn({ lastname }, options);
}


async lastById(id="645b9cf776b7fb46975316d9", fns = () => {}, options = { sort: {_id: -1}, projection: {}}){
  // Check if the ID is provided and is a valid ObjectId
  if (id && !isValidObjectId(id)) return 'Invalid id provided';
 
  // Check if the options are provided and are an object
  if (options && !isObject(options)) return 'Invalid options';
  
  // Obtain the collectionMethod  function with the current context (this) and the 'findOne' operation flag
  const fn = collectionMethod (this)('findOne', fns, false, 'lastById');

 // Invoke the obtained function passing the filter (using the ID converted to ObjectId), projection, and options, and return the result
 return fn({ _id: new ObjectId(id) }, options);
}

async last(query = {},  fns = () => {}, options = { sort: {_id: -1}, projection: {}}){

  if (query && !isObject(query)) return 'Invalid query';

  if (options && !isObject(options)) return 'Invalid options';

  const fn = collectionMethod (this)('findOne', fns, false, 'last');
  return fn(query,  options);
 }

/**
 * Finds the last document in the collection by the specified email.
 *
 * @param {string} [email='ericson.weah@gmail.com'] - The email to search for.
 * @param {Object} [options={ sort: {_id: -1}, projection: {}}] - The additional options for the query.
 * @returns {Promise} - A Promise that resolves with the matching document.
 * @throws {Error} - If the email is not a string or if the projection/options are not objects.
 */
async lastByEmail(email = 'ericson.weah@gmail.com',  fns = () => {}, options = { sort: {_id: -1}, projection: {}}) {
  // Check if the email parameter is provided and is a string
  if (email && !isString(email)) return 'Invalid email';
  

  // Check if the email parameter passes the email validation
  if (email && !isValid('email', email)) return 'Invalid email';
  

  // Check if the options parameter is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the appropriate function for executing the query
  const fn = collectionMethod(this)('findOne', fns, false, 'lastByEmail');

  // Execute the query with the provided parameters
  return fn({ email }, options);
}

/**
 * Finds the last document in the collection by the specified token.
 *
 * @param {string} [token='645b9cf776b7fb46975316d9'] - The token to search for.
 * @param {Object} [options={ sort: {_id: -1}, projection: {}}] - The additional options for the query.
 * @returns {Promise} - A Promise that resolves with the matching document.
 * @throws {Error} - If the token is not a string or if the options are not an object.
 */
async lastByToken(token = '645b9cf776b7fb46975316d9', fns = () => {}, options = { sort: {_id: -1}, projection: {}}) {
  // Check if the token parameter is provided and is a string
  if (token && !isString(token)) return 'Invalid token';
  

  // Check if the options parameter is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the appropriate function for executing the query
  const fn = collectionMethod(this)('findOne',fns, false, 'lastByToken');

  // Execute the query with the provided parameters
  return fn({ token }, options);
}

/**
 * Finds the last document in the collection by the specified phone number.
 *
 * @param {string} [phone='2852045167'] - The phone number to search for.
 * @param {Object} [options={ sort: {_id: -1}, projection: {}}] - The additional options for the query.
 * @returns {Promise} - A Promise that resolves with the matching document.
 * @throws {Error} - If the phone number is not a string or if the options are not an object.
 */
async lastByPhone(phone = '2852045167',  fns = () => {}, options = { sort: {_id: -1}, projection: {}}) {
  // Check if the phone parameter is provided and is a string
  if (phone && !isString(phone)) return 'Invalid phone';
  

  // Check if the options parameter is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the appropriate function for executing the query
  const fn = collectionMethod(this)('findOne', fns, false, 'lastByPhone');

  // Execute the query with the provided parameters
  return fn({ phone }, options);
}

/**
 * Finds the last document in the collection by the specified username.
 *
 * @param {string} [username='username'] - The username to search for.
 * @param {Object} [options={ sort: {_id: -1}, projection: {}}] - The additional options for the query.
 * @returns {Promise} - A Promise that resolves with the matching document.
 * @throws {Error} - If the username is not a string or if the options are not an object.
 */
async lastByUsername(username = 'username', fns = () => {}, options = { sort: {_id: -1}, projection: {}}) {
  // Check if the username parameter is provided and is a string
  if (username && !isString(username)) return 'Invalid username';
  

  // Check if the options parameter is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the appropriate function for executing the query
  const fn = collectionMethod(this)('findOne',fns, false, 'lastByUsername');

  // Execute the query with the provided parameters
  return fn({ username }, options);
}

/**
 * Finds the last document in the collection by the specified code.
 *
 * @param {string} [code='FT'] - The code to search for.
 * @param {Object} [options={ sort: {_id: -1}, projection: {}}] - The additional options for the query.
 * @returns {Promise} - A Promise that resolves with the matching document.
 * @throws {Error} - If the code is not a string or if the options are not an object.
 */
async lastByCode(code = 'FT', fns = () => {}, options = { sort: {_id: -1}, projection: {}}) {
  // Check if the code parameter is provided and is a string
  if (code && !isString(code)) return 'Invalid code';
  

  // Check if the options parameter is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the appropriate function for executing the query
  const fn = collectionMethod(this)('findOne', fns, false, 'lastByCode');

  // Execute the query with the provided parameters
  return fn({ code }, options);
}

/**
 * Finds the last document in the collection by the specified firstname.
 *
 * @param {string} [firstname='firstname'] - The firstname to search for.
 * @param {Object} [options={ sort: {_id: -1}, projection: {}}] - The additional options for the query.
 * @returns {Promise} - A Promise that resolves with the matching document.
 * @throws {Error} - If the firstname is not a string or if the options are not an object.
 */
async lastByFirstname(firstname = 'firstname', fns = () => {}, options = { sort: {_id: -1}, projection: {}}) {
  // Check if the firstname parameter is provided and is a string
  if (firstname && !isString(firstname)) return 'Invalid firstname';
  

  // Check if the options parameter is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the appropriate function for executing the query
  const fn = collectionMethod(this)('findOne', fns, false, 'lastByFirstname');

  // Execute the query with the provided parameters
  return fn({ firstname }, options);
}

/**
 * Finds the last document in the collection by the specified lastname.
 *
 * @param {string} [lastname='lastname'] - The lastname to search for.
 * @param {Object} [options={ sort: {_id: -1}, projection: {}}] - The additional options for the query.
 * @returns {Promise} - A Promise that resolves with the matching document.
 * @throws {Error} - If the lastname is not a string or if the options are not an object.
 */
async lastByLastname(lastname = 'lastname',  fns = () => {}, options = { sort: {_id: -1}, projection: {}}) {
  // Check if the lastname parameter is provided and is a string
  if (lastname && !isString(lastname)) return 'Invalid lastname';
  

  // Check if the options parameter is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the appropriate function for executing the query
  const fn = collectionMethod(this)('findOne', fns, false, 'lastByLastname');

  // Execute the query with the provided parameters
  return fn({ lastname }, options);
}


/**
 * Finds the last document in the collection by the specified lastname.
 *
 * @param {string} [lastname='lastname'] - The lastname to search for.
 * @param {Object} [options={ sort: {_id: -1}, projection: {}}] - The additional options for the query.
 * @returns {Promise} - A Promise that resolves with the matching document.
 * @throws {Error} - If the lastname is not a string or if the options are not an object.
 */
async lastByName(name = 'name', fns = () => {}, options = { sort: {_id: -1}, projection: {}}) {
  // Check if the name parameter is provided and is a string
  if (name && !isString(name)) return 'Invalid name';
  

  // Check if the options parameter is provided and is an object
  if (options && !isObject(options)) return 'Invalid options';
  

  // Obtain the appropriate function for executing the query
  const fn = collectionMethod(this)('findOne', fns, false, 'lastByName');

  // Execute the query with the provided parameters
  return fn({ name }, options);
}


/**
 * Creates a new ObjectId instance from a string.
 *
 * @param {string} [string='6476fe3e6e636c2f079eca69'] - The string representation of the ObjectId.
 * @returns {ObjectId} The new ObjectId instance.
 */
objectId(string = '6476fe3e6e636c2f079eca69') {
  return new ObjectId(string);
}


/**
 * Saves a file to the specified path with the given file name.
 *
 * @param {string} filePath - The path where the file will be saved.
 * @param {string} fileName - The name of the file to be saved.
 * @throws {TypeError} If either the filePath or fileName does not exist.
 * @returns {Promise} A promise that resolves when the file is saved successfully.
 */
async saveFile(filePath, fileName) {
  if (fileExists(filePath)) {
    return streamer(this)(filePath, fileName);
  }
  throw new TypeError(`Either ${filePath} or ${fileName} does not exist`);
}


/**
 * Creates multiple instances of the class from a JSON file.
 *
 * @param {string} path - The path to the JSON file.
 * @param {Object} options - Additional options for creating the instances.
 * @param {Function} [fn=() => {}] - An optional callback function called for each created instance.
 * @returns {Array} An array of the created instances.
 */
createManyFromJsonFile(path, options, fn = () => {}) {
  const data = JSON.parse(require('fs').readFileSync(path, 'utf8'));
  return this.createMany(data, options, fn);
}


/**
 * Creates a single instance of the class from a JSON file.
 *
 * @param {string} path - The path to the JSON file.
 * @param {Object} options - Additional options for creating the instance.
 * @param {Function} [fn=() => {}] - An optional callback function called after the instance is created.
 * @returns {Object} The created instance.
 */
createOneFromJsonFile(path, options, fn = () => {}) {
  const data = JSON.parse(require('fs').readFileSync(path, 'utf8'));
  return this.createOne(data, options, fn);
}


/**
 * Inserts multiple records into the class from a JSON file.
 *
 * @param {string} path - The path to the JSON file.
 * @param {Object} options - Additional options for inserting the records.
 * @param {Function} [fn=() => {}] - An optional callback function called for each inserted record.
 * @returns {Array} An array of the inserted records.
 */
insertManyFromJsonFile(path, options, fn = () => {}) {
  const data = JSON.parse(require('fs').readFileSync(path, 'utf8'));
  return this.insertMany(data, options, fn);
}



/**
 * Inserts a single record into the class from a JSON file.
 *
 * @param {string} path - The path to the JSON file.
 * @param {Object} options - Additional options for inserting the record.
 * @param {Function} [fn=() => {}] - An optional callback function called after the record is inserted.
 * @returns {Object} The inserted record.
 */
insertOneFromJsonFile(path, options, fn = () => {}) {
  const data = JSON.parse(require('fs').readFileSync(path, 'utf8'));
  return this.insertOne(data, options, fn);
}


  /**
   * Configures the class with the specified options for database connection, URL, collection, and database name.
   */
  config() {

    if (!this.url) this.url = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/test';
    if (!this.collection) this.collection = 'users';
    if (!this.faker_url) this.faker_url = process.env.JSON_FAKER_URL || 'https://jsonplaceholder.typicode.com/';
    if (!this.db) {
      if (isUrlLocalhost(this.url)) {
        this.db = getDatabaseNameFromUrl(this.url);
      } else {
        this.db = process.env.DATABASE_NAME || 'test';
      }
    }
    this.DB = new DB({ url: this.url, db: this.db, collection: this.collection });
  
  }

  /**
   * @name autoinvoked
   * @function
   *
   * @param {Object|Function|Class} className the class whose methods to be bound to it
   *
   * @description auto sets the list of methods to be auto invoked
   *
   * @return does not return anything
   *
   */
  autoinvoked() {
    return ['config'];
  }

  /// Conditional 

  async emailExists(email = 'john.doe@email.com'){
     try{
        const result = await this.findByEmail(email);
         if(result && result.length > 0){
          return true;
         }else{
          return false;
         }
     }catch(error){
       return false;
     }
  }
  async usernameExists(username = 'john.doe'){
    try{
      const result = await this.findByUsername(username);
       if(result && result.length > 0){
        return true;
       }else{
        return false;
       }
   }catch(error){
     return false;
   }
  }
  async tokenExists(token = '92323023232'){
    try{
      const result = await this.findByToken(token);
       if(result && result.length > 0){
        return true;
       }else{
        return false;
       }
   }catch(error){
     return false;
   }
  }
  async tokenIsNull(){}
  async tokenExistsAndIsNotNull(){}

  async findByIdAndUpdate(){}
}

module.exports = Model;

























