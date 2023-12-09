#!/usr/bin/env node
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
 * Author
 *  @name Ericson S. Weah  
 *  @email afrosintech@gmail.com
 *  @website https://www.afrosintech.com
 *  @github https://github.com/afrosintech
 *  @gitlab https://gitlab.com/afrosintech
 *  @npm https://www.npmjs.com/~afrosintech
 *  @phone +1.385.204.5167
 *
 * @module ModelCommand
 * @kind class
 *
 * @extends Cli
 * @requires Cli
 *
 * @classdesc Model class
 */

const { readdirSync, statSync, promises, createReadStream, existsSync } = require('fs');
const { join } = require('path');

// const Model = require("../../../modules/cli");
// const Model = require('../../src/cli')
const Model = require('../cli')
const couleurs = require('../../../modules/couleurs');
// const HTTPController = require("../../../modules/http-controller");
// const TCPController = require("../../../modules/tcp-controller");

const { Green, Red } = couleurs()
class ModelCommand extends require("../../../modules/cli") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
      if (Object.keys(option).length > 0) {
        Object.keys(option).forEach((key) => { if (!this[key]) this[key] = option[key]; })
      }
    });

    // auto bind methods
    this.autobind(ModelCommand);
    // auto invoke methods
    this.autoinvoker(ModelCommand);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }
  path(path = '', base = join(process.cwd(), './app/models')) {
    return require('path').join(base, path)
  }

  /**
     * @name getFiles
     * @function
     *
     * @param {Object|Array} iterable iterable data to absorb
     * @param {Object} options Options provided to new stream.Readable([options]). By default, Readable.from() will set options.objectMode to true, unless this is explicitly opted out by setting options.objectMode to false.
     * 
     * @description creates readable streams out of iterators.


     * 
     * @return {Base}
     * 
     */
  getFiles(dirPath, arrayOfFiles = []) {
    if (!existsSync(dirPath)) return;
    {
      let files = readdirSync(dirPath)

      if (files) {
        for (let file of files) {
          if (statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = this.getFiles(dirPath + "/" + file, arrayOfFiles)
          } else {
            arrayOfFiles.push(join(__dirname, dirPath, "/", file))
          }
        }
      }
      return arrayOfFiles
    }
  }

  /**
     * @name getFromIterable
     * @function
     *
     * @param {Object|Array} iterable iterable data to absorb
     * @param {Object} options Options provided to new stream.Readable([options]). By default, Readable.from() will set options.objectMode to true, unless this is explicitly opted out by setting options.objectMode to false.
     * 
     * @description creates readable streams out of iterators.


     * 
     * @return {Base}
     * 
     */
  async readdirRecursive(dirPath, files = [], results = [], length = []) {
    try {
      const allFiles = await promises.readdir(dirPath);
      if (allFiles) {
        for await (let file of allFiles) {
          if ((await promises.stat(dirPath + "/" + file)).isDirectory()) {
            files = this.readdirRecursive(dirPath + "/" + file, files, results, length);
          } else {
            // results.push(file)
          }
        }
      }
      return results;
    } catch (error) {
      return error;
    }

  }
  command(index = 0) {
    return process.argv[index];
  }
  methodCommands() {
    return {
      "   --all": "              make model with all: [model_name] [\x1b[36m--all\x1b[0m]",
      "   -a": "                 make model with all: [model_name] [\x1b[36m-a\x1b[0m]",
      "   --controller=": "      make model with model http controller: [model_name] [\x1b[36m--controller=\x1b[0m\x1b[0m]\x1b[4mcontroller_name\x1b[0m",
      "   -c": "                 make model with model http controller: [model_name] [\x1b[36m-c \x1b[0m\x1b[0m]\x1b[4mcontroller_name\x1b[0m",
      "   --tcp": "              make model with model tcp controller: [model_name] [\x1b[36m--controller=\x1b[0m|\x1b[36m-c \x1b[0m\x1b[0m]\x1b[4mcontroller_name\x1b[0m [\x1b[36m--tcp\x1b[0m]",
      "   -t": "                 make model with model tcp controller: [model_name] [\x1b[36m--controller=\x1b[0m|\x1b[36m-c \x1b[0m\x1b[0m]\x1b[4mcontroller_name\x1b[0m [\x1b[36m-t\x1b[0m]",
      "   --migration=": "       make model with model migration: [model_name] [\x1b[36m--migration\x1b[0m]",
      "   -m": "                 make model with model migration: [model_name] [\x1b[36m-m\x1b[0m]",
      "   --schema=": "          make model with model schema: [model_name] [\x1b[36m--schema\x1b[0m]",
      "   -s": "                 make model with model schema: [model_name] [\x1b[36m-s\x1b[0m]",
    };
  }
  man() {
    if (true) {
      console.clear();
      // if (command.length !== 8)
      //   return this.emit("error", {
      //     error: `'${string}' is not command.`,
      //   });


      // \x1b[36m make:model\x1b[0m model_path //[\x1b[36m--list\x1b[0m\x1b[0m]
      let centered = `\x1b[36m NAME\x1b[0m
  \x1b[36m make:model \x1b[0m - Model make:model command details

 \x1b[36mSYNOPSIS \x1b[0m
  \x1b[36m make:model\x1b[0m [model_name] [\x1b[36m--all\x1b[0m|\x1b[36m-a\x1b[0m] | [model_name] [\x1b[36m--migration\x1b[0m|\x1b[36m-m\x1b[0m|\x1b[36m--schema\x1b[0m|\x1b[36m-s\x1b[0m] [\x1b[36m--controller=\x1b[0m|\x1b[36m-c \x1b[0m]\x1b[4mcontroller_name\x1b[0m [\x1b[36m--tcp\x1b[0m|\x1b[36m-t\x1b[0m]

\x1b[36m DESCRIPTION\x1b[0m
   Model method details and method list.

 \x1b[36m  The following options are available: \x1b[0m `;
      this.centered(`\x1b[32m MODEL MAKE:MODEL COMMAND USAGE MANUAL\x1b[0m`);
      this.description(centered);
      this.verticalSpace(1);
      let options = {
        pad: 13,
        position: process.stdout.columns,
        hline: false,
        keyColor: "36",
        valueColor: "37",
      };
      this.texAligner(options, this.methodCommands());
      console.log();
    }
  }
 
  makeModelRouter() {
    switch (this.command(6)) {
      case '--tcp':
        if (this.command(7)) {
          // this.makeModelRouterControllerRouter()
        } else {
          console.log('--tcp')
        }
        break;
      case '-t':
        if (this.command(7)) {
          // this.makeModelRouterControllerRouter()
        } else {
          console.log('-t')
        }
        break;
      case '--route':
        if (this.command(7)) {
          // this.makeModelRouterRouterController()
        } else {
          console.log('--route')
        }
        break;
      case '-r':
        if (this.command(7)) {
          // this.makeModelRouterRouterController()
        } else {
          console.log('-r')
        }
        break;
      default:
        console.log('invalid')
        break;
    }
  }
 
  makeModelRouterC() {
    switch (this.command(6)) {
      case '--tcp':
        if (this.command(7)) {
          // this.makeModelRouterCControllerRouter()
        } else {
          console.log('--tcp')
        }
        break;
      case '-t':
        if (this.command(7)) {
          // this.makeModelRouterCControllerRouter()
        } else {
          console.log('-t')
        }
        break;
      case '--route':
        if (this.command(7)) {
          // this.makeModelRouterCRouterController()
        } else {
          console.log('--route')
        }
        break;
      case '-r':
        if (this.command(7)) {
          // this.makeModelRouterCRouterController()
        } else {
          console.log('-r')
        }
        break;
      default:
        console.log('invalid')
        break;
    }
  }
  
  makeModel() {
    // return console.log('here we go')
    if (this.command(3)) {
      if(this.command(4)){
        const { make } = new Model({ command: this.command(2) });
        // return console.log(new Model)
        make(this.command(3));
        // this.makeModelCommandFour()
      }else{
        const { make } = new Model({ command: this.command(2) });
        make(this.command(3));
        // return console.log(new Model)
      }
    } else {
        console.log(Red('unrecognized command'))
    }
  }

  
  routeOption(command = '-r') {
    if (this.command(5)) {
      switch (this.command(5)) {
        case 'h':
          if (this.command(6)) {
            switch (this.command(6)) {
              case '-c':
                // this.routeControllerOption('-c', command)
                break;
              case '--controller':
                // this.routeControllerOption('--controller', command)
                break;
              default:
                console.log(Red('unrecognized command'))
                break;
            }
          } else {
            console.log(`${this.command(3)} ${command} h`);
          }
          break;
        case 'http':
          if (this.command(6)) {
            switch (this.command(6)) {
              case '-c':
                // this.routeControllerOption('-c', command)
                break;
              case '--controller':
                // this.routeControllerOption('--controller', command)
                break;
              default:
                console.log(Red('unrecognized command'))
                break;
            }
          } else {
            console.log(`${this.command(3)} ${command} http`);
          }
          break;
        case 't':
          if (this.command(6)) {
            switch (this.command(6)) {
              case '-c':
                // this.routeControllerOption('-c', command)
                break;
              case '--controller':
                // this.routeControllerOption('--controller', command)
                break;
              default:
                console.log(Red('unrecognized command'))
                break;
            }
          } else {
            console.log(`${this.command(3)} ${command} t`);
          }
          break;
        case 'tcp':
          if (this.command(6)) {
            switch (this.command(6)) {
              case '-c':
                // this.routeControllerOption('-c', command)
                break;
              case '--controller':
                // this.routeControllerOption('--controller', command)
                break;
              default:
                console.log(Red('unrecognized command'))
                break;
            }
          } else {
            console.log(`${this.command(3)} ${command} tcp`);
          }
          break;
        default:
          console.log(Red('unrecognized command'))
          break;
      }
    } else {
      console.log(command);
    }
  }
  
  createModel(){
    const { make } = new Model({ command: this.command(2) });
      make(this.command(3));
  }
 
  delimiter(string = join(process.cwd(), './app/models/')) {
    return string
  }

  async list() {
    const models = this.getFiles(this.path())
    if (models && models.length) {
      console.log(`\x1b[36m
        MODELS COUNT: ${models.length} 
        =============== \x1b[0m`)
      models.forEach(file => console.log(`\x1b[32m ${file.split(this.delimiter())[1]} \x1b[0m `))
    } else {
      return console.log(Green('There is zero model so far!'))
    }

    //  this.getFiles(this.path()).forEach(file => console.log(`\x1b[32m ${file.split(this.delimiter())[1].split('.js')[0]} \x1b[0m `))
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
    return [];
  }

}

module.exports = ModelCommand;
