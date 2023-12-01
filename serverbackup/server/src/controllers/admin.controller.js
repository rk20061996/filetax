const document = require('../models/document.model');
const admin = require('../models/admin.model');
const taxInformtaion = require('../models/tax.model');

const multer = require('multer');


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // Set the destination folder where uploaded files will be stored
//         const build_type = process.env.build
//         if(build_type === 'dev'){
//             cb(null, 'public/uploads/');
//         }else{
//             cb(null, 'build/uploads/');
//         }
//     },
//     filename: function (req, file, cb) {
//         // Set the file name after upload (you can customize this)
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
const generateStorage = (type) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            const build_type = process.env.build;
            let destinationFolder = 'public/uploads/'; // Default destination

            if (build_type === 'prod') {
                destinationFolder = 'build/uploads/';
            }
            // console.log("type---check.",type)
            if (type === 'profilePicture') {
                    destinationFolder = 'public/uploads/profile/'; // Default destination

                if (build_type === 'prod') {
                    destinationFolder = 'build/uploads/profile/';
                }
            }

            cb(null, destinationFolder);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });
};

const upload = multer({ storage: generateStorage('file') });
const uploadTaxDraft = multer({ storage: generateStorage('file') });

exports.uploadDocumentFromAdmin = (req, res) => {
    console.log("iiimmsdf")
    upload.single('file')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).send(err.message);
        } else if (err) {
            return res.status(500).send(err.message);
        }

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        console.log("req.file.originalname", req.file.originalname, req.file.filename)
        // console.log("reqData",req.body.taxType,req.user_id)
        // const { taxType, user_id, email, password, phone } = req.body;
        const document_type_id = req.body.taxType
        const user_id = req.body.id
        const filename = req.file.filename
        const selectedTaxcomment = req.body.selectedTaxcomment
        const data = new document(document_type_id.trim(), user_id, filename.trim(), selectedTaxcomment);

        document.uploadDocumentQuery(data, (err, dat) => {
            // console.log("user---?1", user)
            if (err) {
                res.status(200).send({
                    status: 500,
                    message: err.message
                });
            } else {
                // console.log("reqData",req.body)
                res.status(200).send({
                    status: 200,
                    data: dat
                });
            }
        });
    });
};

exports.uploadTaxDraft = (req,res) =>{
    uploadTaxDraft.single('file')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).send(err.message);
        } else if (err) {
            return res.status(500).send(err.message);
        }

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        console.log("req.file.originalname", req.file.originalname, req.file.filename)
        // console.log("reqData",req.body.taxType,req.user_id)
        // const { taxType, user_id, email, password, phone } = req.body;
        // const document_type_id = req.body.taxType
        const user_id = req.body.id
        const filename = req.file.filename
        // const selectedTaxcomment = req.body.selectedTaxcomment
        // const data = new document(document_type_id.trim(), user_id, filename.trim(), selectedTaxcomment);

        admin.uploadTaxDraft({user_id,filename}, (err, dat) => {
            // console.log("user---?1", user)
            if (err) {
                res.status(200).send({
                    status: 500,
                    message: err.message
                });
            } else {
                // console.log("reqData",req.body)
                res.status(200).send({
                    status: 200,
                    data: dat
                });
            }
        });
    });
}

exports.getAllUser = (req, res) => {
    document.getUserDataByToken({ user_id: req.user_id }, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: 500,
                message: err.message
            });
        } else {
            console.log("dataAdmin",req.body)
            if(data[0].user_type == 1){
                admin.getAllUser({ user_id: req.user_id,status_id:req.body.filterStatus }, (err, data) => {
                    // console.log("user---?1", user)
                    if (err) {
                        res.status(200).send({
                            status: 500,
                            message: err.message
                        });
                    } else {
                        res.status(201).send({
                            status: 200,
                            data: data
                        });
                    }
                });
            }else{
                res.status(200).send({
                    status: 500,
                    message: "Not an Admin"
                });
            }
            // res.status(201).send({
            //     status: 200,
            //     data: data
            // });
        }
    });
};


exports.getSingleUser = (req,res) =>{
    document.getUserDataByToken({ user_id: req.user_id }, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: 500,
                message: err.message
            });
        } else {
            console.log("dataAdmin",)
            if(data[0].user_type == 1){
                admin.getSingleUser({ id: req.body.id }, (err, data) => {
                    // console.log("user---?1", user)
                    if (err) {
                        res.status(200).send({
                            status: 500,
                            message: err.message
                        });
                    } else {
                        res.status(201).send({
                            status: 200,
                            data: data
                        });
                    }
                });
            }else{
                res.status(200).send({
                    status: 500,
                    message: "Not an Admin"
                });
            }
            // res.status(201).send({
            //     status: 200,
            //     data: data
            // });
        }
    });
}


exports.taxInformationget = (req,res) =>{
    document.getUserDataByToken({ user_id: req.user_id }, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: 500,
                message: err.message
            });
        } else {
            console.log("dataAdmin",)
            if(data[0].user_type == 1){
                taxInformtaion.gettaxInformation({ user_id: req.body.id }, (err, data) => {
                    // console.log("user---?1", user)
                    if (err) {
                        res.status(200).send({
                            status: 500,
                            message: err.message
                        });
                    } else {
                        res.status(201).send({
                            status: 200,
                            data: data
                        });
                    }
                });
            }else{
                res.status(200).send({
                    status: 500,
                    message: "Not an Admin"
                });
            }
            // res.status(201).send({
            //     status: 200,
            //     data: data
            // });
        }
    });
}

exports.contactDetailsGet = (req,res) =>{
    document.getUserDataByToken({ user_id: req.user_id }, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: 500,
                message: err.message
            });
        } else {
            console.log("dataAdmin",)
            if(data[0].user_type == 1){
                taxInformtaion.getcontactDetails({ user_id: req.body.id }, (err, data) => {
                    // console.log("user---?1", user)
                    if (err) {
                        res.status(200).send({
                            status: 500,
                            message: err.message
                        });
                    } else {
                        res.status(201).send({
                            status: 200,
                            data: data
                        });
                    }
                });
            }else{
                res.status(200).send({
                    status: 500,
                    message: "Not an Admin"
                });
            }
            // res.status(201).send({
            //     status: 200,
            //     data: data
            // });
        }
    });
}

exports.dependentDetailsGet = (req,res) =>{
    document.getUserDataByToken({ user_id: req.user_id }, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: 500,
                message: err.message
            });
        } else {
            console.log("dataAdmin",)
            if(data[0].user_type == 1){
                taxInformtaion.getdependentDetails({ user_id: req.body.id }, (err, data) => {
                    // console.log("user---?1", user)
                    if (err) {
                        res.status(200).send({
                            status: 500,
                            message: err.message
                        });
                    } else {
                        res.status(201).send({
                            status: 200,
                            data: data
                        });
                    }
                });
            }else{
                res.status(200).send({
                    status: 500,
                    message: "Not an Admin"
                });
            }
            // res.status(201).send({
            //     status: 200,
            //     data: data
            // });
        }
    });
}

exports.residencyDetailsGet = (req,res) =>{
    document.getUserDataByToken({ user_id: req.user_id }, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: 500,
                message: err.message
            });
        } else {
            console.log("dataAdmin",)
            if(data[0].user_type == 1){
                taxInformtaion.getresidencyDetails({ user_id: req.body.id }, (err, data) => {
                    // console.log("user---?1", user)
                    if (err) {
                        res.status(200).send({
                            status: 500,
                            message: err.message
                        });
                    } else {
                        res.status(201).send({
                            status: 200,
                            data: data
                        });
                    }
                });
            }else{
                res.status(200).send({
                    status: 500,
                    message: "Not an Admin"
                });
            }
            // res.status(201).send({
            //     status: 200,
            //     data: data
            // });
        }
    });
}

exports.updateTaxInformation = (req,res) =>{
    document.getUserDataByToken({ user_id: req.user_id }, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: 500,
                message: err.message
            });
        } else {
            console.log("dataAdmin",)
            if(data[0].user_type == 1){
                taxInformation(req,res)
            }else{
                res.status(200).send({
                    status: 500,
                    message: "Not an Admin"
                });
            }
            // res.status(201).send({
            //     status: 200,
            //     data: data
            // });
        }
    });
}

const taxInformation= (req,res) =>{
    // const { email, id, password } = req.body;
    const user_id = req.body.id
    // console.log("user_id-->",user_id)
    const {primaryTaxPayer_LastName,primaryTaxPayer_FirstName,primaryTaxPayer_MiddleName,primaryTaxPayer_MaritalStatus,primaryTaxPayer_DateOfMarriage,primaryTaxPayer_DateOfBirth,primaryTaxPayer_SSN_ITIN,primaryTaxPayer_CurrentVisaCategory,primaryTaxPayer_CurrentOccupation,primaryTaxPayer_FirstEntryToUS,spouse_FirstDate,spouse_FirstName,spouse_MiddleName,spouse_MaritalStatus,spouse_DateOfMarriage,spouse_DateOfBirth,spouse_SSN_ITIN,spouse_CurrentVisaCategory,spouse_CurrentOccupation,spouse_FirstEntryToUS,status}  = req.body.primaryTaxPayer

    if(req.body.primaryTaxPayer && req.body.primaryTaxPayer.id){
        // console.log("in the game")
        taxInformtaion.updatePI({id:req.body.primaryTaxPayer.id,primaryTaxPayer_LastName,primaryTaxPayer_FirstName,primaryTaxPayer_MiddleName,primaryTaxPayer_MaritalStatus,primaryTaxPayer_DateOfMarriage,primaryTaxPayer_DateOfBirth,primaryTaxPayer_SSN_ITIN,primaryTaxPayer_CurrentVisaCategory,primaryTaxPayer_CurrentOccupation,primaryTaxPayer_FirstEntryToUS,spouse_FirstDate,spouse_FirstName,spouse_MiddleName,spouse_MaritalStatus,spouse_DateOfMarriage,spouse_DateOfBirth,spouse_SSN_ITIN,spouse_CurrentVisaCategory,spouse_CurrentOccupation,spouse_FirstEntryToUS,status}, (err, data) => {
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
        taxInformtaion.savePI({user_id,primaryTaxPayer_LastName,primaryTaxPayer_FirstName,primaryTaxPayer_MiddleName,primaryTaxPayer_MaritalStatus,primaryTaxPayer_DateOfMarriage,primaryTaxPayer_DateOfBirth,primaryTaxPayer_SSN_ITIN,primaryTaxPayer_CurrentVisaCategory,primaryTaxPayer_CurrentOccupation,primaryTaxPayer_FirstEntryToUS,spouse_FirstDate,spouse_FirstName,spouse_MiddleName,spouse_MaritalStatus,spouse_DateOfMarriage,spouse_DateOfBirth,spouse_SSN_ITIN,spouse_CurrentVisaCategory,spouse_CurrentOccupation,spouse_FirstEntryToUS,status}, (err, data) => {
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


exports.updateContactDetails = (req,res) =>{
    document.getUserDataByToken({ user_id: req.user_id }, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: 500,
                message: err.message
            });
        } else {
            console.log("dataAdmin",)
            if(data[0].user_type == 1){
                contactDetails(req,res)
            }else{
                res.status(200).send({
                    status: 500,
                    message: "Not an Admin"
                });
            }
            // res.status(201).send({
            //     status: 200,
            //     data: data
            // });
        }
    });
}

const contactDetails= (req,res) =>{
    // const { email, id, password } = req.body;
    const user_id = req.body.id
    // console.log("user_id-->",user_id)
    // const user_id = req.user_id

    const {currentStreetAddress,aptNumber,city,state,zipCode,country,emailId,mobileNumber,workNumber,status}  = req.body.contact
    if(req.body.contact && req.body.contact.id){
        // console.log("end game")
        taxInformtaion.updateContact({id:req.body.contact.id,user_id,currentStreetAddress,aptNumber,city,state,zipCode,country,emailId,mobileNumber,workNumber,status}, (err, data) => {
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
        taxInformtaion.saveContact({user_id,currentStreetAddress,aptNumber,city,state,zipCode,country,emailId,mobileNumber,workNumber,status}, (err, data) => {
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

exports.updateDependencyDetails = (req,res) =>{
    document.getUserDataByToken({ user_id: req.user_id }, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: 500,
                message: err.message
            });
        } else {
            console.log("dataAdmin",)
            if(data[0].user_type == 1){
                dependentDetails(req,res)
            }else{
                res.status(200).send({
                    status: 500,
                    message: "Not an Admin"
                });
            }
            // res.status(201).send({
            //     status: 200,
            //     data: data
            // });
        }
    });
}

const dependentDetails=(req,res) =>{
    const user_id = req.body.id

    // const {firstName,middleName,lastName,ssnItin,visaCategory,dateOfBirth,relationship,firstDateOfEntry,dependantCareExpenses,status}  = req.body.dependent
    // if(req.body.dependent && req.body.dependent.id){
    //     // console.log("end game")
    //     taxInformtaion.updateDependent({id:req.body.dependent.id,user_id,firstName,middleName,lastName,ssnItin,visaCategory,dateOfBirth,relationship,firstDateOfEntry,dependantCareExpenses,status}, (err, data) => {
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
    //     taxInformtaion.savedependent({user_id,firstName,middleName,lastName,ssnItin,visaCategory,dateOfBirth,relationship,firstDateOfEntry,dependantCareExpenses,status}, (err, data) => {
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
    var bodyDATA= req.body.dependent
    taxInformtaion.deleteTaxDependentByUserId({user_id}, (err, data) => {
        console.log("user---?1", user_id)
        if (err) {
            res.status(200).send({
                status: "error",
                message: err.message
            });
        } else {
            console.log("deleted")
            taxInformtaion.InsertDependentByUserId({user_id,bodyDATA}, (err, data) => {
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

exports.updateResidencyDetails = (req,res) =>{
    document.getUserDataByToken({ user_id: req.user_id }, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: 500,
                message: err.message
            });
        } else {
            console.log("dataAdmin",)
            if(data[0].user_type == 1){
                residencytDetails(req,res)
            }else{
                res.status(200).send({
                    status: 500,
                    message: "Not an Admin"
                });
            }
            // res.status(201).send({
            //     status: 200,
            //     data: data
            // });
        }
    });
}

const residencytDetails=(req,res) =>{
    const user_id = req.body.id

    // const {payerStateName1,spouseStateName1,payerResidencyStartDate1,spouseResidencyStartDate1,payerResidencyEndDate1,spouseResidencyEndDate1,payerRentPaidAnnual1,spouseRentPaidAnnual1,payerStateName2,spouseStateName2,payerResidencyStartDate2,spouseResidencyStartDate2,payerResidencyEndDate2,spouseResidencyEndDate2,payerRentPaidAnnual2,spouseRentPaidAnnual2,status}  = req.body.residency
    // if(req.body.residency && req.body.residency.id){
    //     // console.log("end game")
    //     taxInformtaion.updateresidency({id:req.body.residency.id,payerStateName1,spouseStateName1,payerResidencyStartDate1,spouseResidencyStartDate1,payerResidencyEndDate1,spouseResidencyEndDate1,payerRentPaidAnnual1,spouseRentPaidAnnual1,payerStateName2,spouseStateName2,payerResidencyStartDate2,spouseResidencyStartDate2,payerResidencyEndDate2,spouseResidencyEndDate2,payerRentPaidAnnual2,spouseRentPaidAnnual2,status}, (err, data) => {
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
    //     taxInformtaion.saveresidency({user_id,payerStateName1,spouseStateName1,payerResidencyStartDate1,spouseResidencyStartDate1,payerResidencyEndDate1,spouseResidencyEndDate1,payerRentPaidAnnual1,spouseRentPaidAnnual1,payerStateName2,spouseStateName2,payerResidencyStartDate2,spouseResidencyStartDate2,payerResidencyEndDate2,spouseResidencyEndDate2,payerRentPaidAnnual2,spouseRentPaidAnnual2,status}, (err, data) => {
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
    taxInformtaion.deleteTaxResidentByUserId({user_id}, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: "error",
                message: err.message
            });
        } else {
            console.log("deleted")
            taxInformtaion.InsertResidentByUserId({user_id,bodyDATA}, (err, data) => {
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

exports.userUploadedDocument =(req,res) =>{
    document.getUploAdedDocumentApi({ user_id: req.body.id }, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: 500,
                message: err.message
            });
        } else {
            res.status(201).send({
                status: 200,
                data: data
            });
        }
    });
}

exports.getTaxDraftDocument =(req,res)=>{
    admin.getTaxDraftDocument({ user_id: req.body.id }, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: 500,
                message: err.message
            });
        } else {
            res.status(201).send({
                status: 200,
                data: data
            });
        }
    });
}
exports.deleteTaxDocument =(req,res)=>{
    admin.deleteTaxDocument({ id: req.body.id }, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: 500,
                message: err.message
            });
        } else {
            res.status(201).send({
                status: 200,
                data: data
            });
        }
    });
}

exports.updateStatus= (req,res)=>{
    admin.updateStatus({ id: req.body.id,status_id:req.body.event,selectedStatus:req.body.selectedStatus }, (err, data) => {
        // console.log("user---?1", user)
        if (err) {
            res.status(200).send({
                status: 500,
                message: err.message
            });
        } else {
            res.status(201).send({
                status: 200,
                data: data
            });
        }
    });
}

exports.updateDynamicUserId = (req,res) =>{
    document.getUserDataByToken({ user_id: req.user_id }, (err, data) => {
        console.log("user---?1", req.user_id)
        if (err) {
            res.status(200).send({
                status: 500,
                message: err.message
            });
        } else {
            console.log("dataAdmin",)
            if(data[0].user_type == 1){
                admin.updateDynamicUserId({ id: req.body.id,dynamicUserId:req.body.dynamicUserId }, (err, data) => {
                    // console.log("user---?1", user)
                    if (err) {
                        res.status(200).send({
                            status: 500,
                            message: err.message
                        });
                    } else {
                        res.status(201).send({
                            status: 200,
                            data: data
                        });
                    }
                });
            }else{
                res.status(200).send({
                    status: 500,
                    message: "Not an Admin"
                });
            }
            // res.status(201).send({
            //     status: 200,
            //     data: data
            // });
        }
    });
}
