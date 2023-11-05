const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
const authController = require('../controllers/auth.controller');


router.route('/signup')
    .post(signupValidator, asyncHandler(checkEmail), asyncHandler(authController.signup));

router.route('/signin')
    .post(signinValidator, asyncHandler(authController.signin));

router.route('/check')
    .post(asyncHandler(authController.check));

router.route('/confirmAccount')
    .get(asyncHandler(authController.confirmAccount));

router.route('/forgotPassword')
    .post(asyncHandler(authController.forgotPassword));

    

module.exports = router;