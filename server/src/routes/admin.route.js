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



module.exports = router;