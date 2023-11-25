const tax = require('../models/tax.model');


exports.taxInformation= (req,res) =>{
    // const { email, id, password } = req.body;
    const user_id = req.user_id
    // console.log("user_id-->",user_id)
    const {primaryTaxPayer_LastName,primaryTaxPayer_FirstName,primaryTaxPayer_MiddleName,primaryTaxPayer_MaritalStatus,primaryTaxPayer_DateOfMarriage,primaryTaxPayer_DateOfBirth,primaryTaxPayer_SSN_ITIN,primaryTaxPayer_CurrentVisaCategory,primaryTaxPayer_CurrentOccupation,primaryTaxPayer_FirstEntryToUS,spouse_FirstDate,spouse_FirstName,spouse_MiddleName,spouse_MaritalStatus,spouse_DateOfMarriage,spouse_DateOfBirth,spouse_SSN_ITIN,spouse_CurrentVisaCategory,spouse_CurrentOccupation,spouse_FirstEntryToUS,status}  = req.body.primaryTaxPayer

    if(req.body.primaryTaxPayer && req.body.primaryTaxPayer.id){
        console.log("in the game")
        tax.updatePI({id:req.body.primaryTaxPayer.id,primaryTaxPayer_LastName,primaryTaxPayer_FirstName,primaryTaxPayer_MiddleName,primaryTaxPayer_MaritalStatus,primaryTaxPayer_DateOfMarriage,primaryTaxPayer_DateOfBirth,primaryTaxPayer_SSN_ITIN,primaryTaxPayer_CurrentVisaCategory,primaryTaxPayer_CurrentOccupation,primaryTaxPayer_FirstEntryToUS,spouse_FirstDate,spouse_FirstName,spouse_MiddleName,spouse_MaritalStatus,spouse_DateOfMarriage,spouse_DateOfBirth,spouse_SSN_ITIN,spouse_CurrentVisaCategory,spouse_CurrentOccupation,spouse_FirstEntryToUS,status}, (err, data) => {
            // console.log("user---?1", user)
            if (err) {
                res.status(200).send({
                    status: "error",
                    message: err.message
                });
            } else {
                res.status(201).send({
                    status: 200,
                    data: {
                        data
                    }
                });
            }
        });
    }else{
        tax.savePI({user_id,primaryTaxPayer_LastName,primaryTaxPayer_FirstName,primaryTaxPayer_MiddleName,primaryTaxPayer_MaritalStatus,primaryTaxPayer_DateOfMarriage,primaryTaxPayer_DateOfBirth,primaryTaxPayer_SSN_ITIN,primaryTaxPayer_CurrentVisaCategory,primaryTaxPayer_CurrentOccupation,primaryTaxPayer_FirstEntryToUS,spouse_FirstDate,spouse_FirstName,spouse_MiddleName,spouse_MaritalStatus,spouse_DateOfMarriage,spouse_DateOfBirth,spouse_SSN_ITIN,spouse_CurrentVisaCategory,spouse_CurrentOccupation,spouse_FirstEntryToUS,status}, (err, data) => {
            // console.log("user---?1", user)
            if (err) {
                res.status(200).send({
                    status: "error",
                    message: err.message
                });
            } else {
                res.status(201).send({
                    status: 200,
                    data: {
                        data
                    }
                });
            }
        });
    }
}

exports.gettaxInformation=(req,res) =>{
    const user_id = req.user_id

    tax.gettaxInformation({user_id}, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(200).send({
                status: 200,
                data: {
                    data
                }
            });
        }
    });
}

exports.contactDetails=(req,res) =>{
    const user_id = req.user_id

    const {currentStreetAddress,aptNumber,city,state,zipCode,country,emailId,mobileNumber,workNumber,status}  = req.body.contact
    if(req.body.contact && req.body.contact.id){
        // console.log("end game")
        tax.updateContact({id:req.body.contact.id,user_id,currentStreetAddress,aptNumber,city,state,zipCode,country,emailId,mobileNumber,workNumber,status}, (err, data) => {
            // console.log("user---?1", user)
            if (err) {
                res.status(200).send({
                    status: "error",
                    message: err.message
                });
            } else {
                res.status(201).send({
                    status: 200,
                    data: {
                        data
                    }
                });
            }
        });        
    }else{
        tax.saveContact({user_id,currentStreetAddress,aptNumber,city,state,zipCode,country,emailId,mobileNumber,workNumber,status}, (err, data) => {
            // console.log("user---?1", user)
            if (err) {
                res.status(200).send({
                    status: "error",
                    message: err.message
                });
            } else {
                res.status(201).send({
                    status: 200,
                    data: {
                        data
                    }
                });
            }
        });
    }
}

exports.getcontactDetails=(req,res) =>{
    const user_id = req.user_id

    tax.getcontactDetails({user_id}, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(200).send({
                status: 200,
                data: {
                    data
                }
            });
        }
    });
}

exports.dependentDetails=(req,res) =>{
    const user_id = req.user_id

    // const {firstName,middleName,lastName,ssnItin,visaCategory,dateOfBirth,relationship,firstDateOfEntry,dependantCareExpenses,status}  = req.body.dependent
    // if(req.body.dependent && req.body.dependent.id){
    //     // console.log("end game")
    //     tax.updateDependent({id:req.body.dependent.id,user_id,firstName,middleName,lastName,ssnItin,visaCategory,dateOfBirth,relationship,firstDateOfEntry,dependantCareExpenses,status}, (err, data) => {
    //         // console.log("user---?1", user)
    //         if (err) {
    //             res.status(200).send({
    //                 status: "error",
    //                 message: err.message
    //             });
    //         } else {
    //             res.status(201).send({
    //                 status: 200,
    //                 data: {
    //                     data
    //                 }
    //             });
    //         }
    //     });        
    // }else{
    //     tax.savedependent({user_id,firstName,middleName,lastName,ssnItin,visaCategory,dateOfBirth,relationship,firstDateOfEntry,dependantCareExpenses,status}, (err, data) => {
    //         // console.log("user---?1", user)
    //         if (err) {
    //             res.status(200).send({
    //                 status: "error",
    //                 message: err.message
    //             });
    //         } else {
    //             res.status(201).send({
    //                 status: 200,
    //                 data: {
    //                     data
    //                 }
    //             });
    //         }
    //     });
    // }
    console.log("hereerere")
    var bodyDATA= req.body.dependent
    tax.deleteTaxDependentByUserId({user_id}, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: "error",
                message: err.message
            });
        } else {
            console.log("deleted")
            tax.InsertDependentByUserId({user_id,bodyDATA}, (err, data) => {
                // console.log("user---?1", user)
                if (err) {
                    res.status(200).send({
                        status: "error",
                        message: err.message
                    });
                } else {
                    res.status(201).send({
                        status: 200,
                        data: {
                            data
                        }
                    });
                }
            }); 
        }
    }); 
}

exports.getdependentDetails=(req,res) =>{
    const user_id = req.user_id

    tax.getdependentDetails({user_id}, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(200).send({
                status: 200,
                data: {
                    data
                }
            });
        }
    });
}

exports.residencytDetails=(req,res) =>{
    const user_id = req.user_id

    // const {payerStateName1,spouseStateName1,payerResidencyStartDate1,spouseResidencyStartDate1,payerResidencyEndDate1,spouseResidencyEndDate1,payerRentPaidAnnual1,spouseRentPaidAnnual1,payerStateName2,spouseStateName2,payerResidencyStartDate2,spouseResidencyStartDate2,payerResidencyEndDate2,spouseResidencyEndDate2,payerRentPaidAnnual2,spouseRentPaidAnnual2,status}  = req.body.residency
    // if(req.body.residency && req.body.residency.id){
    //     // console.log("end game")
    //     tax.updateresidency({id:req.body.residency.id,payerStateName1,spouseStateName1,payerResidencyStartDate1,spouseResidencyStartDate1,payerResidencyEndDate1,spouseResidencyEndDate1,payerRentPaidAnnual1,spouseRentPaidAnnual1,payerStateName2,spouseStateName2,payerResidencyStartDate2,spouseResidencyStartDate2,payerResidencyEndDate2,spouseResidencyEndDate2,payerRentPaidAnnual2,spouseRentPaidAnnual2,status}, (err, data) => {
    //         // console.log("user---?1", user)
    //         if (err) {
    //             res.status(200).send({
    //                 status: "error",
    //                 message: err.message
    //             });
    //         } else {
    //             res.status(201).send({
    //                 status: 200,
    //                 data: {
    //                     data
    //                 }
    //             });
    //         }
    //     });        
    // }else{
    //     tax.saveresidency({user_id,payerStateName1,spouseStateName1,payerResidencyStartDate1,spouseResidencyStartDate1,payerResidencyEndDate1,spouseResidencyEndDate1,payerRentPaidAnnual1,spouseRentPaidAnnual1,payerStateName2,spouseStateName2,payerResidencyStartDate2,spouseResidencyStartDate2,payerResidencyEndDate2,spouseResidencyEndDate2,payerRentPaidAnnual2,spouseRentPaidAnnual2,status}, (err, data) => {
    //         // console.log("user---?1", user)
    //         if (err) {
    //             res.status(200).send({
    //                 status: "error",
    //                 message: err.message
    //             });
    //         } else {
    //             res.status(201).send({
    //                 status: 200,
    //                 data: {
    //                     data
    //                 }
    //             });
    //         }
    //     });
    // }

    console.log("hereerere")
    var bodyDATA= req.body.residency
    tax.deleteTaxResidentByUserId({user_id}, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: "error",
                message: err.message
            });
        } else {
            console.log("deleted")
            tax.InsertResidentByUserId({user_id,bodyDATA}, (err, data) => {
                // console.log("user---?1", user)
                if (err) {
                    res.status(200).send({
                        status: "error",
                        message: err.message
                    });
                } else {
                    res.status(201).send({
                        status: 200,
                        data: {
                            data
                        }
                    });
                }
            }); 
        }
    }); 
}

exports.getresidencyDetails=(req,res) =>{
    const user_id = req.user_id
    console.log("here in controller")
    tax.getresidencyDetails({user_id}, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(200).send({
                status: 200,
                data: {
                    data
                }
            });
        }
    });
}

exports.updateTaxDocumentStatus = (req,res) =>{
    const user_id = req.user_id
    console.log("here in controller")
    tax.updateTaxDocumentStatus({user_id}, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(200).send({
                status: 200,
                data: {
                    data
                }
            });
        }
    });
}
