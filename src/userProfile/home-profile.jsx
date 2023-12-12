import React from "react";
import Sidebar from '../../src/layout/sidebar';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HomeProfile(props) {
  const user = useSelector(state => state.user); // Assuming 'user' is a slice of your Redux state
  const status = { 1: "Ready for preparation", 2: "In Progress", 3: "Summary Sent", 4: "Pending Recieved", 5: "Draft", 6: "Ready for e-file", 7: "Accepted" }

  const downloadTaxNotes = async() =>{
    const baseUrl = window.location.protocol + '//' + window.location.host;

// console.log('Base URL:', baseUrl);
        const fileUrl = baseUrl+'/tax-notes/Tax - Notes 2023.xlsx';
         // Replace with the actual URL of the file

        try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
      
            // Create a temporary link element
            const link = document.createElement('a');
      
            // Set the download attribute and create a URL for the Blob
            // const parts = id.split('.');
            link.download = 'Tax-Notes2023.xlsx'; // You can set the desired file name here
            link.href = window.URL.createObjectURL(blob);
      
            // Append the link to the document and click it programmatically
            document.body.appendChild(link);
            link.click();
      
            // Clean up by removing the link
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
  }
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
              <h3>Status {" "}<button style={{"marginLeft": "50px"}} className="status-ready btn btn-primary">{user?.userData?.user_status_type?status[user?.userData?.user_status_type]:"Ready for preparation"}</button></h3>
              {/* <p>Your tax preparation status is {" "}</p> */}
            </div>
          <div className="progressWrap">
            <h3>Our Process</h3>
            <ul className="list-unstyled">
            <li>
                <h6>Step 1</h6>
                <NavLink onClick={downloadTaxNotes} activeClassName="active">
                  <span className="material-symbols-outlined"> download </span>
                </NavLink>
                <p>Download Tax Notes</p>
              </li>
              <li>
                <h6>Step 2</h6>
                <NavLink to="/profile/upload-document" activeClassName="active">
                  <span className="material-symbols-outlined"> upload </span>
                </NavLink>
                <p>Upload Tax Notes and Other Tax Documents</p>
              </li>
              
              <li>
                <h6>Step 3</h6>
                <NavLink to="/profile/tax-return" activeClassName="active">
                  <span className="material-symbols-outlined"> phone_enabled </span>
                </NavLink>
                <p>Summary and Draft</p>
              </li>
              <li>
                <h6>Step 4</h6>
                {/* <NavLink to="/profile/tax-return" activeClassName="active"> */}
                  <span className="material-symbols-outlined"> payment </span>
                {/* </NavLink> */}
                <p>Payment</p>
              </li>
              <li>
                <h6>Step 5</h6>
                <NavLink to="/profile/tax-return" activeClassName="active">
                  <span className="material-symbols-outlined"> preview </span>
                </NavLink>
                <p>Review Draft</p>
              </li>
              <li>
                <h6>Step 6</h6>
                {/* <NavLink to="/profile/tax-return" activeClassName="active"> */}
                  <span className="material-symbols-outlined"> inventory </span>
                {/* </NavLink> */}
                <p>Filed</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeProfile;
