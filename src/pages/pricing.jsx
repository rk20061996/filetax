import React from "react"
import { Link } from 'react-router-dom';
import Header from '../layout/header'
import Footer from '../layout/footer'

function Pricing(props) {
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
                                <h2>Individual Tax</h2>
                                <p>for individuals</p>
                                <h3>Federal - $35</h3>
                                <h3>State - $30</h3>
                                <h3>Itemized(Sch-A) - $75</h3>
                                <p>Refer a friend and earn $10</p>
                                <button className="btn btn-primary">Get Started</button>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="pricingContent active">
                                <h2>Business Tax</h2>
                                <p>for businesses and organizations</p>
                                <h3>$499.99</h3>
                                <p>Refer a friend and earn $40</p>
                                <button className="btn btn-primary">Get Started</button>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="pricingContent">
                                <h2>Payroll Processing</h2>
                                <p>for paying employees</p>
                                <h3>Contact us to know more..</h3>
                                <button className="btn btn-primary">Get Started</button>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="pricingContent">
                                <h2>Book Keeping</h2>
                                <p>for book keeping services</p>
                                <h3>Contact us to know more..</h3>
                                <button className="btn btn-primary">Start free trial</button>
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
