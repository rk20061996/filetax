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
                    <div className="row">
                        <div className="col-sm-12 text-center mb-5">
                        <p>Empower your financial future with our specialized Student Tax Filing Services. At File tax, we understand that students face unique challenges when it comes to taxes. We're here to simplify the process and maximize your refunds. Our dedicated team of experts ensures that you receive the benefits and deductions you're entitled to, all while relieving the burden of tax-related stress. With us, you can focus on your education, knowing that your finances are in capable hands
</p>
                        </div>
                        <div className="col-sm-12 col-md-7">
                                <h2>Dependency</h2>
                                <p>The first step in preparing your own taxes will, ironically, require a conversation with your parents, or any guardians you may have. This is necessary because the first thing you will need to determine is whether any of these individuals will be claiming you as a dependent on their tax returns. If they are, this will affect some of the credits and/or deductions that you may claim on your own return.</p><br></br>
                                <p>Generally, a parent can claim you as a dependent until age 19, but if you are a student, they can claim you as a dependent until age 24. There are a variety of other requirements, including how much support your parents are providing for your, i.e. are they paying any of your expenses during the year? If your parents do qualify to claim you as a dependent, you will need to discuss with them, using the other information provided below, whether it is more beneficial for them to claim you as a dependent or for you to claim yourself. 
                                    With FILETAX Proffessionals can guide you through online or to File your First Tax filing. </p>
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
