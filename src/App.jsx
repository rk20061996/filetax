import React, { useEffect, useState } from "react"
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'jquery/dist/jquery.min.js'
// import 'bootstrap/dist/js/bootstrap.min.js'
import Signup from './auth/signup'
import Login from './auth/Login'
import Forgot from './auth/forgot-password'
import Confirmaccount from './auth/confirm-account'
import Resetpassword from './auth/reset-password'
import Home from './pages/home'
import About from './pages/about'
import Contactus from './pages/contact-us'
import Pricing from './pages/pricing'
import Studenttax from './pages/student-tax'
import Taxplanning from './pages/tax-planning'
import Taxreturnhome from './pages/tax-return'
import Itinprocessing from './pages/itin-processing'
import Taxconsulting from './pages/tax-consulting'
import Fatca from './pages/fatca'
import Fbar from './pages/fbar'
import Taxextension from './pages/tax-extension'

import HomeProfile from './userProfile/home-profile'
import UploadDocument from './userProfile/upload-document'
import TaxReturn from './userProfile/tax-return'
import Profile from './userProfile/profile'
import TaxDocument from './userProfile/tax-documentation'
import authFunc from './serviceApi/auth'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'


import Adminhome from './admin/admin-home'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [sessionCheck, setsessionCheck] = useState('')
  const [isLoggedIn, setisLoggedIn] = useState(false)
  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // alert("rk")
    let localSession = localStorage.getItem('token')
    setsessionCheck(localSession)
    if (localSession) {
      const fetchData = async () => {
        const tokenCheckApi = await authFunc.tokenCheck(localSession);
        console.log("tokenCheckApi", tokenCheckApi.data)
        if (tokenCheckApi.data.status === 200) {
          setisLoggedIn(true)
          // navigate("/");
        }
        else {
          setisLoggedIn(false)
          localStorage.removeItem('token')
          navigate("/login");
        }

      }
      fetchData()
    }
    else {
      // const location = useLocation();
      console.log(location.pathname);

      localStorage.removeItem('token')
      setisLoggedIn(false)
      if (location.pathname !== '/confirm-account' && location.pathname !== '/reset-password') {
        navigate("/");
      }
    }
    // console.log("tokenCheckApi", tokenCheckApi)

  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={<Home isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />} // <-- passed as JSX
      />
      <Route
        path="/signup"
        element={!isLoggedIn ? <Signup isLoggedIn={isLoggedIn} /> : <Home isLoggedIn={isLoggedIn} />} // <-- passed as JSX
      />
      <Route

        path="/login"
        element={!isLoggedIn ? <Login isLoggedIn={isLoggedIn}
          setisLoggedIn={setisLoggedIn} /> : <Home isLoggedIn={isLoggedIn} />} // <-- passed as JSX
      />
      <Route
        path="/confirm-account"
        element={<Confirmaccount />} // <-- passed as JSX
      />
      <Route
        path="/forgot-password"
        element={<Forgot isLoggedIn={isLoggedIn} />} // <-- passed as JSX
      />
      <Route
        path="/reset-password"
        element={<Resetpassword isLoggedIn={isLoggedIn} />} // <-- passed as JSX
      />

      <Route
        path="/about-us"
        element={<About isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />} // <-- passed as JSX
      />
      <Route
        path="/contact-us"
        element={<Contactus isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />} // <-- passed as JSX
      />
      <Route
        path="/pricing"
        element={<Pricing isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />} // <-- passed as JSX
      />
      <Route
        path="/student-tax"
        element={<Studenttax isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />} // <-- passed as JSX
      />
      <Route
        path="/tax-planning"
        element={<Taxplanning isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />} // <-- passed as JSX
      />
      <Route
        path="/tax-return"
        element={<Taxreturnhome isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />} // <-- passed as JSX
      />
      <Route
        path="/itin-processing"
        element={<Itinprocessing isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />} // <-- passed as JSX
      />
      <Route
        path="/tax-consulting"
        element={<Taxconsulting isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />} // <-- passed as JSX
      />
      <Route
        path="/fatca"
        element={<Fatca isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />} // <-- passed as JSX
      />
      <Route
        path="/fbar"
        element={<Fbar isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />} // <-- passed as JSX
      />
      <Route
        path="/tax-extension"
        element={<Taxextension isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />} // <-- passed as JSX
      />
      




      <Route
        path="/profile/home"
        element={
          <><link rel="stylesheet" href="css/profile.css" />
            <HomeProfile isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} /></>} // <-- passed as JSX
      />
      <Route
        path="/profile/upload-document"
        element={
          <><link rel="stylesheet" href="css/profile.css" />
            <UploadDocument isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} /></>} // <-- passed as JSX
      />
      <Route
        path="/profile/tax-return"
        element={
          <><link rel="stylesheet" href="css/profile.css" />

            <TaxReturn isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} /></>} // <-- passed as JSX
      />
      <Route
        path="/profile/Profile"
        element={
          <><link rel="stylesheet" href="css/profile.css" />

            <Profile isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} /></>} // <-- passed as JSX
      />
            <Route
        path="/profile/tax-documentaion"
        element={
          <><link rel="stylesheet" href="css/profile.css" />

            <TaxDocument isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} /></>} // <-- passed as JSX
      />
      
      <Route
        path="/admin/home"
        element={
          <><link rel="stylesheet" href="css/admin.css" />
            <Adminhome  /></>} // <-- passed as JSX
      />
    </Routes>

  )

}

export default App;
