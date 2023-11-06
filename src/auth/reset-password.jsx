import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../layout/header';
import Footer from '../layout/footer';
import authFunc from '../serviceApi/auth'
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [email, setemail] = useState('');

  const search = useLocation().search;
  let navigate = useNavigate();


  useEffect(() => {
    // console.log('path', search);
    const id = new URLSearchParams(search).get("id");
    console.log(id); 
    checkForgotToken(id)
}, []);

const checkForgotToken = async (id) => {
    const submitInfo = await authFunc.checkForgotToken(id);
    console.log("submitInfo--->",submitInfo,submitInfo?.data?.data?.data?.email)
    if(submitInfo?.response?.data?.message){
        setErrorMessage(submitInfo?.response?.data?.message)
    }
    setemail(submitInfo?.data?.data?.data?.email)
    
}

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const validatePasswords = () => {
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }

    // Example: Simple password length check
    if (newPassword.length < 8) {
      setErrorMessage('Password should be at least 8 characters long');
      return false;
    }

    // Clear the error message if validation passes
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validatePasswords()) {
      const id = new URLSearchParams(search).get('id');
      const submitInfo = await authFunc.resetPassword({password:newPassword,id,email});
        // if(submitInfo)
        navigate("/login");


        console.log("submitInfo-->0",submitInfo)
    }
  };

  return (
    <>
      <Header />
      <div className="formWrapper marginTopBottom">
        <h2>Reset Your Password</h2>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-label mb-3">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </div>
          <div className="form-label mb-3">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={handleConfirmPasswordChange}
            />
            {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}

          </div>
          <button disabled={errorMessage.length} className="btn btn-primary" type="submit">
            Reset Password
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default ResetPassword;
