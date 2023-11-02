const toobusy = require('toobusy-js');

module.exports = function (app) {


    ////////////////////////////////////////////////////
    /// Middleware to check if the server is too busy ///

    // **************** Run the loadTest.js script in the LoadTesting folder in a separate terminal ****************

    toobusy.maxLag(10);  // Currently a mock value is used. Adjust the value as needed
    app.use(function(req, res, next) {
    if (toobusy()) {

        // log if you see necessary
        global.logger.error("Application paused, Server too busy")
        res.status(503).send("Server Too Busy");

        // process.exit(code)       // Uncomment this to allow the code to exit

    } else {
        next();
    }
    });
    ////////////////////////////////////////////////////
};