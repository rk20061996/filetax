import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../layout/header';
import Footer from '../layout/footer';
import authFunc from './../serviceApi/auth'

function Contactus(props) {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validation
        if (!formData.fullname.trim()) {
            toast.error("Please enter your full name");
            return;
        }
    
        if (!formData.email.trim()) {
            toast.error("Please enter your email");
            return;
        }
    
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            toast.error("Please enter a valid email address");
            return;
        }
    
        if (!formData.phone.trim()) {
            toast.error("Please enter your phone number");
            return;
        }
    
        // Assuming you have a specific phone number validation logic
        // Replace this with your own validation logic
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone.trim())) {
            toast.error("Please enter a valid phone number");
            return;
        }
    
        if (!formData.message.trim()) {
            toast.error("Please enter your message");
            return;
        }
    
        try {
            // TODO: Call your API endpoint to send formData
            // Example: await api.sendMessage(formData); contact_us
    
            // Show success toast
            const tokenCheckApi = await authFunc.contactUs(formData);
            setFormData({
                fullname: "",
                email: "",
                phone: "",
                message: "",
              });
            toast.success("Your message has been conveyed to the admin");
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };
    
    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
            <section className="innerPageBanner servicesBanner m-0">
                <div className="container">
                    <div className="bannerContent">
                        <h1>Contact Us</h1>
                    </div>
                </div>
            </section>
            <section className="contactWrap contactSection">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <div className="form-group">
                                    <label>Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your Full Name"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="form-group">
                                    <label>Email Id*</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your Email Id"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label>Phone no*</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your Phone Number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea
                                        placeholder="Enter your Message Here..."
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Contactus;
