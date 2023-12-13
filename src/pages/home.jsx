import React from "react"
import Header from'../layout/header'
import Footer from'../layout/footer'

import { Link } from 'react-router-dom';

function home(props) {
    return (
        <>
        <Header isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn}/>
            <section className="bannerWrap">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-8">
                            <div className="bannerContent">
                                {/* <h1>Your Expert tax Consultant</h1>
                                <p>Helps you to manage your tax.</p> */}
                                <a href="#" className="btn btn-primary">Let's connect<span class="material-symbols-outlined">
arrow_right_alt
</span></a>
                            </div>
                        </div>
                        {/* <div className="col-sm-12 col-md-4">
                            <img src="images/banner-img.png" alt="" className="w-100" />
                        </div> */}
                    </div>
                </div>
            </section>
            <section className="taxServices">
                <div className="container">
                    <div className="w-80">
                        <div className="mainHeading">
                            <h2>Who we are</h2>
                        </div>
                        <p>Our team of experts with 15 plus years of experience provide you the best 
                            solutions for all your tax compliance <br></br>including Individual & Business tax 
                            returns. Individual tax services include ITIN application <br></br>FBAR & FATCA
                             filings. Our process is 100% online, secured, convenient & affordable.</p>
                        <div className="text-center mt-5">
                            <img src="https://qxglobalgroup.com/wp-content/uploads/2023/07/QX-GTPL-2023.jpg" alt="" class="w-100" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="service-bar">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-4">
                            <div className="innerService">
                                <span className="material-symbols-outlined">
                                    person
                                </span>
                                <h3>Your Expert tax consultant</h3>
                                <p> let’s connect</p>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <div className="innerService">
                                <span className="material-symbols-outlined">
                                    trending_up
                                </span>
                                <h3>Expert Advisor</h3>
                                <p>We help our clients stay out of trouble with the IRS and stay in compliance with the US. tax laws.</p>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <div className="innerService">
                                <span className="material-symbols-outlined">
                                    attach_money
                                </span>
                                <h3>Financial Planning</h3>
                                <p>The advert of databases and modern analytical tools have smoothen the entire process. We have its own customized tools to get accurate analysis for your Financial Planning.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="serviceSlider">
                <div className="container">
                    <div className="mainHeading">
                        <h2>Our Services</h2>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-3">
                            <div className="item">
                                <img src="images/tax.png" class="srvicesImg" alt="" />
                                <h4>Tax Planning Advisory</h4>
                                <p>Our expert advisors provide strategic guidance to optimize your financial decisions and minimize your tax liability.<a href="#">Read more</a></p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-3">
                            <div className="item">
                                <img src="images/student.png" class="srvicesImg" alt="" />
                                <h4>Student Tax Filing</h4>
                                <p>Student Tax Filing: We specialize in assisting students with their tax returns, ensuring they take advantage of applicable deductions and credits.<a href="#">Read more</a></p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-3">
                            <div className="item">
                                <img src="images/tax1.png" class="srvicesImg" alt="" />
                                <h4>Tax Return Services</h4>
                                <p>Our team ensures accurate and timely filing of your tax returns, simplifying the process for individuals and businesses.<a href="#">Read more</a></p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-3">
                            <div className="item">
                                <img src="images/calculators.png" class="srvicesImg" alt="" />
                                <h4>ITIN Processing</h4>
                                <p>ITIN Processing: We help individuals obtain an Individual Taxpayer Identification Number (ITIN) for tax compliance.<a href="#">Read more</a></p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-3">
                            <div className="item">
                                <img src="images/dollar.png" class="srvicesImg" alt="" />
                                <h4>FBAR (Foreign Bank Account Report)</h4>
                                <p>Ensure compliance with FBAR reporting requirements for foreign financial accounts.<a href="#">Read more</a></p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-3">
                            <div className="item">
                                <img src="images/financial.png" class="srvicesImg" alt="" />
                                <h4>FATCA (Foreign Account Tax Compliance Act)</h4>
                                <p>We offer expertise in FATCA reporting, helping you navigate international tax regulations.<a href="#">Read more</a></p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-3">
                            <div className="item">
                                <img src="images/tax2.png" class="srvicesImg" alt="" />
                                <h4>Tax Consulting</h4>
                                <p>Our tax experts provide customized solutions, addressing complex tax issues and planning for your financial future.<a href="#">Read more</a></p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-3">
                            <div className="item">
                                <img src="images/tax3.png" class="srvicesImg" alt="" />
                                <h4>Tax Extension</h4>
                                <p> File for a tax extension with confidence, and avoid penalties by trusting our experienced professionals. <a href="#">Read more</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                <div className="mainHeading">
                    <div className="d-flex justify-content-between">
                        <h2>Success stories</h2>
                        <a href="#" className="btn btn-outline-primary">View More</a>
                    </div>
                </div>
                <div class="successtories owl-carousel owl-theme">
                    <div class="item">
                        <img src="images/stories1.jpg" alt="" />
                        <div className="itemContent">
                            <div>
                                <h5>Maximizing Savings for a Small Business Owner</h5>
                                <p>John, a small business owner, struggled with tax planning and often paid more than necessary in taxes. He sought the assistance of our tax planning company. Our experts analyzed his financial situation, identified deductions he had overlooked, and implemented a tax strategy that saved him thousands of dollars annually. John's business is now more profitable, and he can invest in growth with confidence.</p>
                            </div>
                            <a href="#" className="btn btn-primary mt-3">Read More</a>
                        </div>
                    </div>
                    <div class="item">
                        <img src="images/stories2.jpg" alt="" />
                        <div className="itemContent">
                            <div>
                                <h5>Securing Retirement for a Middle-Aged Couple</h5>
                                <p>Sarah and Michael, a middle-aged couple, were concerned about their retirement savings. They turned to us for tax-efficient retirement planning. Our team optimized their investment portfolio and retirement accounts, allowing them to retire comfortably while minimizing their tax burden. With our guidance, they now enjoy their golden years without financial stress.</p>
                            </div>
                            <a href="#" className="btn btn-primary mt-3">Read More</a>
                        </div>
                    </div>
                    <div class="item">
                        <img src="images/stories1.jpg" alt="" />
                        <div className="itemContent">
                            <div>
                                <h5>Helping a Young Professional Build Wealth</h5>
                                <p>Emily, a young professional, wanted to build wealth but was unsure where to start. We provided her with a comprehensive financial plan that included tax-efficient investment strategies and long-term financial goals. As a result, Emily has seen her wealth grow steadily over the years and is on track to meet her financial objectives.</p>
                            </div>
                            <a href="#" className="btn btn-primary mt-3">Read More</a>
                        </div>
                    </div>
                    <div class="item">
                        <img src="images/stories2.jpg" alt="" />
                        <div className="itemContent">
                            <div>
                                <h5>Resolving IRS Audit Successfully</h5>
                                <p>Mark, a self-employed contractor, faced a challenging IRS audit. He reached out to us for assistance. Our tax experts meticulously reviewed his financial records, liaised with the IRS on his behalf, and resolved the audit with minimal penalties. Mark was relieved to have the audit behind him and to continue his business operations without disruptions.</p>
                            </div>
                            <a href="#" className="btn btn-primary mt-3">Read More</a>
                        </div>
                    </div>
                    <div class="item">
                        <img src="images/stories1.jpg" alt="" />
                        <div className="itemContent">
                            <div>
                            <h5>Estate Planning for a High-Net-Worth Family</h5>
                            <p>The Andersons, a high-net-worth family, sought our services for estate planning. Our specialists crafted a comprehensive estate plan, which not only minimized estate taxes but also ensured the seamless transfer of assets to the next generation. The Andersons now have peace of mind knowing their legacy is secure.</p>
                            </div>
                            <a href="#" className="btn btn-primary mt-3">Read More</a>
                        </div>
                    </div>
                </div>
                </div>
            </section>
            <section className="whyUs">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-sm-12 col-md-6">
                            <div className="whyimg"> <img src="images/services1.jpg" alt="" /></div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <h2>Why us?</h2>
                            <p>Choose File Tax for Your Tax Peace of Mind. Our seasoned experts tailor solutions to your unique financial needs. We make tax activities easy, ensuring accuracy and efficiency. Maximize your savings legally, empowering your financial future. Students trust us for stress-free filing, letting you focus on your education.<br></br> <br></br> We simplify complex tasks like ITIN processing and international tax reporting. Count on us for personalized consulting and deadline-friendly tax extensions. Exceptional support is our promise. Join File Tax for confidence, savings, and a secure financial journey.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="visionFiletax">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-7">
                            <h2>Vision of File tax</h2>
                            <p>Our vision is to be the trusted catalyst for financial prosperity. We aim to provide innovative, personalized tax planning solutions that empower individuals and businesses to minimize tax burdens, achieve financial security, and unlock their full financial potential. Together, we build a brighter financial future.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default home;
