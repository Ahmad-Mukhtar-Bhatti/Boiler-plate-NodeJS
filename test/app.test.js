// test/app.test.js
const request = require('supertest');
const { app, server } = require('../index'); // Adjust the path accordingly

describe('Testing /test-route with hpp middleware', () => {
  // Test case
  it('should respond with 200', (done) => {
    request(app)
      .get('/test-route?param=value1&param=value2&param[subparam]=value1&param[subparam]=value2&param[]=value3')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  // Close the server after tests
  after(() => {
    server.close();
  });
});
