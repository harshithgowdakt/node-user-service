# Node-User-Service:

A service to manage the users. 

# Note
 Read this file preview mode. Open this file and press `Ctrl+shift+v` to view in preview mode in VS code. And if you find this document is old and needs to be updated, please update this document don't just ingore it.
 
# Table of contents
  * [Quick Start](#Quick-Start)

  * [Installation](#Installation)
    * [Prerequisite](#prerequisite)
    * [Setup Code](#Setup-Code)
    * [Start Service](#Start-Service)

  * [Project Structure](#Project-Structure)

# Quick-Start:

1. Run `npm run setup` to install depedencies.

2. Run `npm run build` to transpile ts files to js files.

3. Run `npm start` to start main.


# Installation
## Prerequisite
1. All the steps and commands mentioned in this documetation are tested in ubuntu 18.04.5LTS, below mentioned steps may not work as expected in other platforms like windows or other distribution of linux.

2. This service runs on [node.js](https://nodejs.org/en/) and requires [npm](https://www.npmjs.com/) to manage the packages, at the time of creating this documentation this service runs on node.js verion 10.24.1 and requires npm 6.14.12. Make sure specified version of node.js and npm is installed in our machine.

3. This service uses [mysql](https://www.mysql.com/) as primary database, make sure mysql is installed and running on port 3306.

4. create database with the name `user_service`.

## Setup-Code

1. Installing node_modules, run below command to install node_modules

    ```bash
    $ npm run setup
    ```

    Above command is a [npm script](https://docs.npmjs.com/cli/v7/using-npm/scripts) which installs the node_modules. If you don't know how npm scripts works, we highly recommand you to go through this [link](https://docs.npmjs.com/cli/v7/using-npm/scripts) and understand npm scripts before running the command.

5. After installing node_modules we need to transpile TypeScript files to JavaScript files. If you don't know why we need to transpile TypeScript files to JavaScript files, find the documetation in this [link](https://www.typescriptlang.org/) and understand why we need to transpile TypeScript files to JavaScipt files. Once you understood, run the following command below commad to transpile TypeScript files.

    ```bash
    $ npm run build
    ```

## Start-Service

1. We assume that you have completed steps mentioned [Prerequisite](#prerequisite), [Setup Code](#Setup-Code), otherwise there will be issues in starting the service.

2. To start main run below command

    ```bash
    $ npm start
    ```
3. We can also start service using pm2. If you don't know what is pm2, read about pm2 in this [link](https://pm2.keymetrics.io/).

4. To start both service using pm2 run below command.
    ```bash
    $ node bin/start.js
    ```

5. You can check the logs, restart, stop and delete the services using pm2 commands, check the commands in link mentioned in step  3.

