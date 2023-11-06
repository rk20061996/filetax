import React from "react"
import { Link } from 'react-router-dom';
import Header from '../layout/header'
import Footer from '../layout/footer'

function Taxreturnhome(props) {
    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
            <section className="innerPageBanner servicesBanner">
                <div className="container">
                    <div className="bannerContent">
                        <h1>Tax Return Services</h1>
                    </div>
                </div>
            </section>
            <section className="outerTaxReturn">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <h3>Business TAX Return</h3>
                            <p>A business tax return is filed annually by all companies that conduct business in the US.</p>
                            <p>We offer three types of business income tax return packages: zero-income tax return for dormant companies,
                                standard tax return for most companies that were active during the year, and premium tax return for
                                companies falling into some special categories.</p>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <h3>Personal Income Tax Return</h3>
                            <p>All US. persons (citizens, permanent residents and certain non-residents with Social Security Number) are
                                required to file personal income tax returns by mid-April of the following year.</p>
                            <p>Non-US. persons are typically responsible to file their income tax returns in the country of their
                                residence. However, when doing business in the US. in certain cases the US. law requires non-US.
                                persons to file personal income tax return.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="taxReturn">
                <div className="container">
                    <h2 className="text-center">Our Personal Tax Return Services include</h2>
                    <ul className="list-unstyled">
                        <li>
                            <img src="images/img1.png" alt="" />
                            <p>Preparation of tax computations</p>
                        </li>
                        <li>
                            <img src="images/img2.png" alt="" />
                            <p>Preparation of self-assessment tax return</p>
                        </li>
                        <li>
                            <img src="images/img3.png" alt="" />
                            <p>Submission of personal tax return.</p>
                        </li>
                        <li>
                            <img src="images/img4.png" alt="" />
                            <p>Advance notification of personal tax payments</p>
                        </li>
                        <li>
                            <img src="images/img5.png" alt="" />
                            <p>Related correspondence with the Inland Revenue</p>
                        </li>
                    </ul>
                </div>
            </section>
            <section className="areaWrapper listWrap">
                <div className="container">
                    <div className="text-center">
                        <h2>Key Areas We Focus On Include</h2>
                        <p>Personal Tax Return Service is a key component of the accounting<br />
                            and finance services provided by FILETAX</p>
                    </div>
                    <ul className="list-unstyled">
                        <li>Maximizing Work-Related Deductions</li>
                        <li>Rental properties.</li>
                        <li>Superannuation contributions.</li>
                        <li>Fast lodgement with maximum refunds GUARANTEED*</li>
                        <li>Maximizing Work-Related Deductions</li>
                        <li>Rental properties.</li>
                        <li>Superannuation contributions.</li>
                        <li>Fast lodgement with maximum refunds GUARANTEED*</li>
                    </ul>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Taxreturnhome;
