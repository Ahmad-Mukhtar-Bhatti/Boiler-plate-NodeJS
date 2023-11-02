// logging.js
const winston = require('winston');


// Middleware to log the request method and path //
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log' })
  ],
  level: 'verbose'
});



////////////////////////////////////////////////////

// Make the logger a global function
global.logger = logger;


// Middleware to log the request method and path //
module.exports = function (app) {
  app.use((req, res, next) => {
    res.locals.logger = global.logger; // Make logger accessible in middleware
    next();
  });
};
////////////////////////////////////////////////////

