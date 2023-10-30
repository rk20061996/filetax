import React from "react"
import { Link } from 'react-router-dom';
import Sidebar from'../../src/layout/sidebar'

function Profile(props) {
    return (
      <div className="main d-flex w-100 h-100">
      <Sidebar isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn}/>
      <div className="mainContent container-fluid">
        <div className="card">
          <h3>My Profile</h3>
          <div className="btnWrapper">
            <a href="#" className="btn btn-primary">Edit Profile</a>
            <a href="#" className="btn btn-primary">Change Password</a>
          </div>
          <form >
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="form-group">
                  <label>Firstname</label>
                  <input type="text" placeholder="First Name" />
                </div>
                <div className="form-group">
                  <label>Lastname</label>
                  <input type="text" placeholder="Last Name"/>
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="form-group">
                  <label>Email Id</label>
                  <input type="text" placeholder="Email" />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="number" placeholder="Mobile Number" />
                </div>
              </div>
              <div className="col-sm-6">
                  <div className="form-group">
                    <label>Upload profile picture</label>
                    <input type="file" className="input-file"  placeholder=""/>
                  </div>
                <button className="btn btn-green mt-2">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
}

export default Profile;
