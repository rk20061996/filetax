const db = require('../config/db.config');
// const { getDcoumentData: getDcoumentData, } = require('../database/documentqueries');
const { logger } = require('../utils/logger');
class Admin {
    static getAllUser(data, cb) {
        // console.log("herererere--->updateprofile", data);

        let query1 = ""
        if(data.status_id == 0){
            query1 = 'Select *,users.id as user_idMain from users left join user_status on user_status.user_id = users.id where user_type != 1';
        }else if(data.status_id == 1){
            query1 = 'Select *,users.id as user_idMain from users left join user_status on user_status.user_id = users.id where user_type != 1 AND user_status.user_id IS NULL' ;
        }
        else{
            query1 = 'Select *,users.id as user_idMain from users inner join user_status on user_status.user_id = users.id where user_type != 1 and user_status.status_type ='+data.status_id;
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

    static getSingleUser (data, cb) {
        const query1 = 'select users.id,users.firstname,users.lastname,users.email,users.phone,users.created_on,users.image,user_status.status_type  from users left join user_status on user_status.user_id  = users.id where users.id = ?';
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
    static uploadTaxDraft (data, cb) {
        // INSERT INTO users VALUES(null, ?, ?, ?, ?,?, NOW(),'',0,?,2)

        const query1 = 'INSERT INTO tax_draft VALUES(null, ?,?,? , 0, 0, NOW())';
        db.query(query1, [data.filename,"",data.user_id], (err1, res1) => {
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

    static getTaxDraftDocument(data, cb){
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

    static deleteTaxDocument(data, cb){
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

    static updateStatus(data, cb){
        let query1  = ''

        if(data.selectedStatus == "Ready for preparation"){
            query1 = 'Insert into user_status VALUES(null, ?,?)';
        }else{
            query1 = 'update user_status set status_type='+data.status_id+'  where user_id = '+data.id;
        }

        // const query1 = 'update tax_draft set is_deleted = 1 where id = ?';
        db.query(query1, [data.status_id,data.id], (err1, res1) => {
            if (err1) {
                logger.error(err1.message);
                cb(err1, null);
                return;
            }

            cb(null, res1);
        });
    }

    
    
}

module.exports = Admin;