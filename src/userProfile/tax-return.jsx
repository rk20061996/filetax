import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Sidebar from '../../src/layout/sidebar';
import userProfile from '../serviceApi/userprofile';
import { Modal, Button } from 'react-bootstrap';

function TaxReturn(props) {
  const [uploadedDocument, setuploadedDocument] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [rejectComment, setRejectComment] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const getAllUploadedDocument = await userProfile.getAllTaxReturnDocument();
      setuploadedDocument(getAllUploadedDocument?.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const approveDocument = async (documentId) => {
    try {
      await userProfile.approveDocument({ id:documentId, status: 1, comment: '' });
      fetchData();
    } catch (error) {
      console.error("Error approving document:", error);
    }
  };

  const showRejectModalHandler = (documentId) => {
    setSelectedDocumentId(documentId);
    setShowRejectModal(true);
  };

  const closeRejectModalHandler = () => {
    setShowRejectModal(false);
    setSelectedDocumentId(null);
    setRejectComment('');
  };

  const rejectDocument = async () => {
    try {
      await userProfile.rejectDocument({ id: selectedDocumentId, status: 2, comment: rejectComment });
      fetchData();
      closeRejectModalHandler();
    } catch (error) {
      console.error("Error rejecting document:", error);
    }
  };

  return (
    <div className="main d-flex w-100 h-100">
      <Sidebar isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
      <div className="mainContent container-fluid">
        <div className="card">
          <h3>Tax Return</h3>

          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Document View</th>
                <th>Document Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {uploadedDocument.map((doc, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <a href={"uploads/" + doc.file} target="_blank" rel="noopener noreferrer">
                      Download <span className="material-symbols-outlined"> download </span>
                    </a>
                  </td>
                  <td>
                    {doc.status === "" || doc.status === 0 ? (
                      <>
                        <button className="btn btn-success" onClick={() => approveDocument(doc.id)}>
                          Accept
                        </button>{" "}
                        <button className="btn btn-danger" onClick={() => showRejectModalHandler(doc.id)}>
                          Reject
                        </button>
                      </>
                    ) : doc.status === 1 ? (
                      <button className="btn btn-success">Accepted</button>
                    ) : (
                      <button className="btn btn-danger">Rejected</button>
                    )}
                  </td>
                  <td>
                    {new Date(doc.created_at).getDate() +
                      "-" +
                      (parseInt(new Date(doc.created_at).getMonth()) + 1) +
                      "-" +
                      new Date(doc.created_at).getFullYear()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Modal */}
      <Modal show={showRejectModal} onHide={closeRejectModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Rejection Comment:</label>
          <textarea
            value={rejectComment}
            onChange={(e) => setRejectComment(e.target.value)}
            className="form-control"
            rows="4"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeRejectModalHandler}>
            Close
          </Button>
          <Button variant="danger" onClick={rejectDocument}>
            Save Rejection
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TaxReturn;
