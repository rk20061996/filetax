import React, { useState, useEffect } from "react";
import Sidebar from "../../src/layout/sidebar";
import userProfile from '../serviceApi/userprofile';

function Profile(props) {
  const [formData, setFormData] = useState({
    firstName: { value: "", error: "" },
    lastName: { value: "", error: "" },
    email: { value: "", error: "" },
    mobileNumber: { value: "", error: "" },
    profilePicture: null,
    oldPassword: { value: "", error: "" },
    newPassword: { value: "", error: "" },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileDetails, setprofileDetails] = useState([false]);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email); // Basic email validation
  };
  useEffect(() => {
    const getProfileDetails = async () => {
      try {
        const getAllData = await userProfile.getUserDataByToken();
        setprofileDetails(getAllData?.data?.data);
        const updatedFormData = { ...formData };

        updatedFormData.firstName.value = getAllData?.data?.data[0].firstname;
        updatedFormData.lastName.value = getAllData?.data?.data[0].lastname;
        updatedFormData.email.value = getAllData?.data?.data[0].email;
        updatedFormData.mobileNumber.value = getAllData?.data?.data[0].phone;
        setFormData(updatedFormData);
      } catch (error) {
        // Handle errors here
        console.error('Error fetching document data:', error);
      }
    };
    getProfileDetails();
  }, []);

  const validateForm = () => {
    let valid = true;
    const updatedFormData = { ...formData };

    if (isEditing) {
      if (formData.firstName.value === "") {
        updatedFormData.firstName.error = "First Name is required";
        valid = false;
      } else {
        updatedFormData.firstName.error = "";
      }

      if (formData.lastName.value === "") {
        updatedFormData.lastName.error = "Last Name is required";
        valid = false;
      } else {
        updatedFormData.lastName.error = "";
      }

      if (formData.email.value === "" || !validateEmail(formData.email.value)) {
        updatedFormData.email.error = "Valid Email is required";
        valid = false;
      } else {
        updatedFormData.email.error = "";
      }

      if (formData.mobileNumber.value === "" || isNaN(formData.mobileNumber.value)) {
        updatedFormData.mobileNumber.error = "Valid Mobile Number is required";
        valid = false;
      } else {
        updatedFormData.mobileNumber.error = "";
      }

      // Clearing password fields' errors on changing sections
      updatedFormData.oldPassword.error = "";
      updatedFormData.newPassword.error = "";
    }

    if (isChangingPassword) {
      if (formData.oldPassword.value === "") {
        updatedFormData.oldPassword.error = "Old Password is required";
        valid = false;
      } else {
        updatedFormData.oldPassword.error = "";
      }

      if (formData.newPassword.value === "") {
        updatedFormData.newPassword.error = "New Password is required";
        valid = false;
      } else {
        updatedFormData.newPassword.error = "";
      }

      // Clearing profile fields' errors on changing sections
      updatedFormData.firstName.error = "";
      updatedFormData.lastName.error = "";
      updatedFormData.email.error = "";
      updatedFormData.mobileNumber.error = "";
    }

    setFormData(updatedFormData);
    return valid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: { value, error: "" },
    });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, profilePicture: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const getAllData = await userProfile.updateProfile(formData);

      try {
        // updateProfile
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setIsChangingPassword(false);
    const updatedFormData = { ...formData };

    updatedFormData.oldPassword.error = "";
    updatedFormData.newPassword.error = "";
    updatedFormData.firstName.error = "";
    updatedFormData.lastName.error = "";
    updatedFormData.email.error = "";
    updatedFormData.mobileNumber.error = "";
    setFormData(updatedFormData);

  };

  const handleChangePasswordClick = () => {
    setIsChangingPassword(!isChangingPassword);
    setIsEditing(false);
    const updatedFormData = { ...formData };

    updatedFormData.oldPassword.error = "";
    updatedFormData.newPassword.error = "";
    updatedFormData.firstName.error = "";
    updatedFormData.lastName.error = "";
    updatedFormData.email.error = "";
    updatedFormData.mobileNumber.error = "";
    setFormData(updatedFormData);
  };

  return (
    <div className="main d-flex w-100 h-100">
      <Sidebar isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
      <div className="mainContent container-fluid">
        <div className="card">
          <h3>My Profile</h3>
          <div className="btnWrapper">
            <a className={`btn btn-primary ${isEditing ? "active" : ""}`} onClick={handleEditClick}>
              Edit Profile
            </a>
            <a
              className={`btn btn-primary ${isChangingPassword ? "active" : ""}`}
              onClick={handleChangePasswordClick}
            >
              Change Password
            </a>
          </div>
          <form onSubmit={handleSubmit} style={{ display: isEditing ? "block" : "none" }}>
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="form-group">
                  <label>Firstname</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName.value}
                    onChange={handleChange}
                  />
                  <div style={{ color: "red", marginTop: "5px" }}>{formData.firstName.error}</div>
                </div>
                <div className="form-group">
                  <label>Lastname</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName.value}
                    onChange={handleChange}
                  />
                  <div style={{ color: "red", marginTop: "5px" }}>{formData.lastName.error}</div>
                </div>
                <div className="form-group">
                  <label>Email Id</label>
                  <input
                    readOnly
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email.value}
                    onChange={handleChange}
                  />
                  <div style={{ color: "red", marginTop: "5px" }}>{formData.email.error}</div>
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input
                    type="text"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    value={formData.mobileNumber.value}
                    onChange={handleChange}
                  />
                  <div style={{ color: "red", marginTop: "5px" }}>{formData.mobileNumber.error}</div>
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
          <form 
          // onSubmit={handleSubmit} 
          style={{ display: isChangingPassword ? "block" : "none" }}>
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="form-group">
                  <label>Old Password</label>
                  <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    value={formData.oldPassword.value}
                    onChange={handleChange}
                  />
                  <div style={{ color: "red", marginTop: "5px" }}>{formData.oldPassword.error}</div>
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword.value}
                    onChange={handleChange}
                  />
                  <div style={{ color: "red", marginTop: "5px" }}>{formData.newPassword.error}</div>
                </div>
              </div>
              <div className="col-sm-6">
                <button type="submit" className="btn btn-green mt-2">
                  Change Password
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
