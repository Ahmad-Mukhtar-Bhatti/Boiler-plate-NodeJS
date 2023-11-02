const { performEventLoopDemo } = require('./EventLoop_Blocking/EventLoop_Demo');

////////////////////////////////////////////////////
// Function to handle the Blocking vs Non-Blocking version comparison code
module.exports = function (app) {
    app.get('/event-loop-demo', (req, res) => {
        performEventLoopDemo((err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        // Assuming result contains a property with untrusted data
        const untrustedData = result.someProperty;
        const escapedData = res.locals.escapeHtml(untrustedData);
    
        res.status(200).json({ result });
        });
    });
};
  ////////////////////////////////////////////////////