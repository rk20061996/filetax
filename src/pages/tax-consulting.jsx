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
                            <h3>Tax Consulting Services</h3>
                            <p>Welcome to File tax, your destination for expert Tax Consulting Services. We understand that the intricacies of tax matters can be overwhelming, and making informed financial decisions is crucial. Our seasoned tax consultants are here to provide personalized, strategic advice and solutions tailored to your unique financial needs. Whether you're planning for your future, facing tax challenges, or seeking ways to optimize your financial well-being, we are your trusted partners in achieving financial success. Let us guide you on your journey toward financial security and prosperity."</p>
                            <div className="listWrap">
                                <ul className="list-unstyled">
                                    <li>Self-employment/contractor/freelancer income</li>
                                    <li>Rental properties or personal new home purchase</li>
                                    <li>Sale of Home or sale of other types of property</li>
                                    <li>Equity Compensation. For example, RSU, ESPP, ISO, NSO, etc.</li>
                                    <li>Moving of states or residency issues related to working from home away from your employer</li>
                                    <li>Company IPO, merger & acquisition </li>
                                    <li>Foreign Income Exclusion & Foreign Tax Credit </li>
                                    <li>Investment allocation </li>
                                    <li>Business structure optimization</li> 
                            </ul>
                        </div>
                        <p>Our team of experts has guided countless clients through these complexities and many more. Happy to put together a tax plan or financial projection based on your individual circumstances. Just contact us below for either a verbal appointment or numerical projection.</p>
                    </div>
                </div>
            </div>
        </section >
            <Footer />
        </>
    );
}

export default Taxconsulting;
