import React from "react"
import { Link } from 'react-router-dom';
import Header from '../layout/header'
import Footer from '../layout/footer'

function Taxconsulting(props) {
    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
            <section className="innerPageBanner servicesBanner">
                <div className="container">
                    <div className="bannerContent">
                        <h1>Tax Consulting Services</h1>
                    </div>
                </div>
            </section>
            <section className="fbarWrap">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-4">
                            <img src="images/Tax-Consulting.png" alt="" width="100%" />
                        </div>
                        <div className="col-sm-12 col-md-8">
                            <h3>Tax Consulting</h3>
                            <p>FILETAX is a leading professional Tax Consulting firm specializing in the delivery of world className.
                                We have found over the years that many clients need a bit more than “just” tax preparation. You may
                                be anticipating some of the below complexities and need a firm to turn to for guidance and planning:</p>
                            <div className="listWrap">
                                <ul className="list-unstyled">
                                    <li>Self-employment/contractor/freelancer income</li>
                                    <li>Rental properties or personal new home purchase</li>
                                    <li>Sale of Home or sale of other types of property</li>
                                    <li>Equity Compensation. For example, RSU, ESPP, ISO, NSO, etc. </li>
                                    <li>Moving of states or residency issues related to working from home away from your employer </li>
                                    <li>Company IPO, merger & acquisition </li>
                                    <li>Foreign Income Exclusion & Foreign Tax Credit </li>
                                    <li>Investment allocation </li>
                                    <li>Business structure optimization</li> 
                            </ul>
                        </div>
                        <p>Our team of experts has guided countless clients through these complexities and many more. Happy to
                            put together a tax plan or financial projection based on your individual circumstances. Just contact
                            us below for either a verbal appointment or numerical projection.</p>
                    </div>
                </div>
            </div>
        </section >
            <Footer />
        </>
    );
}

export default Taxconsulting;
