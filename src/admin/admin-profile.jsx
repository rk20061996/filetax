import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import Sidebar from "./sidebar";
import Taxdocumentationadmin from "./tax-documentation-admin";

import {
    useParams
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authFunc from '../serviceApi/admin';

function Adminprofile(props) {
    let { id } = useParams();
    let navigate = useNavigate();

    const [userData, setUserData] = useState([]);

    // alert(id)

    useEffect(() => {
        getSingleUserData()
    }, []);

    const getSingleUserData = async () => {
        const result = await authFunc.getSingleUser({ id });
        console.log("dataAdmin,", result)
        if (result?.data?.data?.res1) {
            setUserData(result?.data?.data?.res1);
            console.log("result?.data?.data?.res1", result?.data?.data?.res1)
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('admin');
            props.setisLoggedIn(false)

            navigate("/");
        }
    }
    return (
        <>
            {/* <Header /> */}
            <div className="main d-flex w-100 h-100">
                <Sidebar isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
                <div className="mainContent container-fluid">
                    <div className="card">
                        <fieldset className="customfieldset">
                            <div className="select-box">
                                <div className="options-container">
                                    <div className="option">
                                        <input type="radio" className="radio" id="value1" name="category" value="value1" />
                                        <label for="value1">Ready for preparation</label>
                                    </div>
                                    <div className="option">
                                        <input type="radio" className="radio" id="value2" name="category" value="value2" />
                                        <label for="value2">In Progress</label>
                                    </div>
                                    <div className="option">
                                        <input type="radio" className="radio" id="value3" name="category" value="value3" />
                                        <label for="value3">Summary Sent</label>
                                    </div>
                                    <div className="option">
                                        <input type="radio" className="radio" id="value3" name="category" value="value3" />
                                        <label for="value3">Pending Recieved</label>
                                    </div>
                                    <div className="option">
                                        <input type="radio" className="radio" id="value3" name="category" value="value3" />
                                        <label for="value3">Draft</label>
                                    </div>
                                    <div className="option">
                                        <input type="radio" className="radio" id="value3" name="category" value="value3" />
                                        <label for="value3">Ready for e-file</label>
                                    </div>
                                    <div className="option">
                                        <input type="radio" className="radio" id="value3" name="category" value="value3" />
                                        <label for="value3">Accepted</label>
                                    </div>
                                </div>
                                <div className="selector-wrapper">
                                    <span className="selected">Select Status</span>
                                    <svg className="arrow rotated" style={{ "text-align": "right" }} id="drp-arrow2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    // className="transition-all ml-auto rotate-180"
                                    >
                                        <path d="M7 14.5l5-5 5 5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </div>
                            </div>
                        </fieldset>
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
                                <button className="btn btn-primary w-auto" data-bs-toggle="modal" data-bs-target="#tagdoc">Tax Documentation Form</button>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-sm-12">
                                <h3>All Documents uploaded</h3>
                                <div className="DocumentUploaded">
                                    <h5 className="d-flex align-items-center">File type <p>Date: 20-09-2023</p>
                                        <div className="d-flex viewBtns">
                                            <button className="btn btn-primary">View</button>
                                            <button className="btn btn-primary">Download</button>
                                            <button className="btn btn-primary">Delete</button>
                                        </div>
                                    </h5>
                                    <button className="btn btn-primary">Upload Document</button>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-sm-12">
                                <h3 className="mb-3">Tax Draft </h3>
                                <div className="file-upload">
                                    <label for="upload" className="file-upload__label">Upload tax draft</label>
                                    <input id="upload" className="file-upload__input" type="file" name="file-upload" />
                                </div>
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
        </>
    );
}

export default Adminprofile;
