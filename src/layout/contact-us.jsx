import React from "react"
import { Link } from 'react-router-dom';

function contactus() {
    return (
        <section className="contactWrap">
            <div className="container">
                <form>
                    <h2>Leave Us A Message</h2>
                    <div className="form-group">
                        <input type="text" placeholder="Enter Your Full Name" />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Enter your Email Id" />
                        <input type="text" placeholder="Enter your Phone Number" />
                    </div>
                    <div className="form-group">
                        <textarea placeholder="Enter Your Message Here"></textarea>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default contactus;
