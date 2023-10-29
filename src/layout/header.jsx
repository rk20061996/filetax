import React from "react"
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function header() {
    return (
        <header>
            <div className="topHeader">
                <div className="container">
                    <div className="d-flex justify-content-end">
                        <p>Email Us: <a href="mailto:contact@filetax.us">contact@filetax.us</a></p>
                        <p>Call Us: <a href="tel:475 FILETAX">475 FILETAX</a></p>
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
                                        <li><a className="dropdown-item" href="tax-planning.html"> Tax Planning Advisory </a> </li>
                                        <li><a className="dropdown-item" href="student-tax.html"> Student Tax Filing </a> </li>
                                        <li><a className="dropdown-item" href="tax-return.html"> Tax Return Services </a> </li>
                                        <li><a className="dropdown-item" href="itin-processing"> ITIN Processing </a> </li>
                                        <li><a className="dropdown-item" href="fbar.html"> FBAR </a> </li>
                                        <li><a className="dropdown-item" href="fatca-html"> FATCA </a> </li>
                                        <li><a className="dropdown-item" href="tax-consulting.html"> Tax Consulting </a> </li>
                                        <li><a className="dropdown-item" href="tax-extension.html"> Tax Extension </a> </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Pricing</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contact Us</a>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="btn btn-primary">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup" className="btn btn-outline-primary"> Register Now</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>

    );
}

export default header;
