
///////////////////////////////////////////////////////////
// Handling Uncaught Exceptions
function handleUncaughtExceptions() {
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      // Perform any necessary cleanup
      // ...
      process.exit(1);
    });
}
///////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////
// Listening to Errors with EventEmitter
const EventEmitter = require('events');
  
class MyEventEmitter extends EventEmitter {
    someFunction(param1, param2) {
        try {
            if (param1 === undefined || param2 === undefined) {             // Mock logic created for testing purposes
                throw new Error('Parameters are missing');
              }
        
              // Your application logic here...
        
              // If everything is fine, emit a success event
            this.emit('success', 'Operation succeeded!');

        } catch (err) {
            this.emit('error', err);
        }
    }
}
///////////////////////////////////////////////////////////






module.exports = { handleUncaughtExceptions, MyEventEmitter };
  