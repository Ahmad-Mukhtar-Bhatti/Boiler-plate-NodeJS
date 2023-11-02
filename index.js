const http = require("http");
const express = require("express");
const { handleUncaughtExceptions, MyEventEmitter } = require('./error&exceptionHandling/errorHandling');

const session = require('express-session');



const app = express();
const port = 3000;






///////////// Error and Exception Handling ///////////////

///////////////////////////////////////////////////////////////
handleUncaughtExceptions();
// throw new Error('This is an uncaught exception example');       // This will trigger an uncaughtException event. Uncomment to check


const emitter = new MyEventEmitter();
// Listen to errors
emitter.on('error', (err) => {
  console.error('Emitter Error:', err);
});
emitter.someFunction('param1', 'param2');                         // This should work fine as the function expects two parameters
// emitter.someFunction();                                        // This will trigger an error event. Uncomment to check
///////////////////////////////////////////////////////////////




///////////// Server Security ///////////////

require('./serverSecurity/cookie-flags')(app);







///////////// Application Security ///////////////

require('./applicationSecurtiy/built-in_middlewares')(app);

require('./applicationSecurtiy/logging')(app);

require('./applicationSecurtiy/login-bruteFroce_Captcha')(app);

require('./applicationSecurtiy/toobusy')(app);

require('./applicationSecurtiy/output-escaping')(app);

require('./applicationSecurtiy/objectDescriptorDemo')(app);

require('./applicationSecurtiy/event-loop-demo')(app);

require('./applicationSecurtiy/PvsC_data-processor')(app);

require('./applicationSecurtiy/input-validation')(app);




///////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
  global.logger.info('This is an info log.');
  res.write('Hello World!');
  res.end();
});
///////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////
const server = http.createServer(app);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
module.exports = { app, server };
///////////////////////////////////////////////////////////////