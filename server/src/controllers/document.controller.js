const document = require('../models/document.model');
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
const uploadProfile = multer({ storage: generateStorage('profilePicture') });

exports.getDocumentName = (req, res) => {
    document.getAllData((err, data) => {
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
};
exports.uploadDocument = (req, res) => {
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
        const user_id = req.user_id
        const filename = req.file.filename
        const selectedTaxcomment = req.body.selectedTaxcomment
        const user_type = 'client'
        const data = new document(document_type_id.trim(), user_id, filename.trim(), selectedTaxcomment,user_type);

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

exports.updateDocument = (req, res) => {
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
        // const document_type_id = req.body.taxType
        const user_id = req.user_id
        const filename = req.file.filename
        // const selectedTaxcomment = req.body.selectedTaxcomment
        const document_id = req.body.id

        const data = {filename, document_id};

        document.updateDocumentQuery(data, (err, dat) => {
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



exports.getUploadedDocument = (req, res) => {
    document.getUploAdedDocumentApi({ user_id: req.user_id }, (err, data) => {
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
};

exports.getAllTaxReturnDocument = (req, res) => {
    document.getAllTaxReturnDocument({ user_id: req.user_id }, (err, data) => {
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
};

exports.changeStatusTaxReturnDocument = (req, res) => {
    document.changeStatusTaxReturnDocument({ user_id: req.user_id,id:req.body.id,status:req.body.status,comment:req.body.comment }, (err, data) => {
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
};

exports.deleteDocument = (req, res) => {
    document.deleteDocument({ id: req.body.id }, (err, data) => {
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
};

exports.getUserDataByToken = (req, res) => {
    document.getUserDataByToken({ user_id: req.user_id }, (err, data) => {
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
};


exports.updateProfile = (req, res) => {
    uploadProfile.single('profilePicture')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).send(err.message);
        } else if (err) {
            return res.status(500).send(err.message);
        }

        // if (!req.file) {
        //     return res.status(400).send('No file uploaded.');
        // }
        // console.log("req.file.originalname", req.file.originalname, req.file.filename)
        // console.log("reqData",req.body.taxType,req.user_id)
        // const { taxType, user_id, email, password, phone } = req.body;
        let profilePic
        if(req.file && req.file.filename){
            profilePic = req.file.filename
        }else{
            profilePic = ""
        }
         
        const user_id = req.user_id
        const firstname = req.body.firstName
        const lastname = req.body.firstName
        const phone = req.body.mobileNumber
        console.log("profilePic----", profilePic)
        const data = {"image":profilePic,user_id,firstname,lastname,phone}

        document.updateProfile(data, (err, dat) => {
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
