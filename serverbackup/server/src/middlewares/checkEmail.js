const User = require('../models/user.model');

const checkEmail =  (req, res, next) => {
    const { email } = req.body;
    User.findByEmail(email, (_, data) => {
        if (data) {
            res.status(400).send({
                status: 'error',
                message: `A user with email address '${email}' already exits`,
                type:"email"
            });
            return;
        }
        next();
    });
}

module.exports = checkEmail;