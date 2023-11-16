import React from "react"
import { Link } from 'react-router-dom';
import Header from '../layout/header'
import Footer from '../layout/footer'

function Taxreturnhome(props) {
    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
            <section className="innerPageBanner servicesBanner">
                <div className="container">
                    <div className="bannerContent">
                        <h1>Tax Return Services</h1>
                    </div>
                </div>
            </section>
            <section className="outerTaxReturn">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 mb-5 text-center">
                            <p>"Welcome to File tax, your partner for seamless and stress-free Tax Return Services. Our mission is to make the annual tax season a breeze, ensuring you meet deadlines with confidence. With a team of experienced professionals, we meticulously review your financial records, identify eligible deductions, and maximize your tax savings. Our commitment to accuracy and efficiency takes the complexity out of filing, allowing you to focus on what matters most while we handle your tax returns with precision and care.</p>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <h3>Business TAX Return</h3>
                            <p>A business tax return is filed annually by all companies that conduct business in the US.</p>
                            <p>We offer three types of business income tax return packages: zero-income tax return for dormant companies, standard tax return for most companies that were active during the year, and premium tax return for companies falling into some special categories.</p>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <h3>Personal Income Tax Return</h3>
                            <p>All US. persons (citizens, permanent residents and certain non-residents with Social Security Number) are required to file personal income tax returns by mid-April of the following year.</p>
                            <p>Non-US. persons are typically responsible to file their income tax returns in the country of their residence. However, when doing business in the US. in certain cases the US. law requires non-US. persons to file personal income tax return.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Taxreturnhome;
