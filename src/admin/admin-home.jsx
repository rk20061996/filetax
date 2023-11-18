import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import Sidebar from "./sidebar";
// import Header from "../layout/header";
import { useNavigate } from "react-router-dom";
import authFunc from '../serviceApi/admin';

function Adminhome(props) {
    let navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [userPaymentData, setUserPaymentData] = useState([]);
    const [totalClientCount, settotalClientCount] = useState(0);

    const [filterStatus, setfilterStatus] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10); // Set the number of users per page
    const status = {1:"Ready for preparation", 2:"In Progress", 3:"Summary Sent", 4:"Pending Recieved", 5:"Draft", 6:"Ready for e-file", 7:"Accepted"	}
    useEffect(() => {
        let localSession = localStorage.getItem('token')
        if (!localSession) {
            localStorage.removeItem('token')
            navigate("/");
        }
        getUserData({filterStatus},"OnLoad");
        console.log("userPaymentData--->",userPaymentData)
    }, []);

    useEffect(() => {
        getUserData({filterStatus},"OnFilter");

    }, [filterStatus]);

    const getUserData = async (data,type) => {
        let localSession = localStorage.getItem('token')
        const result = await authFunc.getAllUser(data);
        console.log("dataAdmin,", result)
        if (result?.data?.data?.res1) {
            setUserData(result?.data?.data?.res1);
            // const [userPaymentData, setUserPaymentData] = useState([]);

            const udata = result?.data?.data?.res1
            // let 
            let paymentCompleted = [];
            let paymentNotCompleted = [];
            if(type === "OnLoad"){
                for (let i = 0; i < udata.length; i++) {
                    let statusData = {};
                    if (udata[i].status_type === 7) {
                        paymentCompleted.push(udata[i]);
                    } else {
                        paymentNotCompleted.push(udata[i]);
                    }
                }
                setUserPaymentData({paymentNotCompleted,paymentCompleted})   
                settotalClientCount(udata.length)
            }

        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('admin');

            props.setisLoggedIn(false)
            navigate("/");
        }
    }

    // Get current users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            {/* <Header /> */}
            <div className="main d-flex w-100 h-100">
                <Sidebar setfilterStatus={setfilterStatus} filterStatus={filterStatus} isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn}/>
                <div className="mainContent container-fluid">
                    <div className="card dashboard">
                        <h3>Dashboard</h3>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="innerCard">
                                    <h4>Payments Completed</h4>
                                    <p>{userPaymentData?.paymentCompleted?.length}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="innerCard">
                                    <h4>Client Count</h4>
                                    <p>{totalClientCount}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="innerCard">
                                    <h4>Payments Pending</h4>
                                    <p>{userPaymentData?.paymentNotCompleted?.length}</p>
                                </div>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Client no</th>
                                    <th>Full Name</th>
                                    <th>Phone number</th>
                                    <th>Email Id</th>
                                    <th>Status</th>
                                    <th>Profile</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.user_idMain}</td>
                                        <td>{user.firstname} {user.lastname}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.email}</td>
                                        <td>{user.status_type ? status[user.status_type] : "Ready for preparation"}</td>
                                        <td><Link to={`/admin/profile/${user.user_idMain}`} className="btn btn-primary">View Client</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination>
                            {[...Array(Math.ceil(userData.length / usersPerPage)).keys()].map((number) => (
                                <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                                    {number + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </div>
                    {/* <div className="modal customModal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default Adminhome;
