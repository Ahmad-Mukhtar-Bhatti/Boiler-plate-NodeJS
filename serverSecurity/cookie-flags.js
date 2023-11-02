const session = require('express-session');

module.exports = function (app) {

        
    app.use(session({
        secret: 'your-secret-key',
        name: 'cookieName',
        cookie: {
        secure: true,    // Sends the cookie only over HTTPS
        httpOnly: true,   // Ensures the cookie is not accessible via JavaScript (mitigates XSS attacks)
        path: '/user',    // Restricts the cookie to a specific path
        sameSite: true    // Prevents the cookie from being sent in cross-site requests (mitigates CSRF attacks)
        },
        resave: false,
        saveUninitialized: true
    }));
    
    
    
    app.get('/set-session', (req, res) => {
        req.session = req.session || {};
        req.session.user = { username: 'john_doe' };
        res.send('Session set successfully!');
    });
    
    
    app.get('/get-session', (req, res) => {
        console.log('Session:', req.session);
      
        if (req.session && req.session.user) {
          console.log('User:', req.session.user);
          res.send(`Hello, ${req.session.user.username}!`);
        } else {
          console.log('User not found in session');
          res.status(401).send('Unauthorized');
        }
      });
      
    
}