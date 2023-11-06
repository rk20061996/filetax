const { DB_NAME } = require('../utils/secrets')

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUSers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

const createNewUser = `
INSERT INTO users VALUES(null, ?, ?, ?, ?,?, NOW(),'',0,?)
`;

const findUserByEmail = `
SELECT * FROM users WHERE email = ?
`;
const checkConfirmToken = `
SELECT * FROM users WHERE email_confirmation_id = ?
`;
const updateConfirmToken = `Update users set email_confirmation_id='' , status = 1 where email_confirmation_id = ?`

const createForgotToken = `
INSERT INTO forgot_password VALUES(null, ?, ?)
`;


const checkForgotToken = `SELECT * FROM forgot_password WHERE token_key = ?`

const resetPassword = `Update users set password= ?  where email = ?`

const resetForgotPasswordKey = `delete from forgot_password where email = ?`

module.exports = {
    createDB,
    dropDB,
    createTableUSers,
    createNewUser,
    findUserByEmail,
    checkConfirmToken,
    updateConfirmToken,
    createForgotToken,
    checkForgotToken,
    resetPassword,
    resetForgotPasswordKey
};
