import React from "react"
import { Link } from 'react-router-dom';

function footer() {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-3">
                        <div className="footer-logo">
                            <img src="images/footer-logo.png" alt="" />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <ul className="list-unstyled">
                            <li> <a href="#"><span className="material-symbols-outlined">
                                mail
                            </span> contact@filetax.us</a> </li>
                            <li> <a href="#"><span className="material-symbols-outlined">
                                call
                            </span> 475 FILETAX</a> </li>
                            <li> <a href="#"><span className="material-symbols-outlined">
                                location_on
                            </span> 5154 Se foster road, Portland Oregon 97206</a> </li>
                        </ul>
                    </div>
                    <div className="col-sm-12 col-md-5">
                        <p>FILETAX is a place where our dedicated team of US tax specialists advises clients on US tax issues
                            and also helps file US tax. Our motive is to provide quality services but also care for our approach,
                            value, commitment and behaviour towards fulfilment of client objectiv</p>
                    </div>
                    <div className="col-sm-12">
                        <p className="copyright">© 2021. All Copy Rights Reserved by FILETAX.US</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default footer;
