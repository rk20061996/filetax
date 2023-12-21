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

    router.route('/updateDocument')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.updateDocument));


    router.route('/getUploadedDocument')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.getUploadedDocument));

    router.route('/getAllTaxReturnDocument')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.getAllTaxReturnDocument));
    
    router.route('/changeStatusTaxReturnDocument')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.changeStatusTaxReturnDocument));
    

    router.route('/deleteDocument')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.deleteDocument));
    
    router.route('/getUserDataByToken')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.getUserDataByToken));
    
    router.route('/updateProfile')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.updateProfile));
    
    router.route('/getMessage')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.getMessage));

    router.route('/setMessage')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.setMessage));

    router.route('/setOnRead')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.setOnRead));

    // router.route('/getAllMessage')
    // .post(asyncHandler(documentController.getAllMessage));
    
        
    
module.exports = router;