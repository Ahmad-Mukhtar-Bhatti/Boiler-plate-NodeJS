
# Node.js Boilerplate

### About
This is a Node.js boilerplate project demonstrating various key features and best practices in application development. This boilerplate serves as both, an educational platform and a boiler plate for the projects that are intended to be done on Node JS. It provides a foundation for building secure and robust Node.js applications.

### Overview:
The codebase is divided into 4 sections, each serving a different purpose within a Node JS project. These sections are: Application Security, Error & Exception handling, Server Security, Platform Security.

The inspiration is taken from the following source and it is recommended to check it for understanding each component in greater detail:
https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#do-not-block-the-event-loop

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Application Security](#application-security)
   - [Flat Promise Chain vs Callback Hell](#flat-promise-chain-vs-callback-hell)
   - [Setting Request Body Size Limits - not done](#setting-request-body-size-limits)
   - [Avoiding Blocking the Event Loop](#avoiding-blocking-the-event-loop)
   - [Performing Input Validation](#performing-input-validation)
   - [Performing Output Escaping](#performing-output-escaping)
   - [Performing Application Activity Logging](#performing-application-activity-logging)
   - [Monitoring the Event Loop](#monitoring-the-event-loop)
   - [Taking Precautions Login Attacks](#taking-precautions-against-login-attacks)
   - [Using Anti-CSRF Tokens](#using-anti-csrf-tokens)
   - [Removing Unnecessary Routes](#removing-unnecessary-routes)
   - [Preventing HTTP Parameter Pollution](#preventing-http-parameter-pollution)
   - [Only Returning What Is Necessary](#only-returning-what-is-necessary)
   - [Using Object Property Descriptors](#using-object-property-descriptors)
   - [Using Access Control Lists](#using-access-control-lists)

- [Error & Exception Handling](#error--exception-handling)
   - [Handling uncaughtException](#handling-uncaughtexception)
   - [Listening to Errors When Using EventEmitter](#listening-to-errors-when-using-eventemitter)
   - [Handle Errors in Asynchronous Calls](#handle-errors-in-asynchronous-calls)

- [Server Security](#server-security)
   - [Setting Cookie Flags Appropriately](#setting-cookie-flags-appropriately)
   - [Using Appropriate Security Headers](#using-appropriate-security-headers)

- [Platform Security](#platform-security)
   - [Keeping Packages Up to Date](#keeping-packages-up-to-date)
   - [Not Using Dangerous Functions](#not-using-dangerous-functions)
   - [Staying Away from Evil Regexes](#staying-away-from-evil-regexes)
   - [Running Security Linters](#running-security-linters)
   - [Using Strict Mode](#using-strict-mode)
   - [Adhering to General Application Security Principles](#adhering-to-general-application-security-principles)


## Features

- **Input Validation**: Comprehensive input validation techniques, including using a list of accepted inputs and escaping dangerous inputs to prevent various types of attacks.

- **Error Handling**: Demonstrates error handling best practices, including handling uncaught exceptions and listening to errors when using EventEmitter.

- **Session Management**: Secure session management with the use of cookies and setting flags such as `httpOnly`, `Secure`, and `SameSite` for enhanced security.

- **Request Rate Limiting**: Protection against brute-force attacks through rate limiting.

- **Middleware Examples**: Various middleware functions for different purposes, including handling server load, preventing HTTP parameter pollution, and escaping HTML entities in response data. Most of these middlewares are ready-to-use, i.e. you can copy-paste these into your application to use them.

- **Other Demonstrations**: Additional features like handling event loops and working with Object Property Descriptors. There are some demonstrations purely for educational purposes where you could just run and observe the effects of certian coding styles. 

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Ahmad-Mukhtar-Bhatti/Boiler-plate-NodeJS.git
   cd Boiler-plate-NodeJS
   ```


## Usage

After setting up the project, you can use it as a reference to understand and implement various aspects of Node.js application development.

## Project Structure

```
|-- applicationSecurtiy/
|   |-- ...
|-- error&ExceptionHandling/
|   |-- ...
|-- loadTesting/
|   |-- ...
|-- public/
|   |-- ...
|-- serverSecurity/
|   |-- ...
|-- test/
|   |-- ...
|-- public/
|   |-- ...
|-- ...
|-- index.js
|-- ...
```

**applicationSecurity:** contains demonstartions related to security of the application.

**error&ExceptionHandling:** contains middlewares to handle uncaught error and exceptions.

**serverSecurity:** contains codebase for securring the server.

**loadTesting:** Contains a file to induce load on the application to test its durability.

**test:** Contains few essential test cases for the appliaction.

**public:** contains html files like index and login mock form, just to demonstrate some middlewares.

**index.js:** This is the main file which calls all the relevant middlewares and integrates them into the application.



## Application Security

All the following files/folders are present inside the applicationSecurity folder in the root directory.

### Flat Promise Chain vs Callback hell

*> This is mainly an educational code.*

There are three main files involved for its demonstration: `PvsC_data-processor.js` and two files in the  `Promise_VS_Callback` folder, namely `dataProcessor.js` and `responseHandler.js`.

The `PvsC_data-processor.js` is just a route handler file which will be triggered on the following address: 
`http://localhost:3000/data-processor`

This will then handover the command to the  `responseHandler.js` file. This file is again mainly built for handling the response of the Callback/Promise code and returns the response to the screen. 

The main file in action is then `dataProcessor.js`. This file contains codes for both, Promises and Callback functions. Both the functions do exactly the same process, the only difference is the implementation and ease of understanding (the output for both is slightly different, i.e. uppercase and lowercase, just for differentiation purposes). The file is well documented for you to understand what is going on and it is clearly visible that a task performed through promises is much cleaner than that by the callback functions.

To toggle between both the implementations, follow the comments in the code below (These codes are placed in the last lines of the file):

```javascript
module.exports = {
  processData: processDataPromise,   // Change this to processDataPromise to use the promise version 
  type: 'promise',                   // Change this to 'promise' to use the promise version
};
```


### Avoiding Blocking the Event Loop


*> This is mainly an educational code.*

The route handler for this code will be `event-loop-demo.js` which is triggerred on the route `http://localhost:3000/event-loop-demo`.

This file handles the control to the `EventLoop_Blocking` folder. This then contains the `EventLoop_Demo.js` file which demonstrates the code. The inspiration for the code is again taken from the example mentioned in the referenced document (link in about section). The file has two functions, `performBlockingDemo` and `performNonBlockingDemo`. Each of the functions try to perform the same operation. a `file.txt` file is present in the same folder, on which the operations are performed. To better understand the functioning, read the referred document. 

Nonetheless, Blocking function shows how the file that is supposed to be read is deleted before it is read and the nonblocking function code performs the functions synchronously, causing the function to run properly.

Change the code below according to the comment to toggle between the codes:

```javascript
module.exports = {performEventLoopDemo: performNonBlockingDemo};       
// Change this to performBlockingDemo to see the difference in the output
```


### Performing Input Validation

*> The code is plug-and-play*

The code demonstrates how a could you potentially validate inputs. The file involved in this is `input-validation.js` and `validate-form.html` in the public folder. The html file is just there to provide a mock UI for the testing. The testing could be done on the following route:\
`http://localhost:3000/input-validate`

Following library import statements are important for its usage:
```javascript
const { body, validationResult } = require('express-validator');
const mongoSanitize = require('express-mongo-sanitize');
```

The major/important lines in the code have `******` infront of them for identification purposes.

an example is follows:

```javascript
app.post('/validate-username', [
        body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'), // *********
    ], (req, res) => {
```

The code above directly checks whether the username entered has min length of 5, and if not, it returns the error message. 



### Performing Ouput Escaping

*> The code is plug-and-play.*

This is a middleware function used to prevent cross-site scripting (XSS) attacks. 

Following library import statement is important for its usage:
```javascript
const escapeHtml = require('escape-html');
```

The demonstartion of the code can be viewed on the following url:
`http://localhost:3000/output-escaping`

The following middleware is the core part of the code:
```javascript
app.use((req, res, next) => {
        res.locals.escapeHtml = escapeHtml;
        next();
    });
```

In the route handler, a random XSS attack string is created and injected into the response.
The following line is what will put a check on the response and filter it if it is an XSS attack:
```javascript
untrustedData = res.locals.escapeHtml(untrustedData);
```

Try commenting the line above and reload your url on the webscreen and you will see how your code becomes prone to the XSS attack. 


### Performing Application Activity Logging

*> This code is purely plug-and-play.*

Logging is essentially a replacement for the console.log() statements that we have to add in the pices of code to catch errors, show errors, or show information. Essentially, anything that you wish to log on the log screen is called logging. The *winston* library provides a much better interface for logging, and hence the following import statement for the library is required:

```javascript
const winston = require('winston');
```

The code for logging is placed in the `logging.js` file where the winston logger is initiated. Since the code is placed in another file and not `index.js`, the following piece of code is written to make the logger globally available:

```javascript
global.logger = logger;
```
Now you can log your statements in any part of your project, e.g. for an information message, you can write the following:

```javascript
logger.info(`Server started on http://localhost:${port}`);
```

Study the code in detail, and refer to online articles or the referred document if you need in-depth understanding of the winston library.


### Monitoring the Event Loop

*> This code is purely plug-and-play.*

This refers to when the application is under heavy load and hence fails to serve the users. The `toobusy-js` monitors the event loop by keeping track of the response time, and when it goes beyond a certain threshold, this module can indicate your server is too busy.

The `toobusy.js` file in our folder is what handles this middleware.

Before moving ahead, you are required to import the library through:

```javascript
const toobusy = require('toobusy-js');
```

Just for demonstration purposes, the maximum allowed lag time is set manually through the following command:

```javascript
toobusy.maxLag(10); 
```

You may remove this line in your actual application, or adjust it according to your needs.

To test the middleware in this file, a `loadTesting` folder is created in the same directory which has the file `loadTest.js`. While you run your main application, run this file in a separate terminal and see how the 'toobusy' module operates. You may manually change the values in the `loadTest.js` file according to the comments to try different loads. Run the file in a separate terminal through these 3 commands:

```
cd applicationSecurity
cd loadTesting
noder loadTest.js
```


### Taking Precautions Login Attacks

*> This code is plug-and-play.*

Since attackers can use brute-forcing as a password guessing attack to obtain account passwords, we need to secure our application against it. Moreover, to further secure automated login attempt, a Captcha validation can be a good strategy.

The main file involved in this is `login-bruteFroce_Captcha.js`. The route for demonstartion is `http://localhost:3000/login`.

To use bruteforcing-prevention module, you need to install and import the following library:

```javascript
const ExpressBrute = require('express-brute');
```
Since you are required to keep a track of the number of requests the time inerval of the requests, you are additionally required to import the following two libraries as well:

```javascript
const session = require('express-session');
const bodyParser = require('body-parser');
```

To use the `ExpressBrute`, firtsly create a brute-force memory for storing requests, add then it as a middleware in the post command, by doing something similar to the following:

```javascript
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);

app.post('/login', bruteforce.prevent, (req, res, next) => {
   ...
}
```

This will automatically identify if there is a brute-force attack being done and prevent the login attempts.

Next, for captcha usage, you will have to install the library and write the following import command:

```javascript
const svgCaptcha = require('svg-captcha');
```

In the codebase, we have created another route, `/captcha-image` where the captcha image is being created and its text is stored in the request body. Now when the login route is called, this image and its text is passed on and displayed on the login screen. Whenever the person enters the Captcha, the code compares it with the expected text and returns true only if the text enter matches the Captcha text. This Captcha image is changed and recreated everytime the session restarts.

To display the UI, `index.html` file in the `public` folder in the main directory is used. 



### Removing Unnecessary Routes

*> This part is purely educational*

It's advisable to ensure that a web application doesn't include any pages or API routes that are not actively utilized by users. This precaution is essential to minimize the potential attack surface for the application. Therefore, in Node.js applications, it's recommended to disable any API routes that are not in use.

### Preventing HTTP Parameter Pollution

*> This part is purely plug-&-play*

HTTP Parameter Pollution (HPP) is a security vulnerability where malicious actors send multiple HTTP parameters with identical names, leading to unpredictable interpretation by your application. Express, in response to this, stores these multiple values in an array. To mitigate this issue, you can employ the "hpp" module. When integrated, this module will disregard all values provided for a specific parameter within req.query and/or req.body, selecting only the last submitted parameter value.

You can use it like the following:
```javascript
const hpp = require('hpp');
app.use(hpp());
```

### Only Returning What Is Necessary

*> This part is purely educational*

Since information of any type can be deemed important or critical, therefore make sure what you return to the user is only what is required. This is mostly true in case of objects, where you should, instead of returning an entire object, only return the values that are required. If this is not followed, you may end up getting attacked if the user requesting is malicious.

### Using Object Property Descriptors

*> This part is plug-&-play*

Object properties include three hidden attributes: *writable*, *enumerable*, and *configurable*. When defining an object property through assignment, these three hidden attributes are set to true by default,but you can change them according to your requirement.

The route responsible for its demonstration is:
`http://localhost:3000/object-descriptor`

The demonstration will open up in the application console screen.

For the example, a user object is defined as follows:

```javascript
const user = {
    username: "john_doe",
    age: 25,
  };
```
In the code, the `username` property in the `user` object is manually modified to *configurable* to false, i.e. it cannot be deleted. Check the code for better understanding.

Since *const* object can still allow the object to be extended. To prevent it from extending, the following line is used:
```javascript
Object.preventExtensions(user);
```

Now, for demonstration, follow the prompts in the command line interface. Try to toggle between these 4 values, 3 from the object property descriptor and 1 from the prevention of the extension. Re-run the page, follow the prompts in the CLI and see how the outputs change.


