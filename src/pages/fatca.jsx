import React from "react"
import { Link } from 'react-router-dom';
import Header from '../layout/header'
import Footer from '../layout/footer'

function Fatca(props) {
    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
            <section className="innerPageBanner servicesBanner">
                <div className="container">
                    <div className="bannerContent">
                        <h1>FATCA Filing</h1>
                    </div>
                </div>
            </section>
            <section className="fbarWrap">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-7">
                            <p>At File taxwe're your trusted partner for streamlining FATCA (Foreign Account Tax Compliance Act) Filing. Navigating international tax compliance and reporting can be daunting, but with our expertise, you can ensure that you meet your obligations effortlessly. Our dedicated team simplifies the complexities of FATCA, helping you report foreign financial accounts with precision and accuracy. You can rely on us to ensure compliance with U.S. tax laws, providing you with the confidence to manage your international financial interests efficiently and effectively."</p>
                            <p>Therefore, if you set up a new account with a foreign financial institution, it may ask you for information about your citizenship. FATCA provides special (and lessened) reporting requirements about the US. account holders of certain financial institutions that do not solicit business outside their country of organization and that mainly service account holders resident within it. In order to qualify for this favorable treatment, however, the local foreign financial institution cannot discriminate by declining to open or maintain accounts for US. citizens who reside in the country where it is organized.</p>
                        </div>
                        <div className="col-sm-12 col-md-5">
                            <img src="images/fatca.jpg" alt="" width="100%" className="heightAuto" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <p>FATCA requires certain US. taxpayers who hold foreign financial assets with an aggregate value of more than the reporting threshold (at least $50,000) to report information about those assets on Form 8938, which must be attached to the taxpayer’s annual income tax return. The reporting threshold is higher for certain individuals, including married taxpayers filing a joint annual income tax return and certain taxpayers living in a foreign country.</p>
                            <p>As of January 2013, only individuals are required to report their foreign financial assets. At a later time, a limited set of US. domestic entities also may have to report their foreign financial assets, but not for tax years starting before 2013. There are some exceptions to the requirement that you file Form 8938. For example, if you do not have to file a US. income tax return for the year, then you do not have to file Form 8938, regardless of the value of your specified foreign financial assets. Also, if you report interests in foreign entities and certain foreign gifts on other forms, you may just list the submitted forms on Form 8938, without repeating the details.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Fatca;
