const db = require('../config/db.config');
const { savePI: savePI, gettaxInformation: gettaxInformation, updatePI: updatePI, saveContact: saveContact, getcontactDetails: getcontactDetails, updateContact: updateContact, savedependent: savedependent, getdependentDetails: getdependentDetails, updateDependent: updateDependent, saveresidency: saveresidency, getresidencyDetails: getresidencyDetails, updateResidency: updateResidency } = require('../database/taxqueries');
const { logger } = require('../utils/logger');

class Document {
    constructor() { }


    static savePI(data, cb) {
        console.log("herererere--->updateprofile", data)

        db.query(savePI,
            [
                data.user_id, data.primaryTaxPayer_LastName, data.primaryTaxPayer_FirstName, data.primaryTaxPayer_MiddleName, data.primaryTaxPayer_MaritalStatus, data.primaryTaxPayer_DateOfMarriage, data.primaryTaxPayer_DateOfBirth, data.primaryTaxPayer_SSN_ITIN, data.primaryTaxPayer_CurrentVisaCategory, data.primaryTaxPayer_CurrentOccupation, data.primaryTaxPayer_FirstEntryToUS, data.spouse_FirstDate, data.spouse_FirstName, data.spouse_MiddleName, data.spouse_MaritalStatus, data.spouse_DateOfMarriage, data.spouse_DateOfBirth, data.spouse_SSN_ITIN, data.spouse_CurrentVisaCategory, data.spouse_CurrentOccupation, data.spouse_FirstEntryToUS, 1
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    data,

                });
                // cb({ kind: "not_found" }, null);
            })
    }

    static gettaxInformation(data, cb) {
        console.log("herererere--->updateprofile", data)

        db.query(gettaxInformation,
            [
                data.user_id
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    res,

                });
                // cb({ kind: "not_found" }, null);
            })
    }

    static updatePI(data, cb) {
        console.log("updatePI--->updateprofile", data)

        db.query(updatePI,
            [
                data.primaryTaxPayer_LastName, data.primaryTaxPayer_FirstName, data.primaryTaxPayer_MiddleName, data.primaryTaxPayer_MaritalStatus, data.primaryTaxPayer_DateOfMarriage, data.primaryTaxPayer_DateOfBirth, data.primaryTaxPayer_SSN_ITIN, data.primaryTaxPayer_CurrentVisaCategory, data.primaryTaxPayer_CurrentOccupation, data.primaryTaxPayer_FirstEntryToUS, data.spouse_FirstDate, data.spouse_FirstName, data.spouse_MiddleName, data.spouse_MaritalStatus, data.spouse_DateOfMarriage, data.spouse_DateOfBirth, data.spouse_SSN_ITIN, data.spouse_CurrentVisaCategory, data.spouse_CurrentOccupation, data.spouse_FirstEntryToUS, 1, data.id
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    res,

                });
                // cb({ kind: "not_found" }, null);
            })
    }

    static saveContact(data, cb) {
        // console.log("herererere--->updateprofile", data)

        db.query(saveContact,
            [
                data.user_id, data.currentStreetAddress, data.aptNumber, data.city, data.state, data.zipCode, data.country, data.emailId, data.mobileNumber, data.workNumber, 1
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    data,

                });
                // cb({ kind: "not_found" }, null);
            })
    }

    static getcontactDetails(data, cb) {
        console.log("getcontactDetails--->updateprofile", data)

        db.query(getcontactDetails,
            [
                data.user_id
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    res,

                });
                // cb({ kind: "not_found" }, null);
            })
    }

    static updateContact(data, cb) {
        db.query(updateContact,
            [
                data.currentStreetAddress, data.aptNumber, data.city, data.state, data.zipCode, data.country, data.emailId, data.mobileNumber, data.workNumber, 1, data.id
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    data,

                });
                // cb({ kind: "not_found" }, null);
            })
    }

    static savedependent(data, cb) {
        // console.log("herererere--->updateprofile", data)

        db.query(savedependent,
            [
                data.user_id, data.firstName, data.middleName, data.lastName, data.ssnItin, data.visaCategory, data.dateOfBirth, data.relationship, data.firstDateOfEntry, data.dependantCareExpenses, 1
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    data,

                });
                // cb({ kind: "not_found" }, null);
            })
    }

    static getdependentDetails(data, cb) {
        console.log("herererere--->updateprofile", data)

        db.query(getdependentDetails,
            [
                data.user_id
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    res,

                });
                // cb({ kind: "not_found" }, null);
            })
    }

    static updateDependent(data, cb) {
        db.query(updateDependent,
            [
                data.firstName, data.middleName, data.lastName, data.ssnItin, data.visaCategory, data.dateOfBirth, data.relationship, data.firstDateOfEntry, data.dependantCareExpenses, 1, data.id
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    data,

                });
                // cb({ kind: "not_found" }, null);
            })
    }

    static saveresidency(data, cb) {
        // console.log("herererere--->updateprofile", data)

        db.query(saveresidency,
            [
                data.user_id, data.payerStateName1, data.spouseStateName1, data.payerResidencyStartDate1, data.spouseResidencyStartDate1, data.payerResidencyEndDate1, data.spouseResidencyEndDate1, data.payerRentPaidAnnual1, data.spouseRentPaidAnnual1, data.payerStateName2, data.spouseStateName2, data.payerResidencyStartDate2, data.spouseResidencyStartDate2, data.payerResidencyEndDate2, data.spouseResidencyEndDate2, data.payerRentPaidAnnual2, data.spouseRentPaidAnnual2, 1
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    data,
                });
                // cb({ kind: "not_found" }, null);
            })
    }

    static getresidencyDetails(data, cb) {
        console.log("herererere--->updateprofile", data)

        db.query(getresidencyDetails,
            [
                data.user_id
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    res,

                });
                // cb({ kind: "not_found" }, null);
            })
    }

    static updateresidency(data, cb) {
        db.query(updateResidency,
            [
                data.payerStateName1, data.spouseStateName1, data.payerResidencyStartDate1, data.spouseResidencyStartDate1, data.payerResidencyEndDate1, data.spouseResidencyEndDate1, data.payerRentPaidAnnual1, data.spouseRentPaidAnnual1, data.payerStateName2, data.spouseStateName2, data.payerResidencyStartDate2, data.spouseResidencyStartDate2, data.payerResidencyEndDate2, data.spouseResidencyEndDate2, data.payerRentPaidAnnual2, data.spouseRentPaidAnnual2, 1, data.id
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    data,

                });
                // cb({ kind: "not_found" }, null);
            })
    }



    static updateTaxDocumentStatus(data, cb) {
        console.log("herererere--->updateprofile", data);

        const query1 = 'UPDATE taxpayers SET status = 2 WHERE user_id = ?;';
        const query2 = 'UPDATE taxcontactdetails SET status = 2 WHERE user_id = ?;';
        const query3 = 'UPDATE taxdependentdetails SET status = 2 WHERE user_id = ?;';
        const query4 = 'UPDATE residencydetails SET status = 2 WHERE user_id = ?;';

        db.query(query1, [data.user_id], (err1, res1) => {
            if (err1) {
                logger.error(err1.message);
                cb(err1, null);
                return;
            }

            db.query(query2, [data.user_id], (err2, res2) => {
                if (err2) {
                    logger.error(err2.message);
                    cb(err2, null);
                    return;
                }

                db.query(query3, [data.user_id], (err3, res3) => {
                    if (err3) {
                        logger.error(err3.message);
                        cb(err3, null);
                        return;
                    }

                    db.query(query4, [data.user_id], (err4, res4) => {
                        if (err4) {
                            logger.error(err4.message);
                            cb(err4, null);
                            return;
                        }

                        cb(null, {
                            res1,
                            res2,
                            res3,
                            res4
                        });
                    });
                });
            });
        });
    }


    static deleteTaxDependentByUserId(data, cb) {
        console.log("herererere--->updateprofile", data);

        const query1 = 'delete from  taxdependentdetails  WHERE user_id = ?;';

        db.query(query1, [data.user_id], (err1, res1) => {
            if (err1) {
                logger.error(err1.message);
                cb(err1, null);
                return;
            }

            cb(null, {
                res1,
            });
        });

    }

    static deleteTaxResidentByUserId(data, cb) {
        console.log("herererere--->updateprofile", data);

        const query1 = 'delete from  residencydetails  WHERE user_id = ?;';

        db.query(query1, [data.user_id], (err1, res1) => {
            if (err1) {
                logger.error(err1.message);
                cb(err1, null);
                return;
            }

            cb(null, {
                res1,
            });
        });

    }

    

    static InsertDependentByUserId(data, cb) {
        console.log("herererere--->updateprofile", data);
    
        var bodyData = data.bodyDATA;
    
        for (let i = 0; i < bodyData.length; i++) {
            let query1 = 'INSERT INTO `taxdependentdetails` (`user_id`, `firstName`, `middleName`, `lastName`, `ssnItin`, `visaCategory`, `dateOfBirth`, `relationship`, `firstDateOfEntry`, `dependantCareExpenses`, `status`, `created_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, current_timestamp())';
            
            let values = [
                data.user_id,
                bodyData[i].firstName,
                bodyData[i].middleName,
                bodyData[i].lastName,
                bodyData[i].ssnItin,
                bodyData[i].visaCategory,
                bodyData[i].dateOfBirth,
                bodyData[i].relationship,
                bodyData[i].firstDateOfEntry,
                bodyData[i].dependantCareExpenses
            ];
    
            db.query(query1, values, (err1, res1) => {
                if (err1) {
                    logger.error(err1.message);
                    cb(err1, null);
                    return;
                }
            });
        }
    
        cb(null, { message: 'Dependents inserted successfully' });
    }

    static InsertResidentByUserId(data, cb) {
        console.log("herererere--->updateprofile", data);
    
        var bodyData = data.bodyDATA;
    
        for (let i = 0; i < bodyData.length; i++) {
            let query1 = 'INSERT INTO `residencydetails` (`user_id`, `payerStateName1`, `spouseStateName1`, `payerResidencyStartDate1`, `spouseResidencyStartDate1`, `payerResidencyEndDate1`, `spouseResidencyEndDate1`, `payerRentPaidAnnual1`, `spouseRentPaidAnnual1`, `payerStateName2`, `spouseStateName2`, `payerResidencyStartDate2`, `spouseResidencyStartDate2`, `payerResidencyEndDate2`, `spouseResidencyEndDate2`, `payerRentPaidAnnual2`, `spouseRentPaidAnnual2`, `status`, `created_at`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, current_timestamp());';
            
            let values = [
                data.user_id,
                bodyData[i].payerStateName1,
                bodyData[i].spouseStateName1,
                bodyData[i].payerResidencyStartDate1,
                bodyData[i].spouseResidencyStartDate1,
                bodyData[i].payerResidencyEndDate1,
                bodyData[i].spouseResidencyEndDate1,
                bodyData[i].payerRentPaidAnnual1,
                bodyData[i].spouseRentPaidAnnual1,
                bodyData[i].payerStateName2,
                bodyData[i].spouseStateName2,
                bodyData[i].payerResidencyStartDate2,
                bodyData[i].spouseResidencyStartDate2,
                bodyData[i].payerResidencyEndDate2,
                bodyData[i].spouseResidencyEndDate2,
                bodyData[i].payerRentPaidAnnual2,
                bodyData[i].spouseRentPaidAnnual2
            ];
    
            db.query(query1, values, (err1, res1) => {
                if (err1) {
                    logger.error(err1.message);
                    cb(err1, null);
                    return;
                }
            });
        }
    
        cb(null, { message: 'Residency details inserted successfully' });
    }
    
    
}
module.exports = Document;