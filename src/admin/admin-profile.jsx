import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import Sidebar from "./sidebar";
import Taxdocumentationadmin from "./tax-documentation-admin";
import { Modal, Button } from 'react-bootstrap';
import Uploaddocumentmodel from "./components/upload-document-model";
import { Printablecomponent } from "./components/printable-component"
import {
    useParams
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authFunc from '../serviceApi/admin';
import { Dropdown } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import EditIcon from '@mui/icons-material/Edit';

function Adminprofile(props) {
    let { id } = useParams();
    let navigate = useNavigate();

    const [userData, setUserData] = useState([]);
    const [uploadedDocument, setuploadedDocument] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setshowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const [taxDraft, settaxDraft] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('1');
    const [selectedStatusDisabled, setselectedStatusDisabled] = useState([]);
    const [lastUploadedDoc, setlastUploadedDoc] = useState({});

    const [downloadDoc, setdownloadDoc] = useState(0);
    const [formDataForDownload, setformDataForDownload] = useState(0);
    const [documentToDelete, setDocumentToDelete] = useState(null);

    const status = { 1: "Ready for preparation", 2: "In Progress", 3: "Summary Sent", 4: "Pending Recieved", 5: "Draft", 6: "Ready for e-file", 7: "Accepted" }
    const [filterStatus, setfilterStatus] = useState(0);

    const [editClient, seteditClient] = useState(false);
    const [dynamicUserId, setdynamicUserId] = useState(id);

    const [formData, setFormData] = useState({
        primaryTaxPayer: {
            // id
        },
        spouse: {
            // id
        },
        contact: {
            // id
        },
        dependent: {
            // id
        },
        residency: {
            // id
        },
        id
        // Add data structure for other sections
    });
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
            setdynamicUserId(dataResult[0].dynamicUser_id ?dataResult[0].dynamicUser_id : dataResult[0].id)
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
        let daata = result.data.data
        // for(let i = 0 ; i <daata.length ; i++){
        const sortedArrayDescending = daata.sort((a, b) => b.id - a.id);
        setlastUploadedDoc(sortedArrayDescending[0])
        // console.log("daata.",sortedArrayDescending);

        // }
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
                setDocumentToDelete(filenameid);
                // Open the confirmation modal
                setShowConfirmationModal(true);
                // await authFunc.deleteDocument({ id: filenameid });
                // console.log("Document deleted");
                // getallUploadedDocument()
                break;
            default:
                break;
        }
    };

    const handleDeleteConfirmation = async (documentId) => {
        // Perform the deletion
        await authFunc.deleteDocument({ id: documentId });
        console.log("Document deleted");
        getallUploadedDocument();

        // Reset the document ID state and close the confirmation modal
        setDocumentToDelete(null);
        setShowConfirmationModal(false);
    };

    const handleShowModal = () => setShowModal(!showModal);

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false)
    };
    const handleCloseModal3 = () => {
        setShowModal3(false)
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
            getTaxDraftDocument()

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


    const getTaxData = async () => {
        const data = await authFunc.getTaxInformation({ id: id })
        // console.log("data--->0",data)
        // setFormData({...formData,primaryTaxPayer:data[0] } )
        const data2 = await authFunc.getTaxContact({ id: id })
        const data3 = await authFunc.getTaxDependent({ id: id })
        const data4 = await authFunc.getTaxResidency({ id: id })
        console.log("data3", data.data.data.res)
        setFormData({
            ...formData,
            contact: data2.data.data.res[0],
            primaryTaxPayer: data.data.data.res[0],
            dependent: data3.data.data.res,
            residency: data4.data.data.res
        })
        // props.setformDataForDownload({...formData,
        //     contact:data2.data.data.res[0],
        //     primaryTaxPayer:data.data.data.res[0],
        //     dependent:data3.data.data.res[0],
        //     residency:data4.data.data.res[0] 
        // } )
    }
    useEffect(() => {
        getTaxData()
    }, []);

    // const generatePDF = async () => {
    //     alert()
    //     // setdownloadDoc(1)
    //     const pages = document.querySelectorAll('.pdf-pagess'); // Assuming each HTML page has the 'pdf-page' class
    //     const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
    //     const options = {
    //         scale: 3, // Adjust the scale as needed
    //         // windowWidth: document.documentElement.scrollWidth,
    //         // windowHeight: document.documentElement.scrollHeight,
    //         // useCORS: true, // Enable CORS support
    //         // letterRendering: true,
    //         // logging: true,
    //         // allowTaint: false,
    //         // foreignObjectRendering: true,
    //         // width:"20px",
    //         // width: 1200,
    //         height: 1100,
    //         onclone: (document) => {
    //             // Apply styles to the cloned document
    //             document.body.style.fontSize = '20px'; // Adjust the font size as needed
    //             // document.body.style.height = '5px';
    //         },
    //     };
    //     const promises = Array.from(pages).map(async (page, index) => {
    //         const canvas = await html2canvas(page, options);
    //         const imgData = canvas.toDataURL('image/png');
    //         pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    //         if (index < pages.length - 1) {
    //             pdf.addPage();
    //         }
    //     });

    //     try {
    //         await Promise.all(promises);
    //         pdf.save('multi_page_document.pdf');
    //     } catch (error) {
    //         console.error('Error generating PDF:', error);
    //     }
    // };
    const editClientId = () => {
        // const [editClient, seteditClient] = useState(false);
        seteditClient(true)
    }
    const submitForm = async() => {
        const data = { id, dynamicUserId}
        const result = await authFunc.updateDynamicUserId(data);

        seteditClient(false)
    }
    return (
        <>
            {/* <Header /> */}
            <div className="main d-flex w-100 h-100">
                <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this document?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => handleDeleteConfirmation(documentToDelete)}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>;
                <Sidebar setfilterStatus={props.setfilterStatus} filterStatus={props.filterStatus} firstLoad={props.firstLoad} setfirstLoad={props.setfirstLoad}  isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
                <div className="mainContent container-fluid">
                    <div className="card">

                        <div  class="backBtn">
                            <button onClick={ () =>{navigate('/admin/home')}}>Back</button>
                        </div>
                        <Dropdown className="customfieldset" onSelect={handleStatusChange}>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {selectedStatus || 'Select Status'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item disabled={selectedStatusDisabled.includes(1)} eventKey="1">Ready for preparation</Dropdown.Item>
                                <Dropdown.Item eventKey="2">In Progress</Dropdown.Item>
                                <Dropdown.Item eventKey="3">Summary Sent</Dropdown.Item>
                                <Dropdown.Item eventKey="4">Pending Recieved</Dropdown.Item>
                                <Dropdown.Item eventKey="5">Draft</Dropdown.Item>
                                <Dropdown.Item eventKey="6">Ready for e-file</Dropdown.Item>
                                <Dropdown.Item eventKey="7">Accepted</Dropdown.Item>

                                {/* Add other status options here */}
                            </Dropdown.Menu>
                        </Dropdown>
                        <h3 className="mt-5">User Profile</h3>
                        <form className="profileForm">
                            <div className="row">
                                {/* <div className="col-sm-12">
                                    <div className="profileImg">
                                        {userData[0]?.image && userData[0]?.image !== '' ?
                                            <img src={'uploads/profile/' + userData[0]?.image} alt="" />
                                            : <span className="material-symbols-outlined"> person </span>
                                        }
                                    </div>
                                </div> */}
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
                                        <div className="clientId">
                                            <input disabled={!editClient} readonly={!editClient} value={dynamicUserId} type="text" placeholder=""
                                                // onChange={()=>{
                                                //     setdynamicUserId()
                                                // }}
                                                onChange={(e) => 
                                                    setdynamicUserId(e.target.value)
                                                }

                                            />
                                            {!editClient && <span onClick={editClientId} className="input-group-text">
                                                <EditIcon />
                                            </span>}
                                        </div>
                                    </div>
                                </div>
                                {editClient && <div className="col-sm-12">
                                    <button type="button" onClick={submitForm} className="btn btn-primary w-auto">Submit</button>
                                </div>}
                            </div>
                        </form>
                        <div className="row mt-5">
                            <div className="col-sm-12">
                                {/* <button className="btn btn-primary w-auto" data-bs-toggle="modal" data-bs-target="#tagdoc">Tax Information Form</button> */}
                                <button
                                    onClick={async () => {
                                        // handleCloseModal3(true)
                                        // handleCloseModal3(false)
                                        setshowModal2(true)
                                    }}
                                    className="btn btn-warning pull-right" style={{
                                        "width": "fit-content"
                                    }}>Tax Documentation Form</button>
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
                                                <button className="btn btn-primary" onClick={() => handleFileAction('download', file.filename)}>View</button>
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
                        <div className="row mt-5 ">
                            <div className="col-sm-12">
                                <h3 className="mb-3">Tax Draft </h3>
                                {!taxDraft.length &&
                                    <div className="file-upload">
                                        <label for="upload" className="file-upload__label">Upload tax draft</label>
                                        <input id="upload" onChange={(event) => handleFileChange2(event)} className="file-upload__input" type="file" name="file-upload" />
                                    </div>
                                }
                                {taxDraft.length ? (
                                    <>
                                        {lastUploadedDoc?.status === 0 ? (
                                            <div style={{
                                                "marginLeft": "auto",
                                                "marginRight": 0
                                            }} className="d-flex viewBtns">
                                                <p>Document Already Updated waiting for Client review</p>
                                                <button className="btn btn-primary" onClick={() => handleFileAction('download', taxDraft[0].file)}>View</button>
                                                <button className="btn btn-primary" onClick={() => deleteTaxDraft('delete', taxDraft[0].id)}>Delete</button>
                                            </div>
                                        ) : lastUploadedDoc?.status === 1 ? (
                                            <div style={{ "marginLeft": "auto", "marginRight": 0 }} className="d-flex viewBtns">
                                                <p style={{ "color": "green" }}>Document Approved By Client</p>
                                                <button className="btn btn-primary" onClick={() => handleFileAction('download', taxDraft[0].file)}>View</button>
                                            </div>
                                        ) : (
                                            <>
                                                <div style={{ "marginLeft": "auto", "marginRight": 0 }} className="d-flex viewBtns">
                                                    <p>Document Rejected By Client</p>
                                                    <p style={{ "color": "red" }}>{lastUploadedDoc.comment}</p>
                                                    <button className="btn btn-primary" onClick={() => handleFileAction('download', taxDraft[0].file)}>View</button>
                                                    <button className="btn btn-primary" onClick={() => deleteTaxDraft('delete', taxDraft[0].id)}>Delete</button>
                                                </div>
                                                <div className="file-upload">
                                                    <label htmlFor="upload" className="file-upload__label">Upload tax draft</label>
                                                    <input id="upload" onChange={(event) => handleFileChange2(event)} className="file-upload__input" type="file" name="file-upload" />
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : ""}



                            </div>

                        </div>
                    </div>
                </div>
            </div>


            {/* <div class="modal customModal fade " id="tagdoc" tabindex="-1" aria-labelledby="TagdocModalLabel" aria-hidden="true"> */}
            <Modal className="modal-xl" show={showModal3} onHide={handleCloseModal3}>
                <div >
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4>Tag Documents</h4>
                            <button type="button" onClick={handleCloseModal3} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <Taxdocumentationadmin setformDataForDownload={setformDataForDownload} downloadDoc={downloadDoc} setdownloadDoc={setdownloadDoc} />
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </Modal >
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Uploaddocumentmodel getallUploadedDocument={getallUploadedDocument} handleShowModal={handleShowModal} />
                    {/* <p>Congrats! Tax Document has been saved.</p> */}
                </Modal.Body>
                {/* <Modal.Footer> */}
                {/* <Button variant="secondary" onClick={handleCloseModal}>
                        OK
                    </Button> */}
                {/* </Modal.Footer> */}
            </Modal>

            <Modal className="modal-xl" show={showModal2} onHide={() => setshowModal2(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>Tax Information!</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/* const [showModal2, setshowModal2] = useState(false); */}
                    <Printablecomponent setShowModal3={setShowModal3} setshowModal2={setshowModal2} formData={formData} downloadDoc={props.downloadDoc} setdownloadDoc={props.setdownloadDoc} />
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
