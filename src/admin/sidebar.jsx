import React, { useState,useEffect } from "react"
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';

function Sidebar(props) {
    const [sessionCheck, setsessionCheck] = useState('')
    const [isLoggedIn, setisLoggedIn] = useState(false)
    let navigate = useNavigate();
    const [selectedStatus, setSelectedStatus] = useState([0]);
    useEffect(() => {
        let localSession = localStorage.getItem('token')
        setsessionCheck(localSession)
        if (!localSession) {
            localStorage.removeItem('token')
            setisLoggedIn(false)
            //   if (location.pathname !== '/confirm-account' && location.pathname !== '/reset-password') {
            navigate("/");
        }
    }, []);

    const handleCheckboxChange = (value) => {
        // alert(value)
        setSelectedStatus(value)
        props.setfilterStatus(value)
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
                <li>
                    <fieldset>
                        <details open>
                            <summary>Status</summary>
                            <ul>
                                <li>
                                    <label><input type="radio" name="fc" value="0"    
                                    checked={selectedStatus.includes(0)}
                                        onChange={() => handleCheckboxChange("0")}
                                    
                                        />All Clients</label>
                                </li>
                                <li>
                                    <label><input type="radio" name="fc" value="1" 
                                    checked={selectedStatus.includes(1)}
                                        onChange={() => handleCheckboxChange("1")}
                                        />Ready for preparation</label>
                                </li>
                                <li>
                                    <label><input type="radio" name="fc" value="2" 
                                    checked={selectedStatus.includes(2)}
                                    onChange={() => handleCheckboxChange("2")}
                                    />In Progress </label>
                                </li>
                                <li>
                                    <label><input type="radio" name="fc" value="3" 
                                    checked={selectedStatus.includes(3)}
                                    onChange={() => handleCheckboxChange("3")}
                                    />Summary Sent</label>
                                </li>
                                <li>
                                    <label><input type="radio" name="fc" value="4"  
                                    checked={selectedStatus.includes(4)}
                                    onChange={() => handleCheckboxChange("4")}
                                    />Pending Recieved </label>
                                </li>
                                <li>
                                    <label><input type="radio" name="fc" value="5" 
                                    checked={selectedStatus.includes(5)}
                                    onChange={() => handleCheckboxChange("5")}
                                    />Draft</label>
                                </li>
                                <li>
                                    <label><input type="radio" name="fc" value="6" 
                                    checked={selectedStatus.includes(6)}
                                    onChange={() => handleCheckboxChange("6")}
                                    />Ready for e-file</label>
                                </li>
                                <li>
                                    <label><input type="radio" name="fc" value="7" 
                                    checked={selectedStatus.includes(7)}
                                    onChange={() => handleCheckboxChange("7")}
                                    />Accepted</label>
                                </li>
                            </ul>
                        </details>
                    </fieldset>
                </li>
                <li style={{"backgroundColor": "wheat","cursor":"pointer"}}>
                    <a  onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('admin');
                        navigate('/');
                        // setLoggedIn(false);
                        props.setisLoggedIn(false);
                    }} >
                        <span className="material-symbols-outlined"> logout </span> Log Out</a></li>

            </ul>
        </div>
    );
}

export default Sidebar;
