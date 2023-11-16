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
                        <div className="col-sm-12 col-md-4">
                            <div className="pricingContent">
                                <h2>Starter</h2>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                <h2>$250</h2>
                                <p>Billed anually</p>
                                <button className="btn btn-primary">Start free trial</button>
                                <ul className="list-unstyled">
                                    <li>Lorem, ipsum dolor sit amet adipisicing elit.</li>
                                    <li>Lorem, ipsum dolor sit amet adipisicing elit.</li>
                                    <li>Lorem, ipsum dolor sit amet adipisicing elit.</li>  
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <div className="pricingContent active">
                                <h2>Starter</h2>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing consectetur elit.</p>
                                <h2>$250</h2>
                                <p>Billed anually</p>
                                <button className="btn btn-primary">Start free trial</button>
                                <ul className="list-unstyled">
                                    <li>Lorem, ipsum dolor sit amet adipisicing elit.</li>
                                    <li>Lorem, ipsum dolor sit amet adipisicing elit.</li>
                                    <li>Lorem, ipsum dolor sit amet adipisicing elit.</li>  
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <div className="pricingContent">
                                <h2>Starter</h2>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                <h2>$250</h2>
                                <p>Billed anually</p>
                                <button className="btn btn-primary">Start free trial</button>
                                <ul className="list-unstyled">
                                    <li>Lorem, ipsum dolor sit amet adipisicing elit.</li>
                                    <li>Lorem, ipsum dolor sit amet adipisicing elit.</li>
                                    <li>Lorem, ipsum dolor sit amet adipisicing elit.</li>  
                                </ul>
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
