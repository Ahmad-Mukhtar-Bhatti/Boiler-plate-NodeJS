    const escapeHtml = require('escape-html');


////////////////////////////////////////////////////
// Middleware to escape HTML entities in response data
module.exports = function (app) {
    app.use((req, res, next) => {                           // This middleware is the actually imortant piece of code
        res.locals.escapeHtml = escapeHtml;
        next();
    });
    // Function to test output escaping
    app.get('/output-escaping', (req, res) => {
        var untrustedData = '<script>alert("XSS attack!");</script>';
        
        // Comment the following piece of code to see the difference in the output incase of XSS attack
        // Converting the untrusted data to HTML entities
        untrustedData = res.locals.escapeHtml(untrustedData);
    
        // Inject untrusted data directly into the response
        res.send(`<p>${untrustedData}</p>`);
    });
};
  ////////////////////////////////////////////////////