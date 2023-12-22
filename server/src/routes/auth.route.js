const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
const authController = require('../controllers/auth.controller');
const checkUserauth = require('../middlewares/checkUserauth');


router.route('/signup')
    .post(signupValidator, asyncHandler(checkEmail), asyncHandler(authController.signup));

router.route('/signin')
    .post(asyncHandler(authController.signin));

router.route('/check')
    .post(asyncHandler(authController.check));

router.route('/confirmAccount')
    .get(asyncHandler(authController.confirmAccount));

router.route('/forgotPassword')
    .post(asyncHandler(authController.forgotPassword));

router.route('/checkForgotToken')
    .get(asyncHandler(authController.checkForgotToken));

router.route('/resetPassword')
    .post(asyncHandler(authController.resetPassword));

router.route('/updatePassword')
    .post(asyncHandler(checkUserauth), asyncHandler(authController.updatePassword));

router.route('/getUserRecords')
    .get(asyncHandler(authController.getUserRecords));

router.route('/contactUs')
    .post(asyncHandler(authController.contactUs));




module.exports = router;