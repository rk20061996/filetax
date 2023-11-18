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

exports.getAllUser = (req, res) => {
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
                admin.getAllUser({ user_id: req.user_id }, (err, data) => {
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
                taxInformtaion.taxInformation({ user_id: req.body.id }, (err, data) => {
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
                taxInformtaion.contactDetails({ user_id: req.body.id }, (err, data) => {
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
                taxInformtaion.dependentDetails({ user_id: req.body.id }, (err, data) => {
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
                taxInformtaion.updateresidency({ user_id: req.body.id }, (err, data) => {
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
