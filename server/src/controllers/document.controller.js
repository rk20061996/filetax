const document = require('../models/document.model');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination folder where uploaded files will be stored
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        // Set the file name after upload (you can customize this)
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

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
        const data = new document(document_type_id.trim(), user_id, filename.trim());

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

exports.getUploadedDocument = (req, res) => {
    document.getUploAdedDocumentApi({ user_id: req.user_id },(err, data) => {
        // console.log("user---?1", user)
        if(err) {
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
    document.deleteDocument({ id: req.body.id },(err, data) => {
        // console.log("user---?1", user)
        if(err) {
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

