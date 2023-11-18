import React, { useState,useEffect } from "react"
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';

function Sidebar(props) {
    const [sessionCheck, setsessionCheck] = useState('')
    const [isLoggedIn, setisLoggedIn] = useState(false)
    let navigate = useNavigate();

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
                                    <label><input type="checkbox" name="fc" value="red"  checked/>All Clients</label>
                                </li>
                                <li>
                                    <label><input type="checkbox" name="fc" value="orange" />Ready for preparation</label>
                                </li>
                                <li>
                                    <label><input type="checkbox" name="fc" value="yellow" />In Progress </label>
                                </li>
                                <li>
                                    <label><input type="checkbox" name="fc" value="green" />Summary Sent</label>
                                </li>
                                <li>
                                    <label><input type="checkbox" name="fc" value="blue"  />Pending Recieved </label>
                                </li>
                                <li>
                                    <label><input type="checkbox" name="fc" value="purple" />Draft</label>
                                </li>
                                <li>
                                    <label><input type="checkbox" name="fc" value="magenta" />Ready for e-file</label>
                                </li>
                                <li>
                                    <label><input type="checkbox" name="fc" value="lightpink" />Accepted</label>
                                </li>
                            </ul>
                        </details>
                    </fieldset>
                </li>
                <li>
                    <a onClick={() => {
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
