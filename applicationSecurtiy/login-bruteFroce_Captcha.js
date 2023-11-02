const ExpressBrute = require('express-brute');
const svgCaptcha = require('svg-captcha');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');



////////////////////////////////////////////////////
/////// Stopping brute forcing and Generating Captcha ////////
module.exports = function (app) {

    app.use(bodyParser.urlencoded({ extended: true }));     // This middleware is responsible for parsing incoming requests with URL-encoded payloads.

    app.use(session({                                       // This middleware sets up the use of sessions in your Express application.
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
    }));

    const store = new ExpressBrute.MemoryStore();
    const bruteforce = new ExpressBrute(store);

    // Captcha generation route
    app.get('/captcha-image', (req, res) => {
        const captcha = svgCaptcha.create();
        req.session.captcha = captcha.text;
        res.type('svg');
        res.status(200).send(captcha.data);
    });





    app.get('/login', (req, res) => {
        const filePath = path.join(__dirname, '../public/index.html');
        res.sendFile(filePath);
    });

    // Custom middleware for captcha verification and bruteforce handling
    app.post('/login', bruteforce.prevent, (req, res, next) => {
        try {

            const userEnteredCaptcha = req.body.captcha;
            if (!userEnteredCaptcha || userEnteredCaptcha !== req.session.captcha) {
                console.log('Invalid captcha');
                return res.status(400).send('Invalid captcha. Please try again.');
            }

            // Your login logic goes here
            console.log('Login logic goes here');
            res.send('Success!');
        } catch (error) {
            next(error);
        }
    });
};
////////////////////////////////////////////////////
