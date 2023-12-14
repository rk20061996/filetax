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
                    <p>The global economy drives growth. But every market presents complex planning and compliance challenges that must be understood individually but addressed collectively. FILETAX offers the local knowledge and global perspective to help with a broad range of issues.</p>
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
                            <p className="largeFont">Effective tax planning for high net-worth individuals requires both technical resources and in-depth knowledge of each client’s unique financial situation. It is not a once-a-year activity. Strategies must be maintained and reassessed, with constant monitoring of changing financial positions and evolving tax regulations, as well as new legislation – federal, state.<br /> <br></br>At FILETAX, our methods are immersive and holistic, factoring in all sources of income with charitable interests and short- and long-term goals, both personal and professional. We approach every client situation first with a focus on their objectives, then with awareness of the total tax and At FILETAX, we make sure you are able to save time, avoid penalties, maximize your returns and interest on both federal and state taxes; as well as help you to inform you about several other important deadlines. Our goal is to put more money in your pocket. If you are not currently a client, send copies of your prior year tax returns by scanning and
e-mailing us at contact@FILETAX.us We will review and respond to you FREE OF ANY CHARGES! We always believe in offering value added services to our clients. <br /> <br />
</p>
                        </div>
                        <div class="col-sm-12 col-md-5">
                            <img src="images/tax-planning.jpg" alt="" class="heightLarge serviceImg w-100" />
                        </div>
                        <div className="col-sm-12 ">
                            <p>Preparing Personal Tax Returns can be a worrying commitment. FILETAX can relieve you of this burden by preparing your Personal Tax Returns for you. Our comprehensive Personal Tax Return Service is a natural complement to our Corporation Tax Return Service. With a team of highly qualified and experienced Tax Accountants, we do everything to minimize your tax while making the overall taxation process efficient, easy and cost-effective as possible.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Taxplanning;
