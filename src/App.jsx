import React, { useEffect, useState } from "react"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import Signup from './auth/signup'
import Login from './auth/Login'
import Forgot from './auth/forgot-password'
import Home from './pages/home'
import About from './pages/about'
import authFunc from './serviceApi/auth'
import { useNavigate } from "react-router-dom";

// import '../public/css/style.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [sessionCheck, setsessionCheck] = useState('')
  const [isLoggedIn, setisLoggedIn] = useState(false)
  let navigate = useNavigate();

  useEffect(() => {
    // alert("rk")
    let localSession = localStorage.getItem('token')
    setsessionCheck(localSession)
    if (localSession) {
      const fetchData = async () => {
        const tokenCheckApi = await authFunc.tokenCheck(localSession);
        console.log("tokenCheckApi", tokenCheckApi.data)
        if(tokenCheckApi.data.status === 200){
          setisLoggedIn(true)
          navigate("/");
        }
        else{
          setisLoggedIn(false)
          localStorage.removeItem('token')
          navigate("/login");  
        }
        
      }
      fetchData()
    } 
    else {
      localStorage.removeItem('token')
      setisLoggedIn(false)
      navigate("/");
    }
    // console.log("tokenCheckApi", tokenCheckApi)

  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={<Home isLoggedIn={isLoggedIn} />} // <-- passed as JSX
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
        path="/forgot-password"
        element={<Forgot isLoggedIn={isLoggedIn} />} // <-- passed as JSX
      />
      <Route
        path="/about-us"
        element={<About isLoggedIn={isLoggedIn} />} // <-- passed as JSX
      />
    </Routes>

  )

}

export default App;
