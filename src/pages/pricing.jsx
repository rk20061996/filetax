import React from "react"
import { Link } from 'react-router-dom';
import Header from '../layout/header'
import Footer from '../layout/footer'
import { useNavigate } from "react-router-dom";

function Pricing(props) {
    let navigate = useNavigate();

    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
            <section className="innerPageBanner servicesBanner">
                <div className="container">
                    <div className="bannerContent">
                        <h1>Pricing</h1>
                    </div>
                </div>
            </section>
            <section className="pricingWrap">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-3">
                            <div className="pricingContent">
                                <div className="innerPricingContent">
                                    <h2>Individual Tax</h2>
                                    <p className="pricingTag">for individuals</p>
                                    <h3>Federal - $50</h3>
                                    <h3>State - $35</h3>
                                    <h3>Itemized(Sch-A) - $25</h3>
                                    <p>Refer a friend and earn $10</p>
                                </div>
                                <a onClick={() => {
                                    // localStorage.removeItem('token');
                                    let localSession = localStorage.getItem('token')
                                    if (localSession) {
                                        navigate('/profile/home')
                                    } else {
                                        navigate('/login')
                                    }

                                }} className="btn btn-outline-primary">Get Started</a>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="pricingContent">
                                <div className="innerPricingContent">
                                    <h2>Business Tax</h2>
                                    <p className="pricingTag">for businesses and organizations</p>
                                    <h3>$499.99</h3>
                                    <p>Refer a friend and earn $40</p>
                                </div>
                                <a onClick={() => {
                                    let localSession = localStorage.getItem('token')
                                    if (localSession) {
                                        navigate('/profile/home')
                                    } else {
                                        navigate('/login')
                                    }
                                }} className="btn btn-outline-primary">Get Started</a>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="pricingContent">
                                <div className="innerPricingContent">
                                    <h2>Payroll Processing</h2>
                                    <p className="pricingTag">for paying employees</p>
                                    <h3>Contact us to know more..</h3>
                                </div>
                                <a onClick={() => {
                                    let localSession = localStorage.getItem('token')
                                    if (localSession) {
                                        navigate('/profile/home')
                                    } else {
                                        navigate('/login')
                                    }
                                }} className="btn btn-outline-primary">Get Started</a>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="pricingContent">
                                <div className="innerPricingContent">
                                    <h2>Book keeping</h2>
                                    <p className="pricingTag">for book keeping services</p>
                                    <h3>Contact us to know more..</h3>
                                </div>
                                <a onClick={() => {
                                    let localSession = localStorage.getItem('token')
                                    if (localSession) {
                                        navigate('/profile/home')
                                    } else {
                                        navigate('/login')
                                    }
                                }} className="btn btn-outline-primary">Get Started</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Pricing;
