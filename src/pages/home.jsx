import React from "react"
import Header from'../layout/header'
import Footer from'../layout/footer'

import { Link } from 'react-router-dom';

function home() {
    return (
        <>
        <Header/>
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
                    <div className="mainHeading">
                        <h6>WELCOME TO FILETAX</h6>
                        <h2>We provide you the best tax services in most<br/> convenient & affordable way.</h2>
                    </div>
                    <p>Our team of experts with 15 plus years of experience provide you the best solutions for all your
                        tax compliance including Individual & Business tax returns. Individual tax services include ITIN
                        application FBAR & FATCA filings. Our process is 100% online, secured, convenient & affordable.</p>
                    <div className="text-center mt-4">
                        <a href="#" className="btn btn-primary">Read More</a>
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
                                <h4>Tax Planning</h4>
                                <p>The global economy drives growth. But every market presents complex planning <a href="#">...Read more</a></p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="item">
                                <span className="material-symbols-outlined">
                                    account_tree
                                </span>
                                <h4>Tax Return</h4>
                                <p>A business tax return is filed annually by all companies that conduct business in the US. <a href="#">...Read more</a></p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="item">
                                <span className="material-symbols-outlined">
                                    account_tree
                                </span>
                                <h4>Tax Extension</h4>
                                <p>Though filing taxes can be complicated for expats, we have some good news. <a href="#">...Read more</a></p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="item">
                                <span className="material-symbols-outlined">
                                    account_tree
                                </span>
                                <h4>Tax Consulting</h4>
                                <p>FILETAX is a leading professional Tax
                                    Consulting firm specializing in the delivery
                                    of world className. <a href="#">...Read more</a></p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="item">
                                <span className="material-symbols-outlined">
                                    account_tree
                                </span>
                                <h4>Student Tax filing</h4>
                                <p>Taxes can be tricky for any taxpayer. Filing taxes as a college student can make things all the more intimidating. <a href="#">...Read more</a></p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="item">
                                <span className="material-symbols-outlined">
                                    account_tree
                                </span>
                                <h4>ITIN Processing</h4>
                                <p>FILETAX are approved Certifying Acceptance Agents and specialise in obtaining US <a href="#">...Read more</a></p>
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
