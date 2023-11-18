const db = require('../config/db.config');
// const { getDcoumentData: getDcoumentData, } = require('../database/documentqueries');
const { logger } = require('../utils/logger');
class Admin {
    static getAllUser(data, cb) {
        console.log("herererere--->updateprofile", data);

        const query1 = 'Select *,users.id as user_idMain from users left join user_status on user_status.user_id = users.id where user_type != 1';
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
        const query1 = 'select id,firstname,lastname,email,phone,created_on,image from users  where id = ?';
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
}
module.exports = Admin;