import React from "react"
import { Link } from 'react-router-dom';
import Header from '../layout/header'
import Footer from '../layout/footer'

function about(props) {
    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn}/>
            <section className="taxServices aboutBg">
                <div className="container">
                    <div className="aboutContent">
                        <div className="mainHeading">
                            <h6>WELCOME TO FILETAX</h6>
                            <h2>We provide you the best tax services in most<br /> convenient & affordable way.</h2>
                        </div>
                        <div className="text-center mt-4">
                            <a href="#" className="btn btn-primary">Read More</a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="aboutSection">
                <div className="container">
                    <h3 className="mb-2">Our dedicated team of US tax specialists advises clients on US tax <br /> 
                    issues and also helps file US tax returns.</h3>
                    <p className="text-center mb-5">Our team of experts with 15 plus years of experience provide you the best solutions for all your
                        tax compliance including Individual & Business tax returns.<br></br> Individual tax services include ITIN
                        application FBAR & FATCA filings. Our process is 100% online, secured, convenient & affordable.</p>
                    <h2 className="text-center mb-3">Industries we cover</h2>
                    <ul className="list-unstyled">
                        <li> <img src="https://images.pexels.com/photos/6634177/pexels-photo-6634177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                            <h5>Consumer, Retail & E-commerce</h5></li>
                        <li> <img src="https://images.pexels.com/photos/5863389/pexels-photo-5863389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                        <h5>Healthcare and Life Sciences</h5></li>
                        <li> <img src="https://images.pexels.com/photos/3855659/pexels-photo-3855659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                        <h5>Automotive and Manufacturing</h5></li>
                        <li> <img src="https://images.pexels.com/photos/6335/man-coffee-cup-pen.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                        <h5> Media, Technology and Entertainment</h5></li>
                        <li> <img src="https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                        <h5>Not for profit</h5></li>
                        <li> <img src="https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                        <h5>Real estate and Construction</h5></li>
                    </ul>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default about;
