import React from "react"
import { Link } from 'react-router-dom';
import Header from '../layout/header'
import Footer from '../layout/footer'

function Taxextension(props) {
    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
            <section className="innerPageBanner servicesBanner taxExtention">
                <div className="container">
                    <div className="bannerContent">
                        <h1>Tax Extension Filing Services</h1>
                    </div>
                </div>
            </section>
            <section className="fbarWrap tax-extension">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-8">
                            <h3>Tax Extension Filing</h3>
                            <p>If you are not ready with tax filing by due date? Then first you need to file an extension with
                                the IRS to avoid any (late payment) We cannot avoid late payment penalties by filing an 
                                extension or late-filing penalties.</p>
                                <h3>Automatic Out of Country Tax Extension Until June 15th</h3>
                            <p>If you are living abroad, you are granted an automatic two-month out of country tax extension to file your US. income tax returns, which pushes the deadline to June 15th. This applies if, as of April 15th, you are living, have your main place of business, or are on military/naval service duty outside the United States and Puerto Rico. It’s important to note if you’re currently living in the US., the automatic extension does not apply to you. Your tax return and any payments due need to be submitted by April 15th. Extension By Request Until October 15th If, however, you are not ready to file by June 15th, you can request another extension by timely filing Form 4868 with the Internal Revenue Service. The deadline would then be October 15th.</p>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <img src="images/taxConsulting.jpg" alt="" width="100%" className="heightAuto" />
                        </div>
                        <div className="col-sm-12">
                        <h3>Additional US Tax Extension Until December 15th</h3>
                            <p>The final option available is an extension that would further push the tax deadline to December 15th for expats. The process by which you would apply for this additional US tax extension is to send a letter outlining why you need the additional two months to complete your overseas tax return. This document must be sent to the IRS by October 15th. At that point the IRS would approve the extension; however, you will not be notified. The Internal Revenue Service does not send any approval confirmations. So, for recordkeeping purposes, you’ll need to keep proof that you mailed the letter. On the Other Hand If you owe on your returns, the deadline for payment is April 15th regardless of filing extensions. Beginning on that date, interest will be assessed on amounts due, even if your overseas tax return is otherwise filed timely. If you do not file by your applicable extended deadline, you may be charged penalties for failure to file and failure to pay – in addition to the interest owed. Fortunately, most expats do not owe anything to the US., but if you are one of the few who do, you should make a payment before the April deadline to avoid the accumulation of interest. A good rule of thumb is if you owed taxes last year and your situation is similar this year, it is likely that you will owe again and should make a payment to be safe.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Taxextension;
