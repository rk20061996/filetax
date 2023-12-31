import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import authFunc from '../serviceApi/admin';

function Sidebar(props) {
    const [sessionCheck, setsessionCheck] = useState('')
    const [isLoggedIn, setisLoggedIn] = useState(false)
    let navigate = useNavigate();
    const [selectedStatus, setSelectedStatus] = useState([0]);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [fileData, setfileData] = useState(0);

    // completeuserData
    // props.completeuserData
    // const showLeft = ['/admin/home'].indexOf(url) > -1;
    const location = useLocation();
    let isAdminHomePage = location.pathname === '/admin/home';
  
    // if (!isAdminHomePage) {
    //   // If not on the admin home page, render nothing or return null
    //   return null;
    // }
    useEffect(() => {
        let localSession = localStorage.getItem('token')
        setsessionCheck(localSession)
        if (!localSession) {
            localStorage.removeItem('token')
            setisLoggedIn(false)
            //   if (location.pathname !== '/confirm-account' && location.pathname !== '/reset-password') {
            navigate("/");
        }
        console.log("props.firstLoad-->", props.firstLoad)
        // if(props.firstLoad){
        // setSelectedStatus([0, 1, 2, 3, 4, 5, 6, 7, 8])
        props.setfirstLoad(false)
        // }
        getAllNotification()
    }, []);
    useEffect(() => {
        setSelectedStatus(props.filterStatus)
    }, [props.filterStatus]);
    const handleCheckboxChange = (value) => {
        // alert(value)
        console.log("value-->", value)
        if (value === 0) {
            // Select all checkboxes
            setSelectedStatus([0, 1, 2, 3, 4, 5, 6, 7, 8]);
            props.setfilterStatus([0, 1, 2, 3, 4, 5, 6, 7, 8]);

        } else {
            // Deselect "Select All" if it's present
            const dataCheckbox = selectedStatus.includes(0) ? [] : selectedStatus.slice();
            let finalValue = []
            if (selectedStatus.includes(value)) {
                // Deselect the clicked checkbox

                // alert('38')

                const updatedStatus = dataCheckbox.filter((item) => item !== value);
                finalValue = updatedStatus
                if (finalValue.length) {
                    setSelectedStatus(updatedStatus);
                    props.setfilterStatus(finalValue);
                } else {
                    setSelectedStatus([9]);
                    props.setfilterStatus([9]);
                }

            } else {
                // alert('43')
                console.log("value--->", value)
                // Select the clicked checkbox
                let alreadySelec = dataCheckbox
                alreadySelec.push(value)
                setSelectedStatus([...dataCheckbox, value]);
                props.setfilterStatus(alreadySelec);
            }
            if (dataCheckbox.length == 0) {
                // alert('fi')
                setSelectedStatus([value]);
                finalValue = [value]
                props.setfilterStatus(finalValue);

            }

        }

        // Propagate the selected status to the parent component
    };

    const handleLogout = () => {
        // Show the logout confirmation modal
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        // Perform logout actions
        setShowLogoutModal(false);

        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        navigate('/');
        props.setisLoggedIn(false);

        // Hide the logout confirmation modal
    };
    const cancelLogout = () => {
        // Hide the logout confirmation modal
        setShowLogoutModal(false);
    };

    const checkStatus = (num) => {
        let datas = []
        if (props.completeuserData && props.completeuserData.length > 0) {
            for (let i = 0; i < props.completeuserData.length; i++) {
                let statusData = {};
                if (props.completeuserData[i].status_type == num && num != 0 && num != 1) {
                    datas.push(props.completeuserData[i]);
                }
                if (num == 1) {
                    if (props.completeuserData[i].status_type == null) {
                        console.log("props.completeuserData", props.completeuserData[i])
                        datas.push(props.completeuserData[i]);
                    }
                    // datas.push(props.completeuserData[i]);

                }
            }
            if (num == 0) {
                datas = props.completeuserData;
            }
            console.log("nummm", num, datas)
            return datas.length

        }

    }

    const getAllNotification = async () => {
        try {
          const result = await authFunc.getAllNotification();
          console.log("result----11", result?.data?.data);
          const data = result?.data?.data ? result?.data?.data : []
          let count = 0
          for(let  i = 0 ; i <data.length ; i++){
            if(!data[i].is_read){
                count++
            }
          }
          setfileData(count)
        //   setfileData(result?.data?.data ? result?.data?.data : []);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };
    return (
        <div className="SlideNav">
            <div className="logo">
                <img src="images/footer-logo.png" alt="" className="w-100" />
            </div>
            <div className="prfileWrap">
                <p>Hello Admin
                    {/* <a href="profile.html"> \
                    <span className="material-symbols-outlined"> person </span> </a>  */}
                </p>
            </div>
            <ul className="list-unstyled">
                <li><NavLink to="/admin/home" activeClassName="active" className="nav-link"><span className="material-symbols-outlined"> home </span>Dashboard </NavLink></li>
                {/* <li><a href="home.html" className="active"><span className="material-symbols-outlined"> home </span> Dashboard</a></li> */}
                {isAdminHomePage && 
                <li>
                    <fieldset>
                        <details open={isAdminHomePage}>
                            <summary>Status</summary>
                            <ul>
                                <li>
                                    <label><input type="checkbox" name="fc" value="0"
                                        checked={selectedStatus?.includes(0)}
                                        onChange={() => handleCheckboxChange(0)}

                                    />All Clients {props?.completeuserData && props?.completeuserData.length ? (
                                        <span className="notification-badge">{checkStatus(0)}</span>
                                    ) : ""}
                                    </label>
                                </li>
                                <li>
                                    <label><input type="checkbox" name="fc" value="1"
                                        checked={selectedStatus?.includes(1)}
                                        onChange={() => handleCheckboxChange(1)}
                                    />To be started{props?.completeuserData &&  props?.completeuserData.length ? (
                                        <span className="notification-badge">{checkStatus(1)}</span>
                                    ) : ""}</label>
                                </li>
                                <li>
                                    <label><input type="checkbox" name="fc" value="2"
                                        checked={selectedStatus?.includes(2)}
                                        onChange={() => handleCheckboxChange(2)}
                                    />Pending for documents {props?.completeuserData &&   props?.completeuserData.length ?(
                                        <span className="notification-badge">{checkStatus(2)} </span>) : ""}</label>
                                </li>
                                <li>
                                    <label><input type="checkbox" name="fc" value="3"
                                        checked={selectedStatus?.includes(3)}
                                        onChange={() => handleCheckboxChange(3)}
                                    />In preperation {props?.completeuserData &&   props?.completeuserData.length ? (
                                        <span className="notification-badge">{checkStatus(3)} </span>):""}</label>
                                </li>
                                <li>
                                    <label><input type="checkbox" name="fc" value="4"
                                        checked={selectedStatus?.includes(4)}
                                        onChange={() => handleCheckboxChange(4)}
                                    />Draft sent (Payment pending) {props?.completeuserData &&   props?.completeuserData.length ? (
                                        <span className="notification-badge">{checkStatus(4)} </span>):""}</label>
                                </li>
                                <li>
                                    <label><input type="checkbox" name="fc" value="5"
                                        checked={selectedStatus?.includes(5)}
                                        onChange={() => handleCheckboxChange(5)}
                                    />Client review (Payment received){props?.completeuserData &&   props?.completeuserData.length ? (
                                        <span className="notification-badge">{checkStatus(5)} </span>):""}</label>
                                </li>
                                <li>
                                    <label><input type="checkbox" name="fc" value="6"
                                        checked={selectedStatus?.includes(6)}
                                        onChange={() => handleCheckboxChange(6)}
                                    />Ready for Filing{props?.completeuserData &&   props?.completeuserData.length ? (
                                        <span className="notification-badge">{checkStatus(6)} </span>):""}</label>
                                </li>
                                <li>
                                    <label><input type="checkbox" name="fc" value="7"
                                        checked={selectedStatus?.includes(7)}
                                        onChange={() => handleCheckboxChange(7)}
                                    />Filing completed{props?.completeuserData &&   props?.completeuserData.length ? (
                                        <span className="notification-badge">{checkStatus(7)} </span>):""}</label>
                                </li>
                            </ul>
                        </details>
                    </fieldset>
                </li>
                 }
                 <li><NavLink to="/admin/notification" activeClassName="active" className="nav-link"><span className="material-symbols-outlined"> notifications </span>Notification {fileData ? <span className="notification-badge">{fileData}</span> : ""}</NavLink></li>
                 
                 <li style={{ "backgroundColor": "#0b1c41", "cursor": "pointer" }}>
                    {/* <a >
                        <span className="material-symbols-outlined"> logout </span> Message
                    </a> */}
                    <NavLink to="/admin/message" activeClassName="active" className="nav-link"><span className="material-symbols-outlined"> chat </span>Message </NavLink>
                </li>

                <li style={{ "background": "#0b1c41", "cursor": "pointer" }}>
                    {/* <a >
                        <span className="material-symbols-outlined"> logout </span> Message
                    </a> */}
                    <NavLink to="/admin/contact-us" activeClassName="active" className="nav-link"><span className="material-symbols-outlined"> chat </span>Contact Us Message </NavLink>
                </li>

                <li style={{ "backgroundColor": "wheat", "cursor": "pointer" }}>
                    <a onClick={handleLogout}>
                        <span className="material-symbols-outlined"> logout </span> Log Out
                    </a>
                </li>

            </ul>
            <Modal show={showLogoutModal} onHide={cancelLogout}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to log out?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelLogout}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Sidebar;
