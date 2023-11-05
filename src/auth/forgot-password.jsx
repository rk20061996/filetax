import React, { useState } from "react"
import { Link } from 'react-router-dom';
import Header from '../layout/header'
import Footer from '../layout/footer'
import { Modal, Button } from 'react-bootstrap';
import authFunc from '../serviceApi/auth';

function Forgot() {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleShowModal = () => setShowModal(!showModal);

    const handleCloseModal = () => setShowModal(false);

    const validateEmail = () => {
        if (!email) {
            setEmailError('Please enter your email.');
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please enter a valid email.');
            return false;
        }
        setEmailError('');
        return true;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (validateEmail()) {
            const submitInfo = await authFunc.forgotPassword({email});

            // Here you can send the password reset link
            handleShowModal();
        }
    };

    return (
        <>
            <Header />
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Forgot Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>A password reset link has been sent to your email. Please check your email to reset your password.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="formWrapper marginTopBottom" >
                <form onSubmit={handleSubmit}>
                    <div className="form-label mb-3">
                        <label>Email Id:</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
                    </div>

                    <div className="d-flex mb-0">
                        <button type="submit" className="btn btn-primary">Send Mail</button>
                    </div>
                </form>
            </div>
            <Footer />
        </>

    );
}

export default Forgot;
