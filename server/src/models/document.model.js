const db = require('../config/db.config');
const { getDcoumentData: getDcoumentData, uploadDocument: uploadDocument, getUploAdedDocument: getUploAdedDocument, deleteDocument: deleteDocument, getUserDataByToken: getUserDataByToken, updateProfile: updateProfile, updateDocumentQuery: updateDocumentQuery, getAllTaxReturnDocument: getAllTaxReturnDocument, changeStatusTaxReturnDocument: changeStatusTaxReturnDocument } = require('../database/documentqueries');
const { logger } = require('../utils/logger');

class Document {
    constructor(document_type_id, user_id, filename, selectedTaxcomment , user_type) {
        this.document_type_id = document_type_id;
        this.user_id = user_id;
        this.filename = filename;
        this.selectedTaxcomment = selectedTaxcomment
        this.user_type = user_type
    }
    static getAllData(cb) {
        db.query(getDcoumentData, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res);
                return;
            }
            // cb({ kind: "not_found" }, null);
        })
    }

    static uploadDocumentQuery(data, cb) {
        console.log("herererere", data)
        const query1 = "INSERT INTO notification VALUES(null, ?, ? ,NOW(),false,?)"
        db.query(uploadDocument,
            [
                data.user_id,
                parseInt(data.document_type_id),
                data.filename,
                data.selectedTaxcomment
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                console.log("datacheck",data)
                if (data.user_type) {
                    db.query(query1,
                        [
                            data.user_id,
                            data.filename,
                            parseInt(data.document_type_id)
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
                } else {
                    cb(null, {
                        data,

                    });
                }

                // cb({ kind: "not_found" }, null);
            })
    }

    static updateDocumentQuery(data, cb) {
        // console.log("herererere", data)
        db.query(updateDocumentQuery,
            [
                data.filename,
                data.document_id
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



    static getUploAdedDocumentApi(data, cb) {
        console.log("herererere", data)
        db.query(getUploAdedDocument,
            [
                data.user_id,
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, res);
            })
    }

    static getAllTaxReturnDocument(data, cb) {
        // console.log("herererere", data)
        db.query(getAllTaxReturnDocument,
            [
                data.user_id,
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, res);
            })
    }

    static changeStatusTaxReturnDocument(data, cb) {
        // console.log("herererere", data)
        db.query(changeStatusTaxReturnDocument,
            [
                data.status,
                data.comment,
                data.id,
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, res);
            })
    }



    static deleteDocument(data, cb) {
        console.log("hererererdde", data)
        db.query(deleteDocument,
            [
                data.id,
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, res);
            })
    }

    static getUserDataByToken(data, cb) {
        console.log("hererererdde", data)
        db.query(getUserDataByToken,
            [
                data.user_id,
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, res);
            })
    }

    static updateProfile(data, cb) {
        console.log("herererere--->updateprofile", data)
        db.query(updateProfile,
            [
                data.firstname,
                data.lastname,
                data.phone,
                data.image,
                data.user_id
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


}
module.exports = Document;