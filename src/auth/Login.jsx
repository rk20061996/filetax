import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Header from '../layout/header';
import Footer from '../layout/footer';
import authFunc from '../serviceApi/auth';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userSlice';

function Login(props) {
    let navigate = useNavigate();
    const dispatch = useDispatch();

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
        let errorMsg = {  };

        if (submitInfo.response && submitInfo.response.status !== 200) {
            if(errorMsg[submitInfo.response.data.type]){
                errorMsg[submitInfo.response.data.type] = submitInfo.response.data.message;
            }else{
                errorMsg["password"] = submitInfo.response.data.message;
            }
            
            console.log(" submitInfo.response.data.message-->0", submitInfo.response.data)
            setValidation(errorMsg);
        } else {
            localStorage.setItem("token", submitInfo.data.data.token);
            console.log("token--->",submitInfo,submitInfo.data.data.token,submitInfo)
            props.setisLoggedIn(true);
            dispatch(setUser(submitInfo.data.data)); // Dispatch action to save user details

            navigate("/profile/home");
        }
    };

    const handleEmailChange = (e) => {
        setFormData(prevData => ({ ...prevData, email: e.target.value }));
    };

    const handlePasswordChange = (e) => {
        setFormData(prevData => ({ ...prevData, password: e.target.value }));
    };

    return (
        <>
            <Header />
            <div className="formWrapper marginTopBottom" >
                <form>
                    <div className="form-label mb-3">
                        <label>Email </label>
                        <input type="text" onChange={handleEmailChange} value={formData.email}/>
                        {validation.email && validation.email !== '' &&
                            <span style={{ color: "red" }}>{validation.email}</span>
                        }
                    </div>
                    <div className="form-label mb-3">
                        <label>Password</label>
                        <input type="password" onChange={handlePasswordChange} value={formData.password}/>
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
