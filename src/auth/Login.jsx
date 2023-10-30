import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import Header from '../layout/header'
import Footer from '../layout/footer'
import authFunc from '../serviceApi/auth'
import { useNavigate } from "react-router-dom";

function Login(props) {
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: "",
        email: "",
    })
    const [validation, setValidataion] = useState({
        password: "",
        email: "",
    })
    const submitForm = async () => {
       
            const submitInfo = await authFunc.login(formData)
            console.log("formData-->", submitInfo)
            let errorMsg = {}
            if (submitInfo.response && submitInfo.response.status != 200) {
                errorMsg[submitInfo.response.data.type] = submitInfo.response.data.message
                console.log("errorMsg", errorMsg)
                setValidataion(errorMsg)
            }
            else {
                localStorage.setItem("token",submitInfo.data.data.token)
                console.log("formData-->success", submitInfo.data.data.token)
                props.setisLoggedIn(true)
                navigate("/");
            }

        // }

    }
    return (
        <>
            <Header />
            <div className="formWrapper marginTopBottom" >
                <form>
                    <div className="form-label mb-3">
                        <label>Email </label>
                        <input type="text" onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value })
                        }} value={formData.email}/>
                        {validation.email && validation.email !== '' &&
                            <span style={{ color: "red" }}>{validation.email}</span>
                        }
                    </div>
                    <div className="form-label mb-3">
                        <label>Password</label>
                        <input type="password" onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value })
                        }} value={formData.password}/>
                        {validation.password && validation.password !== '' &&
                            <span style={{ color: "red" }}>{validation.password}</span>
                        }
                    </div>
                    <div className="d-flex">
                        <button onClick={() => submitForm()} type="submit" className="btn btn-primary">Login</button>
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
