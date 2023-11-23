import React,{useEffect,useState} from "react"
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import userProfile from '../../serviceApi/admin';
import {
    useParams
} from "react-router-dom";
function Uploaddocumentmodel(props) {
    const [documentData, setDocumentData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedTaxType, setSelectedTaxType] = useState(0); // New state for selected tax type
    const [uploadedDocument, setuploadedDocument] = useState([]); // New state for selected tax type
    const [selectedTaxcomment, setselectedTaxcomment] = useState(""); // New state for selected tax type
    const [imageValue, setimageValue] = useState(""); // New state for selected tax type
    const [show, setShow] = useState(false); // New state for selected tax type
    let { id } = useParams();

  
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
  
      if (selectedFile ) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('taxType', selectedTaxType);
        formData.append('selectedTaxcomment', selectedTaxcomment);
        formData.append('id', id);
  
        try {
          const response = await userProfile.uploadDocument(formData);
          event.preventDefault(); // Prevent form submission behavior

          console.log("File uploaded:", response);
  
          setSelectedFile(null);
          setSelectedTaxType("");
          setselectedTaxcomment("")
          setimageValue("")
          props.getallUploadedDocument()
          props.handleShowModal(false)
        //   fetchData(); // Refetch data after successful upload
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      } else {
        console.error("Please select a file and tax type.");
      }
    };
  
    return (
        <div className="row">
            <div >
              <div style={{ display: 'block' }} className="form-group">
                <label>Upload Document</label>
                <input style={{ width: '100%' }} type="file" className="input-file" value={imageValue} onChange={handleFileChange} />
              </div>
            </div>
            <div >
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
            <div >
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
    );
}

export default Uploaddocumentmodel;
