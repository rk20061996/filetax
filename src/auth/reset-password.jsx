import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../layout/header';
import Footer from '../layout/footer';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const search = useLocation().search;


  useEffect(() => {
    // console.log('path', search);
    const id = new URLSearchParams(search).get("id");
    console.log(id); 
    checkForgotToken(id)
}, []);

const checkForgotToken = async (id) => {
    const submitInfo = await authFunc.checkForgotToken(id);
    if(submitInfo?.response?.data?.message){
        setErrorMessage(submitInfo?.response?.data?.message)
    }
    
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      const id = new URLSearchParams(search).get('id');
      // Call the reset password API here with newPassword and confirmation code
      // For example: resetPassword(newPassword, id)
      // On API success, display success message or redirect
      setSuccessMessage('Password reset successfully!');
      // Redirect to login or other pages
      // history.push('/login');
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
          <button className="btn btn-primary" type="submit">
            Reset Password
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default ResetPassword;
