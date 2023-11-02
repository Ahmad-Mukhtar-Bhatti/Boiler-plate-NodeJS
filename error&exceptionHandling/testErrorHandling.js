const { handleUncaughtExceptions, MyEventEmitter } = require('./errorHandling');



module.exports = function () {
    // Call the function to handle uncaught exceptions
    handleUncaughtExceptions();
    // throw new Error('This is an uncaught exception example');   // This will trigger an uncaughtException event. Uncomment to check


    const emitter = new MyEventEmitter();
    // Listen to errors
    emitter.on('error', (err) => {
    console.error('Emitter Error:', err);
    });

    emitter.someFunction('param1', 'param2');                    // This should work fine as the function expects two parameters
    emitter.someFunction();                                   // This will trigger an error event. Uncomment to check
}