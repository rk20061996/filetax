const { generate: generateToken, decode } = require('../utils/token');

const checkUserauth =  (req, res, next) => {
    var authorization = req.headers.authorization;
    // console.log("authorization++++",authorization)
    var data = decode(authorization)
    console.log("dataAdminmiddle", data)

    if (data) {
        req.user_id = data.id
        next();
    } else {
        res.status(200).send({
            status: 500,
            message: "session expired"
        });
    }
}

module.exports = checkUserauth;