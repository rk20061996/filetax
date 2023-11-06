import React from "react"
import { Link } from 'react-router-dom';
import Header from '../layout/header'
import Footer from '../layout/footer'

function Contactus(props) {
    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
            <section className="innerPageBanner servicesBanner m-0">
                <div className="container">
                    <div className="bannerContent">
                        <h1>Contact Us</h1>
                    </div>
                </div>
            </section>
            <section className="contactWrap contactSection">
                <div className="container">
                    <form>
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <div className="form-group">
                                    <label>Your Name</label>
                                    <input type="text" placeholder="Enter your Full Name" />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="form-group">
                                    <label>Email Id*</label>
                                    <input type="text" placeholder="Enter your Email Id" />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label>Phone no*</label>
                                    <input type="text" placeholder="Enter your Phone Number" />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea placeholder="Enter your Message Here..."></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Contactus;
