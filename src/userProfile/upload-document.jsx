import React, { useState, useEffect, useRef } from "react";
import Sidebar from '../../src/layout/sidebar';
import userProfile from '../serviceApi/userprofile';
import { Modal, Button } from 'react-bootstrap';

function UploadDocument(props) {

  const [documentData, setDocumentData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTaxType, setSelectedTaxType] = useState(""); // New state for selected tax type
  const [uploadedDocument, setuploadedDocument] = useState([]); // New state for selected tax type
  const [selectedTaxcomment, setselectedTaxcomment] = useState(""); // New state for selected tax type
  const [imageValue, setimageValue] = useState(""); // New state for selected tax type
  const [show, setShow] = useState(false); // New state for selected tax type


  useEffect(() => {
    const getAllDocumentName = async () => {
      try {
        const getAllData = await userProfile.getAllDocument();
        setDocumentData(getAllData?.data?.data);
      } catch (error) {
        // Handle errors here
        console.error('Error fetching document data:', error);
      }
    };

    getAllDocumentName();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const getAllUploadedDocument = await userProfile.getAllUploadedDocument();
      setuploadedDocument(getAllUploadedDocument?.data?.data);
      // console.log("getAllData", getAllData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    // event.target.value = '';
    setimageValue(event.target.value)
  };

  const handleTaxTypeChange = (event) => {
    setSelectedTaxType(event.target.value);
  };

  const handleUpload = async (event) => {
    event.preventDefault(); // Prevent form submission behavior

    if (selectedFile && selectedTaxType ) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('taxType', selectedTaxType);
      formData.append('selectedTaxcomment', selectedTaxcomment);

      try {
        const response = await userProfile.uploadDocument(formData);
        console.log("File uploaded:", response);

        setSelectedFile(null);
        setSelectedTaxType("");
        setselectedTaxcomment("")
        setimageValue("")
        fetchData(); // Refetch data after successful upload
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.error("Please select a file and tax type.");
    }
  };

  const handleFileChange2 = async (event, id) => {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('id', id);
    event.target.value = '';
    try {
      const response = await userProfile.updateDocument(formData);
      console.log("File uploaded:", response);

      setSelectedFile(null);
      setSelectedTaxType("");
      setselectedTaxcomment("")
      setimageValue("")
      setShow(!show)
      fetchData(); // Refetch data after successful upload
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const handleDelete = async (documentId) => {
    try {
      // alert(documentId)
      // Send a delete request to the server using the userProfile service
      await userProfile.deleteDocument({ id: documentId });
      console.log("Document deleted");

      fetchData(); // Refetch data after successful deletion
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
  const deleteStyle = {
    cursor: 'pointer' // Style to set cursor to pointer
  };
  const fileInputRef = useRef(null); // Create a reference to file input

  const handleFileUploadClick = () => {
    fileInputRef.current.click(); // Trigger the click on the file input
  };

  return (
    <div className="main d-flex w-100 h-100">
      
      <Modal show={show} onHide={() => { setShow(!show) }}>
        <Modal.Header closeButton>
          <Modal.Title>File Updated Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your file has been successfully updated.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShow(!show) }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Sidebar isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
      <div className="mainContent container-fluid">
        <div className="card">
          <h3>Uploaded Tax Document</h3>
          {/* <form > */}
          <div className="row">
            <div className="col-sm-12 col-md-7">
              <div style={{ display: 'block' }} className="form-group">
                <label>Upload Document</label>
                <input style={{ width: '100%' }} type="file" className="input-file" value={imageValue} onChange={handleFileChange} />
              </div>
            </div>
            <div className="col-sm-12 col-md-7">
              <div style={{ display: 'block' }} className="form-group">
                <label>Choose Tax Type</label>
                <select value={selectedTaxType} onChange={handleTaxTypeChange}>
                  <option value="">Choose Taxtype</option>
                  {documentData.map((object, i) => (
                    <option key={object.id} value={object.id}>{object.document_name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-sm-12 col-md-7">
              <div style={{ display: 'block' }} className="form-group">
                <label>Comments </label>
                <textarea value={selectedTaxcomment}
                  onChange={(event) => {
                    setselectedTaxcomment(event.target.value)
                  }}></textarea>
              </div>
            </div>
            <div className="btnWrapper">
              <button type="button" className="btn btn-green" onClick={handleUpload}>Upload</button>
            </div>
          </div>
          {/* </form> */}
          <table>
            <thead>
              <tr>
                <th>Tax Type</th>
                <th>Uploaded Documents</th>
                <th>Date</th>
                <th>Year</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {uploadedDocument.map((doc, index) => (
                <tr key={index}>
                  <td>{doc.document_name}</td>
                  <td>
                    <a href={"uploads/" + doc.filename} target="_blank" rel="noopener noreferrer">
                      Download <span className="material-symbols-outlined"> download </span>
                    </a>
                  </td>
                  <td>{doc.created_at}</td>
                  <td>{new Date(doc.created_at).getFullYear()}</td>
                  <td>{doc.comment}</td>
                  <td>
                    <a style={deleteStyle} onClick={handleFileUploadClick}>
                      <input
                        style={{ width: '100%', display: 'none' }}
                        type="file"
                        className="input-file"
                        ref={fileInputRef}
                        onChange={(event) => handleFileChange2(event,doc.document_id)}
                      />
                      <span className="material-symbols-outlined"> upload </span>
                    </a>
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
