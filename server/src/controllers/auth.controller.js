const User = require('../models/user.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken, decode } = require('../utils/token');

exports.signup = (req, res) => {
    const { firstname, lastname, email, password, phone } = req.body;
    const hashedPassword = hashPassword(password.trim());

    const user = new User(firstname.trim(), lastname.trim(), email.trim(), hashedPassword, phone);
    console.log(req.body)

    User.create(user, (err, data) => {
        console.log("user---?1", user)
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            const token = generateToken(data.id);
            res.status(201).send({
                status: 200,
                data: {
                    token,
                    data
                }
            });
        }
    });
};

exports.check = (req, res) => {
    var authorization = req.headers.authorization;
    // console.log("authorization++++",authorization)
    var data = decode(authorization)
    console.log("data", data)
    if (data) {
        res.status(200).send({
            status: 200,
            message: data
        });
    } else {
        res.status(200).send({
            status: 500,
            message: "session expired"
        });
    }


};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with email ${email} was not found`
                    , type: "email"
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message,
                type: "email"
            });
            return;
        }
        if (data) {
            if (comparePassword(password.trim(), data.password)) {
                const token = generateToken(data.id);
                res.status(200).send({
                    status: 'success',
                    data: {
                        token,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email,
                        image: data.image
                    }
                });
                return;
            }
            res.status(401).send({
                status: 'error',
                message: 'Incorrect password'
            });
        }
    });

}