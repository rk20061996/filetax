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
    const [completeuserData, setcompleteuserData] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const status = { 1: "Ready for preparation", 2: "In Progress", 3: "Summary Sent", 4: "Pending Recieved", 5: "Draft", 6: "Ready for e-file", 7: "Accepted" }

    const [sortColumn, setSortColumn] = useState("user_idMain");
    const [sortDirection, setSortDirection] = useState("asc");

    const handleSort = (column) => {
        // If the same column is clicked again, toggle the sort direction
        if (column === sortColumn) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            // If a new column is clicked, set it as the sorting column with ascending direction
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    useEffect(() => {
        console.log("sortColumn-->", sortColumn)
        const sortedUsers = [...filteredUsers].sort((a, b) => {
            const isDesc = sortDirection === "desc" ? -1 : 1;
            if (sortColumn === "user_idMain" || sortColumn === "phone" || sortColumn === "status_type") {
                return isDesc * (a[sortColumn] - b[sortColumn]);
            } else if (sortColumn === "firstname" || sortColumn === "email") {
                // For string comparison, use localeCompare
                return isDesc * a[sortColumn].toLowerCase().localeCompare(b[sortColumn].toLowerCase());
            } else {
                // For string comparison, use localeCompare
                return isDesc * a[sortColumn].localeCompare(b[sortColumn]);
            }
        });
        setFilteredUsers(sortedUsers)
    }, [sortColumn, sortDirection])


    useEffect(() => {
        let filt = props.filterStatus;
        getUserData({ filterStatus: filt.length ? filt : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }, "OnLoad");
        getAllUserDataWithoutFilter();
    }, []);

    useEffect(() => {
        let filt = props.filterStatus;
        getUserData({ filterStatus: filt.length ? filt : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }, "OnFilter");
    }, [props.filterStatus]);

    const getUserData = async (data, type) => {
        let localSession = localStorage.getItem('token');
        const result = await authFunc.getAllUser(data);
        if (result?.data?.data?.res1) {
            setUserData(result?.data?.data?.res1);
            // Update filtered users based on the search term
            const updatedFilteredUsers = result?.data?.data?.res1.filter(searchFilter);
            setFilteredUsers(updatedFilteredUsers);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('admin');
            props.setisLoggedIn(false);
            navigate("/");
        }
    };

    const getAllUserDataWithoutFilter = async (data, type) => {
        const result = await authFunc.getAllUser({ filterStatus: [0, 1, 2, 3, 4, 5, 6, 7, 8] });
        if (result?.data?.data?.res1) {
            const udata = result?.data?.data?.res1;
            let paymentCompleted = [];
            let paymentNotCompleted = [];
            for (let i = 0; i < udata.length; i++) {
                let statusData = {};
                if (udata[i].status_type === 7) {
                    paymentCompleted.push(udata[i]);
                } else {
                    paymentNotCompleted.push(udata[i]);
                }
            }
            setUserPaymentData({ paymentNotCompleted, paymentCompleted });
            settotalClientCount(udata.length);
            setcompleteuserData(udata);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('admin');
            props.setisLoggedIn(false);
            navigate("/");
        }
    };

    const exportToExcel = () => {
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

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const searchFilter = (user) => {
        const searchString = searchTerm.toLowerCase();
        return (
            user.user_idMain.toString().includes(searchString) ||
            user.firstname.toLowerCase().includes(searchString.toLowerCase()) ||
            user.lastname.toLowerCase().includes(searchString.toLowerCase()) ||
            user.email.toLowerCase().includes(searchString.toLowerCase()) ||
            user.phone.includes(searchString) ||
            (user.dynamicUser_id && user.dynamicUser_id.toLowerCase().includes(searchString.toLowerCase()))
        );
    };

    useEffect(() => {
        // Update filtered users based on the search term
        const updatedFilteredUsers = userData.filter(searchFilter);
        setFilteredUsers(updatedFilteredUsers);
    }, [searchTerm, userData]);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="main d-flex w-100 h-100">
                <Sidebar
                    firstLoad={props.firstLoad}
                    setfirstLoad={props.setfirstLoad}
                    completeuserData={completeuserData}
                    setfilterStatus={props.setfilterStatus}
                    filterStatus={props.filterStatus}
                    isLoggedIn={props.isLoggedIn}
                    setisLoggedIn={props.setisLoggedIn}
                />
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
                                type="text"
                                placeholder="Search by ID, Name, Email, or Phone"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                                style={{ "marginRight": "10px" }}
                            />
                            <button className="btn btn-primary" onClick={exportToExcel}>
                                Export to Excel
                            </button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{"cursor":"pointer"}} onClick={() => handleSort("user_idMain")}>Client no{sortColumn === "user_idMain" && (
                                        <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                                    )}</th>
                                    <th style={{"cursor":"pointer"}} onClick={() => handleSort("firstname")}>Full Name{sortColumn === "firstname" && (
                                        <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                                    )}</th>
                                    <th style={{"cursor":"pointer"}} onClick={() => handleSort("phone")}>Phone number{sortColumn === "phone" && (
                                        <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                                    )}</th>
                                    <th style={{"cursor":"pointer"}} onClick={() => handleSort("email")}>Email Id{sortColumn === "email" && (
                                        <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                                    )}</th>
                                    <th style={{"cursor":"pointer"}} onClick={() => handleSort("status_type")}>Status{sortColumn === "status_type" && (
                                        <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                                    )}</th>
                                    <th>Profile</th>
                                </tr>
                            </thead>
                            {filteredUsers.length ? (
                                <tbody>
                                    {currentUsers.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.dynamicUser_id ? user.dynamicUser_id : user.user_idMain}</td>
                                            <td>{user.firstname} {user.lastname}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.email}</td>
                                            <td>{user.status_type ? status[user.status_type] : "Ready for preparation"}</td>
                                            <td><Link to={`/admin/profile/${user.user_idMain}`} className="btn btn-primary">View Client</Link></td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <h5 style={{
                                    "marginTop": "30px",
                                    "marginLeft": "10px"
                                }}>No Data Found</h5>
                            )}
                        </table>
                        <Pagination>
                            {[...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys()].map((number) => (
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
