import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import Header from '../layout/header'
import Footer from '../layout/footer'
import authFunc from '../serviceApi/auth'
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';

// var env = require('../../.env');

function Signup() {
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    // console.log("baseUri-->", baseUri)
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        password: "",
        email: "",
        confirmPassword: "",
    })
    const [validation, setValidataion] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        password: "",
        email: "",
        confirmPassword: "",
    })
    const [formSubmitted, setformSubmitted] = useState(false)

    const submitForm = async () => {
        if (formData.firstname === '' || formData.lastname === '' || formData.email === '' || formData.phone === '' || formData.password === '' || formData.confirmPassword === '') {
            setformSubmitted(true)
        } else {
            const submitInfo = await authFunc.signup(formData)
            console.log("formData-->", submitInfo)
            let errorMsg = {}
            if (submitInfo.response && submitInfo.response.status != 200) {
                errorMsg[submitInfo.response.data.type] = submitInfo.response.data.message
                console.log("errorMsg", errorMsg)
                setValidataion(errorMsg)
            }
            else {
                console.log("formData-->success", submitInfo.data.data.data)
                // navigate("/login");
                handleShowModal()
            }

        }

    }
    const handleShowModal = () => setShowModal(!showModal);

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false)
        navigate('/login')
    }
    return (
        <>
            <Header />
            <div className="formWrapper marginTopBottom" >
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Your Email.</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>We've sent a confirmation email to your address. Click the confirmation link in the email to activate your account.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
                <form >
                    <div className="form-label mb-3">
                        <label>First Name</label>
                        {/* onChange​={(e) => setFormData({...formData, title: e.target.value})} value={formData.title} */}
                        <input onChange={(e) => {
                            setFormData({ ...formData, firstname: e.target.value })
                            setValidataion({ ...validation, firstname: "" })
                        }

                        } value={formData.firstname} type="text" />
                        {formSubmitted && formData.firstname.trim() === '' &&
                            <span style={{ color: "red" }}>First Name is Required</span>}
                        {validation.firstname && validation.firstname !== '' &&
                            <span style={{ color: "red" }}>{validation.firstname}</span>
                        }
                    </div>
                    <div className="form-label mb-3">
                        <label>Last Name</label>
                        <input onChange={(e) => {
                            setFormData({ ...formData, lastname: e.target.value })
                            setValidataion({ ...validation, lastname: "" })
                        }} value={formData.lastname} type="text" />
                        {formSubmitted && formData.lastname.trim() === '' &&
                            <span style={{ color: "red" }}>Last Name is Required</span>}
                        {validation.lastname && validation.lastname !== '' &&
                            <span style={{ color: "red" }}>{validation.lastname}</span>
                        }
                    </div>
                    <div className="form-label mb-3">
                        <label>Phone Number*</label>
                        <input onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value })
                            setValidataion({ ...validation, phone: "" })
                        }} value={formData.phone} type="number" />
                        {formSubmitted && formData.phone.trim() === '' &&
                            <span style={{ color: "red" }}>Phone Number is Required</span>}
                        {validation.phone && validation.phone !== '' &&
                            <span style={{ color: "red" }}>{validation.phone}</span>
                        }
                    </div>
                    <div className="form-label mb-3">
                        <label>Email Address*</label>
                        <input onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value })
                            setValidataion({ ...validation, email: "" })

                        }} value={formData.email} type="text" />
                        {formSubmitted && formData.email.trim() === '' &&
                            <span style={{ color: "red" }}>Email is Required</span>}
                        {validation.email && validation.email !== '' &&
                            <span style={{ color: "red" }}>{validation.email}</span>
                        }
                    </div>
                    <div className="form-label mb-3">
                        <label>Password</label>
                        <input onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value })
                            setValidataion({ ...validation, password: "" })

                        }} value={formData.password} type="password" />
                        {formSubmitted && formData.password.trim() === '' &&
                            <span style={{ color: "red" }}>Password Required</span>}
                        {validation.password && validation.password !== '' &&
                            <span style={{ color: "red" }}>{validation.password}</span>
                        }
                    </div>
                    <div className="form-label mb-3">
                        <label>Confirm Password</label>
                        <input onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} value={formData.confirmPassword} type="password" />
                        {formSubmitted && formData.confirmPassword.trim() === '' &&
                            <span style={{ color: "red" }}>Confirm Password Required</span>}
                        {validation.confirmPassword && validation.password !== '' && validation.confirmPassword !== '' && validation.password !== formData.confirmPassword &&
                            <span style={{ color: "red" }}>Password does not Matched</span>
                        }
                    </div>
                    <div className="d-flex">
                        <button type="button" onClick={() => submitForm()} className="btn btn-primary">Register</button>
                    </div>
                    <p className="text-start">Already have an account? <Link to="/login"> Login</Link></p>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Signup;
