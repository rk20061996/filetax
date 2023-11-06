const User = require('../models/user.model');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken, decode } = require('../utils/token');

let logo = 'http://195.35.45.11:9000/images/logo.png'
const WEB_URL = process.env.WEB_URL + "confirm-account"

let emailVerificationLink = "";

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'testemail007filetax@gmail.com', // Your email address
        pass: 'pobd fvnb hvqz isvh' // Your email password or App Password
    }
});


exports.signup = (req, res) => {
    const { firstname, lastname, email, password, phone } = req.body;
    const hashedPassword = hashPassword(password.trim());
    const uniqueString = firstname + "_" + lastname + "_" + uuidv4();;

    const user = new User(firstname.trim(), lastname.trim(), email.trim(), hashedPassword, phone, uniqueString);
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
            // userName = firstname;
            emailVerificationLink = uniqueString;

            sendEmail(firstname, emailVerificationLink, email)
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
                        image: data.image,
                        status: data.status,
                        // unique: data.status
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

const sendEmail = (userName, emailVerificationLink, email) => {
    const link = WEB_URL + '?id=' + emailVerificationLink;

    let signupMail = {
        from: 'testemail007filetax@gmail.com',
        to: email,
        subject: 'Account Verification Email',
        html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Welcome to Our Platform</title><style>body{font-family:Arial,sans-serif;margin:0;padding:0;background-color:#f4f4f4}.container{max-width:600px;margin:0 auto;padding:20px;background-color:#fff;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,.1)}.header{text-align:center;padding:20px 0}.logo{text-align:center;margin-bottom:20px}.message{margin:20px 0;font-size:16px;color:#333}.button{text-align:center;margin-top:20px}.button a{display:inline-block;padding:10px 20px;background-color:#007bff;color:#fff;text-decoration:none;border-radius:5px}</style></head><body><div class="container"><div class="header"><div class="logo"><img src="${logo}"  width="150"></div></div><div class="message"><p>Hello ${userName},</p><p>Thank you for registering on our platform! Please click the button below to confirm your email address and complete the registration process.</p></div><div class="button"><a href="${link}" target="_blank">Confirm Email Address</a></div></div></body></html>`
    };
    transporter.sendMail(signupMail, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

const sendForgotEmail = (userName, emailVerificationLink, email) => {
    const link = process.env.WEB_URL + 'reset-password?id=' + emailVerificationLink;

    let signupMail = {
        from: 'testemail007filetax@gmail.com',
        to: email,
        subject: 'Forgot Password Email',
        html: `<!DOCTYPE html><html><head><title>Password Change Request</title><style>body{font-family:Arial,sans-serif;margin:0;padding:0;background-color:#f4f4f4}.container{max-width:600px;margin:0 auto;padding:20px;background-color:#fff;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,.1)}.header{text-align:center;padding:20px 0}.message{margin:20px 0;font-size:16px;color:#333}.button{text-align:center;margin-top:20px}.button a{display:inline-block;padding:10px 20px;background-color:#007bff;color:#fff;text-decoration:none;border-radius:5px}</style></head><body><div class="container"><div class="header"><img src="${logo}" ></div><div class="message"><p>Hello ${userName},</p><p>We've received a request to change your password. If this wasn't you, please ignore this email or contact support immediately.</p><p>If you made this request, please click the button below to confirm the password change.</p></div><div class="button"><a href="${link}" target="_blank">Confirm Password Change</a></div></div></body></html>`
    };
    transporter.sendMail(signupMail, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};


exports.forgotPassword = (req, res) => {
    const { email } = req.body;
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
            const uniqueString = uuidv4();;
            const dataFormat = {email,uniqueString};

            User.createForgotToken(dataFormat, (err, dat) => {
                if (err) {
                    res.status(500).send({
                        status: "error",
                        message: err.message
                    });
                } else {

                    sendForgotEmail(data.firstname, uniqueString, email)
                    res.status(201).send({
                        status: 200,
                        data: {
                            data
                        }
                    });
                }
            })
        }
    })
}

exports.confirmAccount = (req, res) => {
    const id = req.query.id;
    console.log("id-->", id)
    User.checkConfirmToken(id, (err, data) => {
        if (err) {
            console.log("data-->142", data)

            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `Token expired or invalid`
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
        console.log("data-->", data)
        if (data) {
            console.log("id-->158", id)

            User.updateConfirmToken(id, (err, dat) => {
                if (err) {
                    res.status(500).send({
                        status: "error",
                        message: err.message
                    });
                } else {
                    res.status(201).send({
                        status: 200,
                        data: {
                            dat
                        }
                    });
                }
            });
        }
    });

};

exports.checkForgotToken= (req, res) => {
    const id = req.query.id;
    console.log("id-->", id)
    User.checkForgotToken(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `Token expired or invalid`
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
        console.log("data-->", data)
        if (data) {
            console.log("id-->158", id)
            res.status(201).send({
                status: 200,
                data: {
                    data
                }
            });
        }else{
            res.status(400).send({
                status: 'error',
                message: `Token expired or invalid`
                , type: "email"
            });
        }
    })
}

exports.resetPassword= (req,res) =>{
    const { email, id, password } = req.body;
    const hashedPassword = hashPassword(password.trim());
    User.resetPassword({hashedPassword,email}, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: 200,
                data: {
                    data
                }
            });
        }
    });
}