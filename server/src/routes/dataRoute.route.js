const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkUserauth = require('../middlewares/checkUserauth');
// const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
const documentController = require('../controllers/document.controller');

console.log("here we come")

    router.route('/getDocumentName')
    .post(asyncHandler(documentController.getDocumentName));

    router.route('/uploadDocument')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.uploadDocument));

    router.route('/getUploadedDocument')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.getUploadedDocument));

    router.route('/deleteDocument')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.deleteDocument));
    
    router.route('/getUserDataByToken')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.getUserDataByToken));
    
    router.route('/updateProfile')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.updateProfile));
    
    
    
module.exports = router;