const getDcoumentData = `
Select * from document_type`;

const uploadDocument = `
INSERT INTO document_upload VALUES(null, ?, ?, ?,NOW(),0)`;

const getUploAdedDocument=`
SELECT *,document_upload.id as document_id  FROM document_upload left JOIN document_type ON document_upload.document_type_id = document_type.id where  document_upload.is_deleted = 0 AND document_upload.user_id = ?`;

const deleteDocument=`
Update document_upload set is_deleted = 1 where id = ?`;


module.exports = {
    getDcoumentData,
    uploadDocument,
    getUploAdedDocument,
    deleteDocument
};