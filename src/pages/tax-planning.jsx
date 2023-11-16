import React from "react"
import { Link } from 'react-router-dom';
import Header from '../layout/header'
import Footer from '../layout/footer'

function Taxplanning(props) {
    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
            <section class="innerPageBanner servicesBanner">
                <div class="container">
                    <div class="bannerContent">
                        <h1>Tax Planning / Advisory Services</h1>
                    </div>
                </div>
            </section>
            <section class="aboutSection listWrap">
                <div class="container">
                    <h3>Free Tax Planning/Advisory Services</h3>
                    <p>Unlock the path to financial success with our Free Tax Planning and Advisory
                         Services. At File tax, we believe that financial well-being should be
                          accessible to all. That's why we are excited to offer our expertise
                           and guidance at no cost to you. Our seasoned tax professionals are here
                            to help you navigate the complexities of tax planning, ensuring you make
                             the most of your money and secure your financial future. Join us in this
                              journey toward financial empowerment – it's time to take control of your
                               financial destiny.</p>
                    <ul class="list-unstyled mt-4">
                        <li> Worldwide tax minimization planning</li>
                        <li> Outbound and inbound structure planning</li>
                        <li> Transfer pricing analysis and review</li>
                        <li> ASC 740 (FAS 109 and FIN 48)</li>
                        <li> Global employer services for expatriates</li>
                        <li> IFRS and GAAP convergence</li>
                        <li> Global employer services for expatriates</li>
                        <li> Cross-border tax services for multinational companies</li>
                        <li> International business advice and planning</li>
                    </ul>
                    <div class="row pt-5">
                        <div class="col-sm-12 col-md-7">
                            <p>Effective tax planning for high net-worth individuals requires both technical resources and in-depth knowledge of each client’s unique financial situation. It is not a once-a-year activity. Strategies must be maintained and reassessed, with constant monitoring of changing financial positions and evolving tax regulations, as well as new legislation – federal, state.<br />At FILETAX, our methods are immersive and holistic, factoring in all sources of income with charitable interests and short- and long-term goals, both personal and professional. We approach every client situation first with a focus on their objectives, then with awareness of the total tax and At FILETAX, we make sure you are able to save time, avoid penalties, maximize your returns and interest on both federal and state taxes; as well as help you to inform you about several other important deadlines. Our goal is to put more money in your pocket. If you are not currently a client, send copies of your prior year tax returns by scanning and
e-mailing us at contact@FILETAX.us We will review and respond to you FREE OF ANY CHARGES! We always believe in offering value added services to our clients.
</p>
                        </div>
                        <div class="col-sm-12 col-md-5">
                            <img src="images/tax-planning.png" alt="" class="w-100" />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Taxplanning;
