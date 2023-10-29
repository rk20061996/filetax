import React from "react"
import { Link } from 'react-router-dom';
import Header from '../layout/header'
import Footer from '../layout/footer'

function forgot() {
    return (
        <>
            <Header />
            <div className="formWrapper marginTopBottom" >
                <form>
                    <div className="form-label mb-3">
                        <label>Email Id:</label>
                        <input type="text" />
                    </div>

                    <div className="d-flex mb-0">
                        <button type="submit" className="btn btn-primary">Send OTP</button>
                    </div>
                </form>
            </div>
            <Footer />
        </>

    );
}

export default forgot;
