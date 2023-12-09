'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module AuthLogin
 * @kind class
 * 
 * @extends HTMLElement
 * 
 * @requires HTMLElement
 * 
 * @classdesc Base class for the front end system. The main and only ancestor of all the classes of the whole front end system (the entire frontend code base)
 * 
 * @typedef {Object} bdRequest (or db) the request instance of an indexedDB database
 * @typedef {Object} store an indexedDB database store
 * @typedef {Object} options indexedDB database settup options
 * 
 */
import shadowroot  from './template/main.js'

class AuthLogin extends HTMLElement {
    constructor(...arrayOfObjects) {
        super()
       
        if (Object.keys(arrayOfObjects).length > 0) {
            Object.keys(arrayOfObjects).forEach(option => {
                if (Object.keys(option).length > 0) {
                    Object.keys(option).forEach(key => {
                        if (!this[key]) { this[key] = option[key] }
                    })
                }
            })
        }
        this.attachShadow({mode: 'open'})
        this.shadowRoot.innerHTML = shadowroot()
    }
    /**
    * @name connectedCallback (element's life cycle)
    * @function
    * 
    * @description browser calls this method when the element is added or mounted to the document or DOM
      * (can be called many times if an element is repeatedly added/removed)
    * 
    * @return does not return anything
    * 
    */
    connectedCallback() { }

    /**
     * @name disconnectedCallback (element's life cycle)
     * @function 
     * 
     * @description browser calls this method when the element is removed or disconnect from the document or DOM
       * (can be called many times if an element is repeatedly added/removed)
     * 
     * @return does not return anything
     * 
     */
    disconnectedCallback() { }

    /**
   * @name observedAttributes (element's life cycle)
   * @function
   * 
   * @description array of attribute names to monitor for changes
   * 
   * @return does not return anything
   * 
   */
    static get observedAttributes() { return [] }

    /**
   * @name attributeChangedCallback (element's life cycle)
   * @function
   * 
   * @description called when one of attributes listed above is modified (the attributes listed in the array returned by the observedAttribues method above)
   * 
   * @return does not return anything
   * 
   */

    attributeChangedCallback(name, oldValue, newValue) { }

    /**
   * @name adoptedCallback (element's life cycle)
   * @function
   * 
   * @description called when the element is moved to a new document
   * 
   * @return does not return anything
   * 
   */
    adoptedCallback() { }
}
customElements.define("auth-login", AuthLogin);
export default AuthLogin