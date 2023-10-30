import React from "react"
import { Link } from 'react-router-dom';
import Header from '../layout/header'
import Footer from '../layout/footer'

function about(props) {
    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} />
            <section className="taxServices">
                <div className="container">
                    <div className="mainHeading">
                        <h6>WELCOME TO FILETAX</h6>
                        <h2>We provide you the best tax services in most<br /> convenient & affordable way.</h2>
                    </div>
                    <p>Our team of experts with 15 plus years of experience provide you the best solutions for all your
                        tax compliance including Individual & Business tax returns. Individual tax services include ITIN
                        application FBAR & FATCA filings. Our process is 100% online, secured, convenient & affordable.</p>
                    <div className="text-center mt-4">
                        <a href="#" className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </section>
            <section className="aboutSection">
                <div className="container">
                    <h3>Our dedicated team of US tax specialists advises clients on US tax issues and also helps file US tax returns.</h3>
                    <h4>Industries we cover</h4>
                    <ul className="list-unstyled">
                        <li>Consumer, Retail & E-commerce</li>
                        <li>Healthcare and Life Sciences</li>
                        <li>Automotive and Manufacturing</li>
                        <li>Media, Technology and Entertainment</li>
                        <li>Not for profit</li>
                        <li>Real estate and Construction</li>
                    </ul>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default about;
