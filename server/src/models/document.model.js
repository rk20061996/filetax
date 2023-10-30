const db = require('../config/db.config');
const { getDcoumentData: getDcoumentData, uploadDocument: uploadDocument, getUploAdedDocument:getUploAdedDocument, deleteDocument:deleteDocument } = require('../database/documentqueries');
const { logger } = require('../utils/logger');

class Document {
    constructor(document_type_id, user_id, filename) {
        this.document_type_id = document_type_id;
        this.user_id = user_id;
        this.filename = filename;
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
        db.query(uploadDocument,
            [
                data.user_id,
                parseInt(data.document_type_id),
                data.filename
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

    static getUploAdedDocumentApi(data, cb){
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

    static deleteDocument(data, cb){
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

    

}
module.exports = Document;