import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import Signup from'./auth/signup'
import Login from'./auth/Login'
import Forgot from'./auth/forgot-password'
import Home from'./pages/home'
import About from'./pages/about'

// import '../public/css/style.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
          <Routes>
            <Route
              path="/"
              element={<Home />} // <-- passed as JSX
            />
            <Route
              path="/signup"
              element={<Signup />} // <-- passed as JSX
            />
            <Route
              path="/login"
              element={<Login />} // <-- passed as JSX
            />
            <Route
              path="/forgot-password"
              element={<Forgot />} // <-- passed as JSX
            />
            <Route
              path="/about-us"
              element={<About />} // <-- passed as JSX
            />
          </Routes>
        
  )

}

export default App;
