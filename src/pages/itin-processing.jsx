import React from "react"
import { Link } from 'react-router-dom';
import Header from '../layout/header'
import Footer from '../layout/footer'

function Itinprocessing(props) {
    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
            <section className="innerPageBanner servicesBanner ittinBg">
                <div className="container">
                    <div className="bannerContent">
                        <h1>ITIN Processing</h1>
                    </div>
                </div>
            </section>
            <section className="itinWrap">
                <div className="container">
                    <p>With the other surrounding areas at a very competitive charge. As ITIN specialists, we help our resident and non-resident aliens, as well as other foreign taxpayers to apply for an ITIN Processing from the Internal Revenue Service. </p>
                    <p>We take the time to fully understand your situation so that we can file your Form W-7 application as per the rules and procedures. Beside this, we are also experts in reducing any likelihood of your ITIN application being delayed or rejected by the Internal Revenue Service (IRS). Using our services, you can avoid the burden of you having to be without your original identity documents and thus remove the potential risk of your document.</p>
                    <p>Being a (Certifying) Certified Acceptance Agent (CAA), we can certify an applicant’s identification documents as part of the ITIN application process and ITIN Preparation. Beside this, We will sign your completed Form W-7 and provide you with a Certificate of Accuracy that will further gets attached to your tax return and submitted to the IRS.</p>
                    <p>Avoid the hassle and headache of trying to get an IRS ITIN number with our services. Use our tax ID number application service to apply for an individual taxpayer identification number now!</p>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Itinprocessing;
