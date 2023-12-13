import React from "react"
import { Link } from 'react-router-dom';
import Header from '../layout/header'
import Footer from '../layout/footer'

function Fbar(props) {
    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
            <section className="innerPageBanner servicesBanner fbarbg">
                <div className="container">
                    <div className="bannerContent">
                        <h1>FBAR Filing</h1>
                    </div>
                </div>
            </section>
            <section className="fbarWrap">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-7">
                                <p>The FBAR(Foreign Bank Account Report) is an annual report, due April 15 following the calendar year reported.</p>
                                <p>You’re allowed an automatic extension to October 15 if you fail to meet the FBAR annual due date of April 15. You don’t need to request an extension to file the FBAR.</p>
                                <p>A United States person, including a citizen, resident, corporation, partnership, limited liability company, trust and estate, must file an FBAR to report:</p>
                                <p>A financial interest in or signature or other authority over at least one financial account located outside the United States if The aggregate value of those foreign financial accounts exceeded $10,000 at any time during the calendar year reported.</p>
                                <p>Generally, an account at a financial institution located outside the United States is a foreign financial account. Whether the account produced taxable income has no effect on whether the account is a “foreign financial account” for FBAR purposes.</p>
                        </div>
                        <div className="col-sm-12 col-md-5">
                            <img src="images/fbar.jpg" alt="" width="100%" />
                        </div>
                    </div>
                    <div className="row financialWrap listWrap">
                        <div className="col-sm-12 col-md-6">
                            <h5>But, you don’t need to report foreign financial accounts that are:</h5>
                            <ul className="list-unstyled">
                                <li>Correspondent/Nostro accounts,</li>
                                <li>Owned by a governmental entity,</li>
                                <li>Owned by an international financial institution,</li>
                                <li>Maintained on a United States military banking facility,</li>
                                <li>Held in an individual retirement account (IRA) you own or are beneficiary of,</li>
                                <li>Held in a retirement plan of which you’re a participant or beneficiary, or</li>
                                <li>Part of a trust of which you’re a beneficiary, if a US. person (trust, trustee of the trust or agent of the trust) files an FBAR reporting these accounts.</li>
                            </ul>
                            <h5>You don’t need to file an FBAR for the calendar year if: </h5>
                            <ul className="list-unstyled">
                                <li>All your foreign financial accounts are reported on a consolidated FBAR.</li>
                                <li>All your foreign financial accounts are jointly-owned with your spouse and:</li>
                                <li>You completed and signed FinCEN Form 114a authorizing your spouse to file on your behalf, and your spouse reports the jointly-owned accounts on a timely-filed, signed FBAR.</li>
                            </ul>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <h5>You must keep records for each account you must report on an FBAR that establish:</h5>
                            <ul className="list-unstyled">
                                <li>Name on the account,</li>
                                <li>Account number,</li>
                                <li>Name and address of the foreign bank,</li>
                                <li>Type of account, and</li>
                                <li>Maximum value during the year.</li>
                            </ul>
                            <p>The law doesn’t specify the type of document to keep with this information; it can be bank statements or a copy of a filed FBAR, for example, if they have all the information.</p>
                            <p>You must keep these records for five years from the due date of the FBAR.</p>
                            <p><strong>Exception:</strong> An officer or employee who files an FBAR to report signature authority over an employer's foreign financial account doesn’t need to personally keep records on these accounts. The employer must keep the records for these accounts.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Fbar;
