const handleResponse = require("./Promise_VS_Callback/responseHandler");
const { processData, type } = require("./Promise_VS_Callback/dataProcessor");

////////////////////////////////////////////////////
// Function to handle the Callback vs Promise version comparison code
module.exports = function (app) {
    function onRequest(req, res) {
        handleResponse(res, type, processData, processData, res.locals.escapeHtml);
    }
    
    
    app.get('/data-processor', onRequest);
}
////////////////////////////////////////////////////