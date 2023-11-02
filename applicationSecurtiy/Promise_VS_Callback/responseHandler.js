function handleResponse(res, type, processDataCallback, processDataPromise) {
    if (type === 'callback') {
        processDataCallback((err, processedData) => {
            if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.write('Internal Server Error');
            res.end();
            } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(processedData));
            res.end();
            }
        });
    } else if (type === 'promise') {
        processDataPromise()
            .then(processedData => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(processedData));
            res.end();
            })
            .catch(err => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.write('Internal Server Error');
            res.end();
            });
    }
  }
  
  module.exports = handleResponse;
  