import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import MessageModal from './MessageModal';

function Sidebar(props) {
    const [loggedIn, setLoggedIn] = useState(true);
    const user = useSelector(state => state.user); // Assuming 'user' is a slice of your Redux state
    const [userData, setUserData] = useState([]);
    const [updatedImage, setUpdatedImage] = useState('');
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let localSession = localStorage.getItem('token');
        let admincheck = localStorage.getItem("admin");

        if (localSession) {
            setLoggedIn(true);
        } else {
            navigate('/');
            setLoggedIn(false);
        }
        setUserData(user);
    }, [props.isLoggedIn]);

    useEffect(() => {
        if (props?.updatedUserData?.profileupdate) {
            setUserData({ userData: props.updatedUserData.obj });
        }
    }, [props.updatedUserData, props.updatedImage]);
    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const handleConfirmLogout = () => {
        setShowLogoutModal(false);
        localStorage.removeItem('token');
        navigate('/');
        setLoggedIn(false);
        props.setisLoggedIn(false);
    };

    const handleCancelLogout = () => {
        setShowLogoutModal(false);
    };
    const handleMessages = () => {
        // alert("d")
        setShowMessageModal(true);
    };

    const handleMessageModalClose = () => {
        setShowMessageModal(false);
    };
    return (
        <div className="SlideNav">

            <div className="logo">
                <img src="images/footer-logo.png" alt="" className="w-100" />
            </div>
            <div className="prfileWrap">
                <p>
                    Hello{" "}
                    {userData?.userData?.firstname}
                    {userData?.userData?.image && userData?.userData?.image !== '' ?
                        <NavLink to="/profile/profile">
                            <img src={'uploads/profile/' + userData?.userData?.image} alt="Profile" style={{ width: '20px', marginLeft: '70px' }} />
                        </NavLink> :
                        <NavLink to="/profile/profile">
                            <span className="material-symbols-outlined"> person </span>
                        </NavLink>
                    }
                </p>
            </div>
            <ul className="list-unstyled">
                <li className="bgColorChange">
                    <NavLink to="/profile/home" activeClassName="active">
                        <span className="material-symbols-outlined"> home </span> Home
                    </NavLink>
                </li>
                {/* <li className="bgColorChange">
                    <NavLink to="/profile/tax-documentaion" activeClassName="active">
                        <span className="material-symbols-outlined"> upload_file </span> Tax Information
                    </NavLink>
                </li> */}
                <li className="bgColorChange">
                    <NavLink to="/profile/upload-document" activeClassName="active">
                        <span className="material-symbols-outlined"> upload_file </span> Upload Documents
                    </NavLink>
                </li>

                <li className="bgColorChange">
                    <NavLink to="/profile/tax-return" activeClassName="active">
                        <span className="material-symbols-outlined"> note </span> Tax Returns
                    </NavLink>
                </li>
                {/* <li className="bgColorChange">
                    <NavLink to="/" activeClassName="active">
                        <span className="material-symbols-outlined"> attach_money </span> Payment
                    </NavLink>
                </li> */}
                {/* <li className="bgColorChange">
                    <a onClick={handleMessages}>
                        <span className="material-symbols-outlined"> mail </span> Messages
                    </a>
                </li> */}
                <li className="bgColorChange">
                    <a style={{ "cursor": "pointer" }} onClick={() => {
                        handleLogout()
                        // localStorage.removeItem('token');
                        // navigate('/');
                        // setLoggedIn(false);
                        // props.setisLoggedIn(false);
                    }}>
                        <span className="material-symbols-outlined"> logout </span> Logout
                    </a>
                </li>
            </ul>
            <Modal show={showLogoutModal} onHide={handleCancelLogout}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to log out?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelLogout}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
            {showMessageModal && (
                <MessageModal onClose={handleMessageModalClose} />
            )}
            {/* ... (previous code) */}
        </div>
    );
}

export default Sidebar;
