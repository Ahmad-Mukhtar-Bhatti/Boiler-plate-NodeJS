const hpp = require('hpp');
const express = require("express");

module.exports = function (app) {


    ////////////////////////////////////////////////////
    // Following are the built-in middleware functions to limit the request body sizes
    app.use(express.urlencoded({ extended: true, limit: '1kb' }));
    app.use(express.json({ limit: '1kb' }));
    ////////////////////////////////////////////////////



    ////////////////////////////////////////////////////
    /// Preventing http parameter pollution                     //Failed to test it properly              
    app.use(hpp());
    // Add a route for testing purposes
    app.get('/test-route', (req, res) => {
    console.log('Before hpp:', req.query); // Log query parameters before hpp
    res.status(200).send('Hello, this is a test route!');
    });
    ////////////////////////////////////////////////////

};
