const { body, validationResult } = require('express-validator');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');


module.exports = function (app) {

    // Express Mongo Sanitize middleware
    app.use(mongoSanitize());           // ********


    app.post('/validate-username', [
        body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'), // *********
    ], (req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
    
        // Process the validated data
        const { username } = req.body;
    
        res.send('Validation successful!');
    });
        
    const validator = require('validator');
    
    app.post('/validate-email', (req, res) => {
        const email = req.body.email;
    
        if (!validator.isEmail(email)) {        // ***************
        return res.status(400).json({ error: 'Invalid email address' });
        }
    
        // Process the valid input
        res.json({ message: `Email ${email} is valid!` });
    });
    
    
    ///////////////////////////////////////////////////////////////
    app.get('/input-validate', (req, res) => {
        const filePath = path.join(__dirname, '../public/validate-form.html');
        res.sendFile(filePath);
    });
    ///////////////////////////////////////////////////////////////
        
};