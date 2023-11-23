import React from "react";
import Sidebar from '../../src/layout/sidebar';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HomeProfile(props) {
  const user = useSelector(state => state.user); // Assuming 'user' is a slice of your Redux state
  const status = { 1: "Ready for preparation", 2: "In Progress", 3: "Summary Sent", 4: "Pending Recieved", 5: "Draft", 6: "Ready for e-file", 7: "Accepted" }
  return (
    <div className="main d-flex w-100 h-100">
      <Sidebar isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
      <div className="mainContent container-fluid">
        <div className="card">
          <h3>Welcome Back</h3>
          <div className="row">
            <div className="col-sm-8">
              <p>FILETAX personally welcomes you as our esteemed client, and we are anxious to assist you in achieving your taxation and accounting objectives. We love getting new clients because it allows us the opportunity to describe the FILETAX Philosophy. Our years of success are due to this philosophy, which includes helping our clients meet their taxation needs.</p>
            </div>
            <div className="col-sm-4">
              <img src="images/home-img.png" alt="" className="w-100" />
            </div>
          </div>
           {/* Status indicator */}
           <div className="status-indicator">
              <h3>Status</h3>
              <p>Your tax preparation status is <span className="status-ready">{user?.userData?.user_status_type?status[user?.userData?.user_status_type]:"Ready for preparation"}</span></p>
            </div>
          <div className="progressWrap">
            <h3>Our Process</h3>
            <ul className="list-unstyled">
              <li>
                <h6>Step 1</h6>
                <NavLink to="/profile/tax-documentaion" activeClassName="active">
                  <span className="material-symbols-outlined"> upload </span>
                </NavLink>
                <p>Tax Information</p>
              </li>
              <li>
                <h6>Step 2</h6>
                <NavLink to="/profile/upload-document" activeClassName="active">
                  <span className="material-symbols-outlined"> download </span>
                </NavLink>
                <p>Upload Documents</p>
              </li>
              <li>
                <h6>Step 3</h6>
                <NavLink to="/profile/tax-return" activeClassName="active">
                  <span className="material-symbols-outlined"> phone_enabled </span>
                </NavLink>
                <p>Tax Returns</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeProfile;
