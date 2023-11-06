import React from "react"
import { Link } from 'react-router-dom';
import Header from '../layout/header'
import Footer from '../layout/footer'

function Studenttax(props) {
    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
            <section className="innerPageBanner servicesBanner">
                <div className="container">
                    <div className="bannerContent">
                        <h1>Student Tax Filing Services</h1>
                    </div>
                </div>
            </section>
            <section className="aboutSection listWrap">
                <div className="container">
                    <div className="row pt-5">
                        <div className="col-sm-12 col-md-7">
                            <p>College brings with it many adult responsibilities you may have never had to encounter; doing your own laundry, paying all your own bills, and for many, completing a tax return for the first time.
                                Filing taxes as a student, especially if it’s the first time you have had to file, can be a daunting task. I hope this article can provide some tax tips for students in college that may feel intimidated by the process.</p>
                            <br/>
                                <h2>Dependency</h2>
                                <p>The first step in preparing your own taxes will, ironically, require a conversation with your parents, or any guardians you may have. This is necessary because the first thing you will need to determine is whether any of these individuals will be claiming you as a dependent on their tax returns. If they are, this will affect some of the credits and/or deductions that you may claim on your own return. Generally, a parent can claim you as a dependent until age 19, but if you are a student, they can claim you as a dependent until age 24. There are a variety of other requirements, including how much support your parents are providing for your, i.e. are they paying any of your expenses during the year? If your parents do qualify to claim you as a dependent, you will need to discuss with them, using the other information provided below, whether it is more beneficial for them to claim you as a dependent or for you to claim yourself.
                                    With FILETAX Proffessionals can guide you through online or to File your First Tax filing.</p>
                        </div>
                        <div className="col-sm-12 col-md-5">
                            <img src="images/studenttax.jpg" alt="" className="w-100" />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Studenttax;
