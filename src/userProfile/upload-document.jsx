import React, { useState, useEffect } from "react";
import Sidebar from '../../src/layout/sidebar';
import userProfile from '../serviceApi/userprofile';

function UploadDocument(props) {
  const [documentData, setDocumentData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTaxType, setSelectedTaxType] = useState(""); // New state for selected tax type
  const [uploadedDocument, setuploadedDocument] = useState([]); // New state for selected tax type


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const getAllData = await userProfile.getAllDocument();
      const getAllUploadedDocument = await userProfile.getAllUploadedDocument();
      setDocumentData(getAllData?.data?.data);
      setuploadedDocument(getAllUploadedDocument?.data?.data);
      console.log("getAllData", getAllData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    event.target.value = '';
  };

  const handleTaxTypeChange = (event) => {
    setSelectedTaxType(event.target.value);
  };

  const handleUpload = async () => {
    if (selectedFile && selectedTaxType) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('taxType', selectedTaxType);

      try {
        const response = await userProfile.uploadDocument(formData);
        console.log("File uploaded:", response);

        setSelectedFile(null);
        setSelectedTaxType("");

        fetchData(); // Refetch data after successful upload
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.error("Please select a file and tax type.");
    }
  };

  const handleDelete = async (documentId) => {
    try {
      // alert(documentId)
      // Send a delete request to the server using the userProfile service
      await userProfile.deleteDocument({id:documentId});
      console.log("Document deleted");

      fetchData(); // Refetch data after successful deletion
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
  const deleteStyle = {
    cursor: 'pointer' // Style to set cursor to pointer
  };
  return (
    <div className="main d-flex w-100 h-100">
      <Sidebar isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
      <div className="mainContent container-fluid">
        <div className="card">
          <h3>Uploaded Tax Document</h3>
          <form>
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="form-group">
                  <label>Choose Tax Type</label>
                  <select value={selectedTaxType} onChange={handleTaxTypeChange}>
                    <option value="">Choose Taxtype</option>
                    {documentData.map((object, i) => (
                      <option key={object.id} value={object.id}>{object.document_name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="form-group">
                  <label>Upload Document</label>
                  <input type="file" className="input-file" onChange={handleFileChange} />
                </div>
              </div>
              <div className="btnWrapper">
                <button type="button" className="btn btn-green" onClick={handleUpload}>Upload</button>
              </div>
            </div>
          </form>
          <table>
            <thead>
              <tr>
                <th>Tax Type</th>
                <th>Uploaded Documents</th>
                <th>Date</th>
                <th>Year</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
          {uploadedDocument.map((doc, index) => (
            <tr key={index}>
              <td>{doc.document_name}</td>
              <td>
                <a href={"uploads/"+doc.filename} target="_blank" rel="noopener noreferrer">
                  Download <span className="material-symbols-outlined"> download </span>
                </a>
              </td>
              <td>{doc.created_at}</td>
              <td>{new Date(doc.created_at).getFullYear()}</td>
              <td>
                {/* <a href="#"> <span className="material-symbols-outlined"> edit </span> </a> */}
                <a style={deleteStyle} onClick={() => handleDelete(doc.document_id)}> <span className="material-symbols-outlined"> delete </span> </a>
              </td>
            </tr>
          ))}
        </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UploadDocument;
