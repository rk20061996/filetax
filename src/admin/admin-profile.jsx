import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import Sidebar from "./sidebar";
import Taxdocumentationadmin from "./tax-documentation-admin";
import { Modal, Button } from 'react-bootstrap';
import Uploaddocumentmodel from "./components/upload-document-model";
import {
    useParams
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authFunc from '../serviceApi/admin';
import { Dropdown } from 'react-bootstrap';

function Adminprofile(props) {
    let { id } = useParams();
    let navigate = useNavigate();

    const [userData, setUserData] = useState([]);
    const [uploadedDocument, setuploadedDocument] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [taxDraft, settaxDraft] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('1');
    const [selectedStatusDisabled, setselectedStatusDisabled] = useState([]);

    const status = { 1: "Ready for preparation", 2: "In Progress", 3: "Summary Sent", 4: "Pending Recieved", 5: "Draft", 6: "Ready for e-file", 7: "Accepted" }
    const [filterStatus, setfilterStatus] = useState(0);

    // alert(id)

    useEffect(() => {
        getSingleUserData()
        getallUploadedDocument()
        getTaxDraftDocument()
    }, []);

    const handleStatusChange = async (event) => {
        // alert(event)
        const dataArray = []
        for (let i = 1; i <= event; i++) {
            // setselectedStatusDisabled.push(i)
            dataArray.push(i)
        }
        setselectedStatusDisabled(dataArray)
        setSelectedStatus(status[event]);
        const result = await authFunc.updateStatus({ id, event, selectedStatus });

        // Perform any other actions needed when the status changes
    };

    const getSingleUserData = async () => {
        const result = await authFunc.getSingleUser({ id });
        console.log("dataAdmin,", result)
        if (result?.data?.data?.res1) {
            setUserData(result?.data?.data?.res1);
            const dataResult = result?.data?.data?.res1
            if (dataResult[0]?.status_type) {
                const dataArray = []

                for (let i = 1; i <= dataResult[0].status_type; i++) {
                    // setselectedStatusDisabled.push(i)
                    dataArray.push(i)
                }
                setselectedStatusDisabled(dataArray)
                setSelectedStatus(status[dataResult[0].status_type]);
            } else {
                setSelectedStatus(status[1])
                setselectedStatusDisabled([1])
            }
            console.log("result?.data?.data?.res1", result?.data?.data?.res1)
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('admin');
            props.setisLoggedIn(false)

            navigate("/");
        }
    }
    const getallUploadedDocument = async () => {
        const result = await authFunc.getallUploadedDocument({ id });
        console.log("result ---->0", result.data.data)
        setuploadedDocument(result.data.data)
    }
    const getTaxDraftDocument = async () => {
        const result = await authFunc.getTaxDraftDocument({ id });
        console.log("result051", result.data.data)
        settaxDraft(result.data.data)
        // setuploadedDocument(result.data.data)
    }
    const handleFileAction = async (action, filenameid) => {
        // Perform action based on 'action' (view, download, delete)
        switch (action) {
            case 'view':
                window.open("uploads/" + filenameid, '_blank');
                // break;
                break;
            case 'download':
                window.open("uploads/" + filenameid, '_blank');
                // break;
                // break;
                break;
            case 'delete':
                await authFunc.deleteDocument({ id: filenameid });
                console.log("Document deleted");
                getallUploadedDocument()
                break;
            default:
                break;
        }
    };

    const handleShowModal = () => setShowModal(!showModal);

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false)
    };
    const handleFileChange2 = async (event) => {
        event.preventDefault(); // Prevent form submission behavior

        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('id', id);
        event.target.value = '';
        getTaxDraftDocument()
        event.target.value = '';
        try {
            const response = await authFunc.uploadTaxDraft(formData);
            event.preventDefault(); // Prevent form submission behavior
            console.log("File uploaded:", response);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const deleteTaxDraft = async (type, id) => {
        await authFunc.deleteTaxDocument({ id: id });
        console.log("Document deleted");
        getTaxDraftDocument()
    }
    return (
        <>
            {/* <Header /> */}
            <div className="main d-flex w-100 h-100">
                <Sidebar setfilterStatus={setfilterStatus} isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
                <div className="mainContent container-fluid">
                    <div className="card">


                        <Dropdown className="customfieldset" onSelect={handleStatusChange}>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {selectedStatus || 'Select Status'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item disabled={selectedStatusDisabled.includes(1)} eventKey="1">Ready for preparation</Dropdown.Item>
                                <Dropdown.Item  eventKey="2">In Progress</Dropdown.Item>
                                <Dropdown.Item  eventKey="3">Summary Sent</Dropdown.Item>
                                <Dropdown.Item  eventKey="4">Pending Recieved</Dropdown.Item>
                                <Dropdown.Item  eventKey="5">Draft</Dropdown.Item>
                                <Dropdown.Item  eventKey="6">Ready for e-file</Dropdown.Item>
                                <Dropdown.Item  eventKey="7">Accepted</Dropdown.Item>

                                {/* Add other status options here */}
                            </Dropdown.Menu>
                        </Dropdown>
                        <h3>User Profile</h3>
                        <form className="profileForm">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="profileImg">
                                        {userData[0]?.image && userData[0]?.image !== '' ?
                                            <img src={'uploads/profile/' + userData[0]?.image} alt="" />
                                            : <span className="material-symbols-outlined"> person </span>
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="">
                                        <label>Name</label>
                                        <input disabled readonly value={userData[0]?.firstname + " " + userData[0]?.lastname} type="text" placeholder="" />
                                    </div>
                                    <div className="">
                                        <label>Mobile Number</label>
                                        <input disabled readonly value={userData[0]?.phone} type="text" />
                                    </div>
                                    <div className="">
                                        <label>Date of joining</label>
                                        <input disabled readonly value={new Date(userData[0]?.created_on).toLocaleDateString()} type="text" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="">
                                        <label>Email</label>
                                        <input disabled readonly value={userData[0]?.email} type="text" placeholder="" />
                                    </div>
                                    <div className="">
                                        <label>Client ID</label>
                                        <input disabled readonly value={userData[0]?.id} type="text" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    {/* <button className="btn btn-primary w-auto">Submit</button> */}
                                </div>
                            </div>
                        </form>
                        <div className="row mt-5">
                            <div className="col-sm-12">
                                <button className="btn btn-primary w-auto" data-bs-toggle="modal" data-bs-target="#tagdoc">Tax Information Form</button>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-sm-12">
                                <h3>All Documents uploaded</h3>
                                <div className="DocumentUploaded">
                                    {uploadedDocument.map((file, index) => (
                                        <h5 className="d-flex align-items-center">{file.document_name} <p>Date: {new Date(file.created_at).toLocaleDateString()}</p>
                                            <p>{file.comment}</p>
                                            <div style={{
                                                "marginLeft": "auto",
                                                "marginRight": 0
                                            }} className="d-flex viewBtns">
                                                {/* <button className="btn btn-primary" onClick={() => handleFileAction('view')}>View</button> */}
                                                <button className="btn btn-primary" onClick={() => handleFileAction('download', file.filename)}>Download/View</button>
                                                <button className="btn btn-primary" onClick={() => handleFileAction('delete', file.document_id)}>Delete</button>
                                            </div>
                                        </h5>
                                    ))}
                                    {uploadedDocument.length === 0 && <h5>No Uploaded Document</h5>}


                                    <button className="btn btn-primary" onClick={handleShowModal} >
                                        {/* <input style={{ width: '100%', display: 'none' }} type="file" className="input-file"  onChange={handleFileChange} /> */}

                                        Upload Document</button>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-sm-12">
                                <h3 className="mb-3">Tax Draft </h3>
                                {!taxDraft.length ?
                                    <div className="file-upload">
                                        <label for="upload" className="file-upload__label">Upload tax draft</label>
                                        <input id="upload" onChange={(event) => handleFileChange2(event)} className="file-upload__input" type="file" name="file-upload" />
                                    </div>
                                    : <><div style={{
                                        "marginLeft": "auto",
                                        "marginRight": 0
                                    }} className="d-flex viewBtns"><p>Document Already Updated waiting for Client review</p>
                                        <button className="btn btn-primary" onClick={() => handleFileAction('download', taxDraft[0].file)}>Download/View</button>
                                        <button className="btn btn-primary" onClick={() => deleteTaxDraft('delete', taxDraft[0].id)}>Delete</button></div></>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="modal customModal fade" id="tagdoc" tabindex="-1" aria-labelledby="TagdocModalLabel" aria-hidden="true">
                <div class="modal-dialog  modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4>Tag Documents</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <Taxdocumentationadmin />
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Uploaddocumentmodel handleShowModal={handleShowModal} />
                    {/* <p>Congrats! Tax Document has been saved.</p> */}
                </Modal.Body>
                {/* <Modal.Footer> */}
                {/* <Button variant="secondary" onClick={handleCloseModal}>
                        OK
                    </Button> */}
                {/* </Modal.Footer> */}
            </Modal>
        </>
    );
}

export default Adminprofile;
