import React from "react"
import { Link } from 'react-router-dom';
import Sidebar from "./sidebar";
import Header from "../layout/header";

function Adminhome() {
    return (
        <>
            {/* <Header /> */}
            <div className="main d-flex w-100 h-100">

                <Sidebar/>
                <div className="mainContent container-fluid">
                    <div className="card dashboard">
                        <h3>Dashboard</h3>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="innerCard">
                                    <h4>Payments Completed</h4>
                                    <p>7</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="innerCard">
                                    <h4>Client Count</h4>
                                    <p>170</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="innerCard">
                                    <h4>Payments Pending</h4>
                                    <p>181</p>
                                </div>
                            </div>
                        </div>
                        <table className="table">
                            <tr>
                                <th>Client no</th>
                                <th>Full Name</th>
                                <th>Phone number</th>
                                <th>Email Id</th>
                                <th><a href="" className="filter" data-bs-toggle="modal" data-bs-target="#exampleModal"><span className="material-symbols-outlined">
                                    filter_list
                                </span></a> Status</th>
                                <th>Profile</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Minakshi</td>
                                <td>1234567888</td>
                                <td>test@gmail.com</td>
                                <td>Ready for payment</td>
                                <td><a href="profile.html" className="btn btn-primary">View Client</a></td>
                            </tr>
                        </table>
                    </div>
                    <div className="modal customModal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4>Status Wise Clients</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <ul className="list-unstyled">
                                        <li> <input type="checkbox" /> All Clients</li>
                                        <li> <input type="checkbox" /> Ready for preparation</li>
                                        <li> <input type="checkbox" /> In Progress</li>
                                        <li> <input type="checkbox" /> Summary Sent</li>
                                        <li> <input type="checkbox" /> Pending Recieved</li>
                                        <li> <input type="checkbox" /> Draft</li>
                                        <li> <input type="checkbox" /> Ready for e-file</li>
                                        <li> <input type="checkbox" /> Accepted</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Adminhome;
