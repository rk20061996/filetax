const getDcoumentData = `
Select * from document_type`;

const uploadDocument = `
INSERT INTO document_upload VALUES(null, ?, ?, ?,?,NOW(),0)`;

const getUploAdedDocument=`
SELECT *,document_upload.id as document_id  FROM document_upload left JOIN document_type ON document_upload.document_type_id = document_type.id where  document_upload.is_deleted = 0 AND document_upload.user_id = ?`;

const deleteDocument=`
Update document_upload set is_deleted = 1 where id = ?`;


const getUserDataByToken=`
select firstname,lastname,email,phone,user_type from users  where id = ?`;

const updateProfile=`Update users set firstname=?, lastname=?, phone= ?, image=?  where id = ?`;

const updateDocumentQuery=`
Update document_upload set filename = ? where id = ?`;

const getAllTaxReturnDocument =`select * from tax_draft where user_id = ?`

const changeStatusTaxReturnDocument = `Update tax_draft set status =? , comment = ? where id = ?`
module.exports = {
    getDcoumentData,
    uploadDocument,
    getUploAdedDocument,
    deleteDocument,
    getUserDataByToken,
    updateProfile,
    updateDocumentQuery,
    getAllTaxReturnDocument,
    changeStatusTaxReturnDocument
};