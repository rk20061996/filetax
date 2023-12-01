const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkUserauth = require('../middlewares/checkUserauth');
// const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
const documentController = require('../controllers/taxInformation.controller');

console.log("here we come")

    router.route('/taxInformation-update')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.taxInformation));

    
    router.route('/taxInformation-get')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.gettaxInformation));

    router.route('/contact-details-update')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.contactDetails));
    
    router.route('/contact-details-get')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.getcontactDetails));
    
    router.route('/dependent-details-update')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.dependentDetails));
    
    router.route('/dependent-details-get')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.getdependentDetails));
    
    router.route('/residency-details-update')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.residencytDetails));
    
    router.route('/residency-details-get')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.getresidencyDetails));

    router.route('/updateTaxDocumentStatus')
    .post(asyncHandler(checkUserauth),asyncHandler(documentController.updateTaxDocumentStatus));

    
module.exports = router;