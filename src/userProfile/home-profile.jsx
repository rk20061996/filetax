import React from "react"
import { Link } from 'react-router-dom';
import Sidebar from'../../src/layout/sidebar'

function HomeProfile(props) {
    return (
      <div className="main d-flex w-100 h-100">
        
      <Sidebar isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn}/>
      <div className="mainContent container-fluid">
        <div className="card">
          <h3>Welcome Back</h3>
          <div className="row">
            <div className="col-sm-8">
              <p>FILETAX personally welcome you as our esteemed client and we are anxious to assist you in achieving
                your taxation and accounting objectives. We love getting new clients because it allows us the opportunity
                to describe the FILETAX Philosophy. Our years of success are due to this philosophy, which includes
                helping our clients meet their taxation needs.</p>
            </div>
            <div className="col-sm-4">
              <img src="images/home-img.png" alt="" className="w-100" />
            </div>
          </div>
          <div className="progressWrap">
            <h3>Our Process</h3>
            <ul className="list-unstyled">
              <li>
                <h6>Step 1</h6>
                <a href="#"> <span className="material-symbols-outlined"> download </span> </a>
                <p>Tax Notes Organiser</p>
              </li>
              <li>
                <h6>Step 2</h6>
                <a href="#"> <span className="material-symbols-outlined"> upload </span> </a>
                <p>Tax Notes Organiser</p>
              </li>
              <li>
                <h6>Step 3</h6>
                <a href="#"> <span className="material-symbols-outlined"> phone_enabled </span> </a>
                <p>Tax Notes Organiser</p>
              </li>
              <li>
                <h6>Step 4</h6>
                <a href="#"> <span className="material-symbols-outlined"> attach_money </span> </a>
                <p>Tax Notes Organiser</p>
              </li>
              <li>
                <h6>Step 5</h6>
                <a href="#"> <span className="material-symbols-outlined"> note </span> </a>
                <p>Tax Notes Organiser</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    );
}

export default HomeProfile;
