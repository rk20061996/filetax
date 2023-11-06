import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Header(props) {
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
            setloggedIn(false)
        }
    }, [props.isLoggedIn]);

    return (
        <header>
            <div className="topHeader">
                <div className="innertopHeader">
                    <div className="container">
                        <div className="d-flex justify-content-end">
                            <p>Email Us: <a href="mailto:contact@filetax.us">contact@filetax.us</a></p>
                            <p>Call Us: <a href="tel:475 FILETAX">475 FILETAX</a></p>
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container">
                        <NavLink to="/"> <img src="images/logo.png" alt="" className="logo" /> </NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink to="/" activeClassName="active" className="nav-link">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/about-us" activeClassName="active" className="nav-link">About Us</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Services
                                    </a>
                                    <ul className="dropdown-menu">
                                        {/* student-tax  tax-return itin-processing tax-consulting*/}
                                        <li><NavLink to="/tax-planning" activeClassName="active" className="nav-link"> Tax Planning Advisory </NavLink> </li>
                                        <li><NavLink to="/student-tax" activeClassName="active" className="nav-link"> Student Tax Filing </NavLink> </li>
                                        <li><NavLink to="/tax-return" activeClassName="active" className="nav-link"> Tax Return Services </NavLink> </li>
                                        <li><NavLink to="/itin-processing" activeClassName="active" className="nav-link"> ITIN Processing </NavLink> </li>
                                        <li><a className="dropdown-item" href="fbar.html"> FBAR </a> </li>
                                        <li><a className="dropdown-item" href="fatca-html"> FATCA </a> </li>
                                        <li><NavLink to="/tax-consulting" activeClassName="active" className="nav-link">  Tax Consulting </NavLink> </li>
                                        <li><a className="dropdown-item" href="tax-extension.html"> Tax Extension </a> </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/pricing" activeClassName="active" className="nav-link">Pricing</NavLink>

                                    {/* <a className="nav-link" href="#">Pricing</a> */}
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/contact-us" activeClassName="active" className="nav-link">Contact Us</NavLink>

                                    {/* <a className="nav-link" href="#">Contact Us</a> */}
                                </li>
                                {!loggedIn &&
                                    <li className="nav-item">
                                        <Link to="/login" className="btn btn-primary">Login</Link>
                                    </li>}
                                {!loggedIn && <li className="nav-item">
                                    <Link to="/signup" className="btn btn-outline-primary"> Register Now</Link>
                                </li>}
                                {loggedIn &&
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Profile
                                        </a>
                                        <ul className="dropdown-menu">
                                            {/* profile/home */}
                                            <li> <Link to="/profile/home" className="dropdown-item">My Profile</Link></li>
                                            {/* <li><a className="dropdown-item" href="#">  </a> </li> */}
                                            <li><a className="dropdown-item" onClick={() => {
                                                localStorage.removeItem('token');
                                                navigate('/')
                                                setloggedIn(false)
                                                props.setisLoggedIn(false)
                                            }}> LogOut</a> </li>

                                        </ul>
                                    </li>
                                }


                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>

    );
}

export default Header;
