const db = require('../config/db.config');
// const { getDcoumentData: getDcoumentData, } = require('../database/documentqueries');
const { logger } = require('../utils/logger');
class Admin {
    static getAllUser(data, cb) {
        // console.log("herererere--->updateprofile", data);

        let query1 = ""
        if (data.status_id.includes(0)) {
            query1 = 'Select *,users.id as user_idMain,users.id as id from users left join user_status on user_status.user_id = users.id where user_type != 1';
        } else if (data.status_id.includes(1) && data.status_id.length === 1) {
            query1 = 'Select *,users.id as user_idMain,users.id as id from users left join user_status on user_status.user_id = users.id where user_type != 1 AND user_status.user_id IS NULL';
        }
        else {
            var formatted = `(${data.status_id.map(v => JSON.stringify(v.toString())).join(', ')})`;

            query1 = 'Select *,users.id as user_idMain,users.id as id from users inner join user_status on user_status.user_id = users.id where user_type != 1 and user_status.status_type in ' + formatted;
            if (data.status_id.includes(1)) {
                query1 = 'Select *,users.id as user_idMain,users.id as id from users left join user_status on user_status.user_id = users.id where user_type != 1 and (user_status.status_type in ' + formatted + ' OR user_status.user_id IS NULL)';
            }
            console.log("mainQuery22", query1)

        }


        // const query2 = 'UPDATE taxcontactdetails SET status = 2 WHERE user_id = ?;';
        // const query3 = 'UPDATE taxdependentdetails SET status = 2 WHERE user_id = ?;';
        // const query4 = 'UPDATE residencydetails SET status = 2 WHERE user_id = ?;';

        db.query(query1, [data.user_id], (err1, res1) => {
            if (err1) {
                logger.error(err1.message);
                cb(err1, null);
                return;
            }

            cb(null, {
                res1,
                // res2,
                // res3,
                // res4
            });
            // });
            // });
            // });
        });
    }

    static updateDynamicUserId(data, cb) {
        const query1 = 'update users set dynamicUser_id = ? where users.id = ?';
        db.query(query1, [data.dynamicUserId, data.id], (err1, res1) => {
            if (err1) {
                logger.error(err1.message);
                cb(err1, null);
                return;
            }

            cb(null, {
                res1,
                // res2,
                // res3,
                // res4
            });
            // });
            // });
            // });
        });
    }

    static getSingleUser(data, cb) {
        const query1 = 'select users.id,users.firstname,users.lastname,users.email,users.dynamicUser_id,users.phone,users.created_on,users.image,user_status.status_type  from users left join user_status on user_status.user_id  = users.id where users.id = ?';
        db.query(query1, [data.id], (err1, res1) => {
            if (err1) {
                logger.error(err1.message);
                cb(err1, null);
                return;
            }

            cb(null, {
                res1,
                // res2,
                // res3,
                // res4
            });
            // });
            // });
            // });
        });
    }
    static uploadTaxDraft(data, cb) {
        // INSERT INTO users VALUES(null, ?, ?, ?, ?,?, NOW(),'',0,?,2)

        const query1 = 'INSERT INTO tax_draft VALUES(null, ?,?,? , 0, 0, NOW(),?)';
        db.query(query1, [data.filename, "", data.user_id, data.tax_draft_type], (err1, res1) => {
            if (err1) {
                logger.error(err1.message);
                cb(err1, null);
                return;
            }

            cb(null, {
                res1,
                // res2,
                // res3,
                // res4
            });
        });
    }

    static getTaxDraftDocument(data, cb) {
        const query1 = 'select * from  tax_draft where is_deleted = 0 and user_id = ?';
        db.query(query1, [data.user_id], (err1, res1) => {
            if (err1) {
                logger.error(err1.message);
                cb(err1, null);
                return;
            }

            cb(null, res1);
        });
    }

    static deleteTaxDocument(data, cb) {
        const query1 = 'update tax_draft set is_deleted = 1 where id = ?';
        db.query(query1, [data.id], (err1, res1) => {
            if (err1) {
                logger.error(err1.message);
                cb(err1, null);
                return;
            }

            cb(null, res1);
        });
    }

    static updateStatus(data, cb) {
        let query1 = ''

        if (data.selectedStatus == "Ready for preparation") {
            query1 = 'Insert into user_status VALUES(null, ?,?)';
        } else {
            query1 = 'update user_status set status_type=' + data.status_id + '  where user_id = ' + data.id;
        }

        // const query1 = 'update tax_draft set is_deleted = 1 where id = ?';
        db.query(query1, [data.status_id, data.id], (err1, res1) => {
            if (err1) {
                logger.error(err1.message);
                cb(err1, null);
                return;
            }

            cb(null, res1);
        });
    }

    static rejectUploadedDoc(data, cb) {
        let query1 = 'update document_upload set comment_rejected= ?  ,is_deleted = 2 where id = ?'

        // const query1 = 'update tax_draft set is_deleted = 1 where id = ?';
        db.query(query1, [data.comment, data.id], (err1, res1) => {
            if (err1) {
                logger.error(err1.message);
                cb(err1, null);
                return;
            }

            cb(null, res1);
        });
    }

    static getAllUploadedDocument(data, cb) {
        let query1 = 'SELECT COUNT(*) AS count FROM document_upload WHERE created_at >= NOW() - INTERVAL 24 HOUR '

        // const query1 = 'update tax_draft set is_deleted = 1 where id = ?';
        db.query(query1, [], (err1, res1) => {
            if (err1) {
                logger.error(err1.message);
                cb(err1, null);
                return;
            }

            cb(null, res1);
        });
    }

    static getAllNotification(data, cb) {
        let query1 = 'SELECT *, users.id as id_main from  notification left join users on users.id = notification.user_id '
        let query2 = 'update  notification set is_read = true '
        // const query1 = 'update tax_draft set is_deleted = 1 where id = ?';
        db.query(query1, [], (err1, res1) => {
            if (err1) {
                logger.error(err1.message);
                cb(err1, null);
                return;
            }

            db.query(query2, [], (err1, res2) => {
                if (err1) {
                    logger.error(err1.message);
                    cb(err1, null);
                    return;
                }

                cb(null, res1);
            });
        });
    }

    static getAllContactUs(data, cb) {
        let query1 = 'SELECT * from  contact_us  '
        // let query2 = 'update  notification set is_read = true '
        // const query1 = 'update tax_draft set is_deleted = 1 where id = ?';
        db.query(query1, [], (err1, res2) => {
            if (err1) {
                logger.error(err1.message);
                cb(err1, null);
                return;
            }

            cb(null, res2);
        });
    }
    

    static getAllMessage(data, cb) {
        let query1 = 'SELECT *, users.id as id_main from  chat left join users on users.id = chat.user_id '
        // let query2 = 'update  notification set is_read = true '
        // const query1 = 'update tax_draft set is_deleted = 1 where id = ?';
        db.query(query1, [], (err1, res1) => {
            if (err1) {
                logger.error(err1.message);
                cb(err1, null);
                return;
            }

            // db.query(query2, [], (err1, res2) => {
            //     if (err1) {
            //         logger.error(err1.message);
            //         cb(err1, null);
            //         return;
            //     }

            cb(null, res1);
            // });
        });
    }

}






module.exports = Admin;