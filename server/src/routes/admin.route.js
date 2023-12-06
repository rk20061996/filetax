const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const adminController = require('../controllers/admin.controller');
const checkAdminauth = require('../middlewares/checkAdminauth');

router.route('/get-all-user')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.getAllUser));

router.route('/get-single-user')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.getSingleUser));

router.route('/taxInformation-get')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.taxInformationget));

router.route('/contact-details-get')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.contactDetailsGet));

router.route('/dependent-details-get')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.dependentDetailsGet));

router.route('/residency-details-get')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.residencyDetailsGet));

router.route('/taxInformation-update')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.updateTaxInformation));

router.route('/contact-details-update')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.updateContactDetails));

router.route('/dependent-details-update')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.updateDependencyDetails));

router.route('/residency-details-update')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.updateResidencyDetails));

router.route('/user-uploaded-document')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.userUploadedDocument));

router.route('/uploadDocument')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.uploadDocumentFromAdmin));

router.route('/uploadTaxDraft')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.uploadTaxDraft));

router.route('/getTaxDraftDocument')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.getTaxDraftDocument));

router.route('/deleteTaxDocument')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.deleteTaxDocument));

router.route('/updateStatus')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.updateStatus));


router.route('/updateDynamicUserId')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.updateDynamicUserId));

router.route('/rejectUploadedDoc')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.rejectUploadedDoc));

router.route('/getAllUploadedDocument')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.getAllUploadedDocument));

router.route('/getAllNotification')
    .post(asyncHandler(checkAdminauth), asyncHandler(adminController.getAllNotification));



module.exports = router;