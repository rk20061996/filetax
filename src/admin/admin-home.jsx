import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import Sidebar from "./sidebar";
import { useNavigate } from "react-router-dom";
import authFunc from '../serviceApi/admin';
import * as XLSX from 'xlsx';

function Adminhome(props) {
    let navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [userPaymentData, setUserPaymentData] = useState([]);
    const [totalClientCount, settotalClientCount] = useState(0);

    const [filterStatus, setfilterStatus] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10); // Set the number of users per page
    const status = { 1: "Ready for preparation", 2: "In Progress", 3: "Summary Sent", 4: "Pending Recieved", 5: "Draft", 6: "Ready for e-file", 7: "Accepted" }


    useEffect(() => {
        let localSession = localStorage.getItem('token')
        if (!localSession) {
            localStorage.removeItem('token')
            navigate("/");
        }
        getUserData({ filterStatus }, "OnLoad");
        console.log("userPaymentData--->", userPaymentData)
    }, []);

    useEffect(() => {
        getUserData({ filterStatus }, "OnFilter");
    }, [filterStatus]);

    const getUserData = async (data, type) => {
        let localSession = localStorage.getItem('token')
        const result = await authFunc.getAllUser(data);
        console.log("dataAdmin,", result)
        if (result?.data?.data?.res1) {
            setUserData(result?.data?.data?.res1);
            const udata = result?.data?.data?.res1;
            let paymentCompleted = [];
            let paymentNotCompleted = [];
            if (type === "OnLoad") {
                for (let i = 0; i < udata.length; i++) {
                    let statusData = {};
                    if (udata[i].status_type === 7) {
                        paymentCompleted.push(udata[i]);
                    } else {
                        paymentNotCompleted.push(udata[i]);
                    }
                }
                setUserPaymentData({ paymentNotCompleted, paymentCompleted })
                settotalClientCount(udata.length)
            }
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('admin');
            props.setisLoggedIn(false)
            navigate("/");
        }
    }

    const exportToExcel = () => {
        // Filter the data you want to export
        const filteredData = userData.map(user => ({
            user_idMain: user.user_idMain,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            email: user.email,
            status_type: user.status_type,
        }));

        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
        const excelFileName = "user_data.xlsx";
        XLSX.writeFile(wb, excelFileName);
    };

    // Get current users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);
    const searchFilter = (user) => {
        const searchString = searchTerm.toLowerCase();
        return (
            user.user_idMain.toString().includes(searchString) ||
            user.firstname.toLowerCase().includes(searchString.toLowerCase()) ||
            user.lastname.toLowerCase().includes(searchString.toLowerCase()) ||
            user.email.toLowerCase().includes(searchString.toLowerCase()) ||
            user.phone.includes(searchString)
        );
    };

    const filteredUsers = userData.filter(searchFilter);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="main d-flex w-100 h-100">
                <Sidebar setfilterStatus={setfilterStatus} filterStatus={filterStatus} isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
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
                        <div className=" export-btn-container " style={{
                            "display": "flex",
                            "justifyContent": "space-between"
                        }}>
                            <input
                                // className="form-control"
                                type="text"
                                placeholder="Search by ID, Name, Email, or Phone"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                                style={{"marginRight": "10px"}}
                            />
                            <button className="btn btn-primary" onClick={exportToExcel}>
                                Export to Excel
                            </button>
                        </div>
                        {/* <div className="export-btn-container">
                            
                        </div> */}
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
                                {filteredUsers.map((user, index) => (
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
                </div>
            </div>
        </>
    );
}

export default Adminhome;
