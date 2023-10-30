import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { useNavigate } from "react-router-dom";

function Sidebar(props) {
    const [loggedIn, setloggedIn] = useState(true)
    // alert(props.isLoggedIn)
    let navigate = useNavigate();

    useEffect(() => {
        let localSession = localStorage.getItem('token')
        console.log("props.isLoggedIn", props.isLoggedIn)
        if (localSession) {
            setloggedIn(true)
            // alert("here")
        } else {
            // alert("there")
            navigate('/')
            setloggedIn(false)
        }
    }, [props.isLoggedIn]);
    return (
        <div className="SlideNav">
            <div className="logo">
                <img src="images/footer-logo.png" alt="" className="w-100" />
            </div>
            <div className="prfileWrap">
                <p>Hii Minii <NavLink  to="/profile/profile"> <span className="material-symbols-outlined"> person </span> </NavLink> </p>
            </div>
            <ul className="list-unstyled">
                <li className="bgColorChange" >
                    <NavLink to="/profile/home" activeClassName="active">
                        <span className="material-symbols-outlined"> home </span> Home</NavLink>
                </li>
                <li className="bgColorChange">
                    <NavLink to="/profile/upload-document" activeClassName="active"> <span className="material-symbols-outlined"> upload_file
                    </span> Upload Documents</NavLink>
                </li>
                <li className="bgColorChange">
                    <NavLink to="/profile/tax-return" activeClassName="active">
                        <span className="material-symbols-outlined"> note </span> Tax Returns</NavLink> </li>
                <li className="bgColorChange"> <NavLink to="/" activeClassName="active"> <span className="material-symbols-outlined"> attach_money </span> Payment</NavLink> </li>
                <li className="bgColorChange"> <a onClick={() => {
                    localStorage.removeItem('token');
                    navigate('/')
                    setloggedIn(false)
                    props.setisLoggedIn(false)
                }}> <span className="material-symbols-outlined"> logout </span> Logout</a> </li>
            </ul>
        </div>
    );
}

export default Sidebar;
