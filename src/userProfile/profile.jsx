import React from "react";
import { useState } from "react";
import Sidebar from "../../src/layout/sidebar";

function Profile(props) {
  const [formData, setFormData] = useState(new FormData());

  const handleChange = (event) => {
    const newFormData = new FormData(formData);
    newFormData.set(event.target.name, event.target.value);
    setFormData(newFormData);
  };

  const handleFileChange = (event) => {
    const newFormData = new FormData(formData);
    newFormData.set("profilePicture", event.target.files[0]);
    setFormData(newFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // const response = await fetch("YOUR_API_ENDPOINT", {
      //   method: "POST",
      //   body: formData,
      // });

      // if (response.ok) {
      //   // Handle success
      //   console.log("Form data sent successfully");
      // } else {
      //   // Handle error
      //   console.error("Error sending form data");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="main d-flex w-100 h-100">
      <Sidebar isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
      <div className="mainContent container-fluid">
        <div className="card">
          <h3>My Profile</h3>
          <div className="btnWrapper">
            <a href="#" className="btn btn-primary">
              Edit Profile
            </a>
            <a href="#" className="btn btn-primary">
              Change Password
            </a>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="form-group">
                  <label>Firstname</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Lastname</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="form-group">
                  <label>Email Id</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input
                    type="number"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Upload profile picture</label>
                  <input
                    type="file"
                    className="input-file"
                    placeholder=""
                    onChange={handleFileChange}
                  />
                </div>
                <button type="submit" className="btn btn-green mt-2">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
