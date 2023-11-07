import React from "react"
import Header from'../layout/header'
import Footer from'../layout/footer'

import { Link } from 'react-router-dom';

function home(props) {
    return (
        <>
        <Header isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn}/>
            <section className="bannerWrap">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-8">
                            <div className="bannerContent">
                                <h1>Your Expert tax Consultant</h1>
                                <p>Helps you to manage your tax.</p>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <img src="images/banner-img.png" alt="" className="w-100" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="taxServices">
                <div className="container">
                    <div className="w-80">
                        <div className="mainHeading">
                            <h2>Who we are</h2>
                        </div>
                        <p>Welcome to File Tax, our company is a trusted partner in international tax compliance.
                            We specialize in ITIN application, FBAR (Foreign Bank Account Report) filing, and FATCA
                            (Foreign Account Tax Compliance Act) reporting. Our expert team simplifies the complexities
                            of global tax obligations, ensuring efficient, accurate, and hassle-free solutions. With us,
                            you're in capable hands for seamless international tax compliance.</p>
                        <div className="text-center mt-5">
                            <img src="https://qxglobalgroup.com/wp-content/uploads/2023/07/QX-GTPL-2023.jpg" alt="" class="w-100" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="service-bar">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-4">
                            <div className="innerService">
                                <span className="material-symbols-outlined">
                                    person
                                </span>
                                <h3>Expert Advisor</h3>
                                <p>We help our clients stay out of trouble with the
                                    IRS and stay in compliance with US. tax laws.</p>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <div className="innerService">
                                <span className="material-symbols-outlined">
                                    trending_up
                                </span>
                                <h3>Tax Consulting</h3>
                                <p>Our firm is dedicated to the needs of businesses and to achieve their ambitions</p>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <div className="innerService">
                                <span className="material-symbols-outlined">
                                    attach_money
                                </span>
                                <h3>Financial Planning</h3>
                                <p>The advert of databases and modern analytical tools have smoothen the entire process. We has its
                                    own customised tools to get accurate analysis for your Financial Planning.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="serviceSlider">
                <div className="container">
                    <div className="mainHeading">
                        <h2>Our Services</h2>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-md-4">
                            <div className="item">
                                <span className="material-symbols-outlined">
                                    account_tree
                                </span>
                                <h4>Tax Planning Advisory</h4>
                                <p>Our expert advisors provide strategic guidance to optimize your financial decisions and minimize your tax liability.<a href="#">...Read more</a></p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="item">
                                <span className="material-symbols-outlined">
                                    account_tree
                                </span>
                                <h4>Student Tax Filing</h4>
                                <p>We specialize in assisting students with their tax returns, ensuring they take advantage of applicable deductions and credits.<a href="#">...Read more</a></p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="item">
                                <span className="material-symbols-outlined">
                                    account_tree
                                </span>
                                <h4>Tax Return Services</h4>
                                <p>Our team ensures accurate and timely filing of your tax returns, simplifying the process for individuals and businesses.<a href="#">...Read more</a></p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="item">
                                <span className="material-symbols-outlined">
                                    account_tree
                                </span>
                                <h4>ITIN Processing</h4>
                                <p>We help individuals obtain an Individual Taxpayer Identification Number (ITIN) for tax compliance. <a href="#">...Read more</a></p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="item">
                                <span className="material-symbols-outlined">
                                    account_tree
                                </span>
                                <h4>FBAR (Foreign Bank Account Report)</h4>
                                <p>Ensure compliance with FBAR reporting requirements for foreign financial accounts.<a href="#">...Read more</a></p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="item">
                                <span className="material-symbols-outlined">
                                    account_tree
                                </span>
                                <h4>FATCA (Foreign Account Tax Compliance Act)</h4>
                                <p>We offer expertise in FATCA reporting, helping you navigate international tax regulations. <a href="#">...Read more</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default home;
