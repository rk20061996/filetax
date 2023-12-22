import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import userProfile from '../serviceApi/userprofile';
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";

function ContactUs() {
    let navigate = useNavigate();
    const history = useHistory();

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
            // Example: 
            // await api.sendMessage(formData);

            // Show success toast
            toast.success("Your message has been conveyed to the admin");
            setFormData({
                fullname: "",
                email: "",
                phone: "",
                message: "",
              });

            // Clear the timeout if the component unmounts
            // return () => clearTimeout(timeout);

        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };


    return (
        <section className="contactWrap">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h2>Leave Us A Message</h2>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Enter Your Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Enter your Email Id"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Enter your Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            placeholder="Enter Your Message Here"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </section>
    );
}

export default ContactUs;
