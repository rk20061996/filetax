const db = require('../config/db.config');
const { createNewUser: createNewUserQuery, findUserByEmail: findUserByEmailQuery,checkConfirmToken:checkConfirmToken,updateConfirmToken:updateConfirmToken,createForgotToken:createForgotToken } = require('../database/queries');
const { logger } = require('../utils/logger');

class User {
    constructor(firstname, lastname, email, password, phone, uniqueString) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.uniqueString = uniqueString;
    }

    static create(newUser, cb) {
        console.log("newUser--->",newUser)
        // console.log("uniqueString",uniqueString)
        db.query(createNewUserQuery, 
            [
                newUser.firstname, 
                newUser.lastname, 
                newUser.email, 
                newUser.password,
                newUser.phone,
                newUser.uniqueString
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    email: newUser.email,
                    phone: newUser.phone
                });
        });
    }

    static findByEmail(email, cb) {
        db.query(findUserByEmailQuery, email, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static checkConfirmToken(id,cb){
        console.log("id-->58",id)
        db.query(checkConfirmToken, id, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static updateConfirmToken(id,cb){
        console.log("id--73",id)
        db.query(updateConfirmToken, id, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            // console.log("resCheck",res.length)
            // if (res.length) {
                cb(null, res[0]);
                return;
            // }
            cb({ kind: "not_found" }, null);
        })
    }

    static createForgotToken(data,cb){
        // console.log("id--73",id)
        db.query(createForgotToken, [data.email,data.uniqueString], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            // console.log("resCheck",res.length)
            // if (res.length) {
                cb(null, res[0]);
                return;
            // }
            cb({ kind: "not_found" }, null);
        })
    }

    
}

module.exports = User;