import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Header from '../layout/header';
import Footer from '../layout/footer';
import authFunc from '../serviceApi/auth';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userSlice';
import { Modal, Button } from 'react-bootstrap';

function Login(props) {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
        email: "",
    });

    const [validation, setValidation] = useState({
        password: "",
        email: "",
    });

    const submitForm = async () => {
        const submitInfo = await authFunc.login(formData);
        let errorMsg = {};

        if (submitInfo.response && submitInfo.response.status !== 200) {
            if (errorMsg[submitInfo.response.data.type]) {
                errorMsg[submitInfo.response.data.type] = submitInfo.response.data.message;
            } else {
                errorMsg["password"] = submitInfo.response.data.message;
            }

            console.log(" submitInfo.response.data.message-->0", submitInfo.response.data)
            setValidation(errorMsg);
        } else {

            if (submitInfo.data.data.status) {
                localStorage.setItem("token", submitInfo.data.data.token);
                console.log("token--->", submitInfo, submitInfo.data.data.token, submitInfo)
                props.setisLoggedIn(true);
                dispatch(setUser(submitInfo.data.data)); // Dispatch action to save user details
                if(submitInfo.data.data.user_type == 2){
                    navigate("/profile/home");
                }else{
                    navigate("/admin/home");
                    localStorage.setItem("admin", "yes");

                }
            } else {
                handleShowModal()
            }
        }
    };

    const handleEmailChange = (e) => {
        setFormData(prevData => ({ ...prevData, email: e.target.value }));
    };

    const handlePasswordChange = (e) => {
        setFormData(prevData => ({ ...prevData, password: e.target.value }));
    };
    // Function to show the modal
    const handleShowModal = () => setShowModal(!showModal);

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false)
        // navigate('/profile/home')
    }
        return (
            <>
                <Header />
                <div className="formWrapper marginTopBottom" >
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Your email is not verified.</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Please verify your email address to access all features of our platform.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                OK
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <form>
                        <div className="form-label mb-3">
                            <label>Email </label>
                            <input type="text" onChange={handleEmailChange} value={formData.email} />
                            {validation.email && validation.email !== '' &&
                                <span style={{ color: "red" }}>{validation.email}</span>
                            }
                        </div>
                        <div className="form-label mb-3">
                            <label>Password</label>
                            <input type="password" onChange={handlePasswordChange} value={formData.password} />
                            {validation.password && validation.password !== '' &&
                                <span style={{ color: "red" }}>{validation.password}</span>
                            }
                        </div>
                        <div className="d-flex">
                            <button onClick={submitForm} type="button" className="btn btn-primary">Login</button>
                            <Link to="/forgot-password"> Forgot Password?</Link>
                        </div>
                        <p className="text-start">Don't Have an Account? <Link to="/signup"> Create an account</Link></p>
                    </form>
                </div>
                <Footer />
            </>
        );
    }

    export default Login;
