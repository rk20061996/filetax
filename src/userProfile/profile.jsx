import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userSlice';
import { useNavigate } from "react-router-dom";
import Sidebar from "../../src/layout/sidebar";
import userProfile from '../serviceApi/userprofile';
import { ChangePassword } from "./components/changepassword";

function Profile(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: { value: "", error: "" },
    lastName: { value: "", error: "" },
    email: { value: "", error: "" },
    mobileNumber: { value: "", error: "" },
    profilePicture: null,
    oldPassword: { value: "", error: "" },
    newPassword: { value: "", error: "" },
    confirmPassword: { value: "", error: "" },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileDetails, setProfileDetails] = useState(null);
  const [updatedUserData, setupdatedUserData] = useState([]);
  const [updatedImage, SetupdatedImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email); // Basic email validation
  };

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
      updatedFormData.confirmPassword.error = "";
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

      if (formData.confirmPassword.value !== formData.newPassword.value) {
        updatedFormData.confirmPassword.error = "Passwords do not match";
        valid = false;
      } else {
        updatedFormData.confirmPassword.error = "";
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const updatedFormData = { ...formData };

      const data = new FormData();
      data.append('firstName', updatedFormData.firstName.value);
      data.append('lastName', updatedFormData.lastName.value);
      data.append('email', updatedFormData.email.value);
      data.append('mobileNumber', updatedFormData.mobileNumber.value);
      if (updatedFormData.profilePicture) {
        data.append('profilePicture', updatedFormData.profilePicture);
      }
      data.append('type', "updateProfile");

      try {
        const response = await userProfile.updateProfile(data);
        // Handle response as needed
        console.log("response check", response);
        event.preventDefault();
        let obj = response.data.data.data;
        setupdatedUserData({ obj, profileupdate: true });
        dispatch(setUser(response.data.data.data)); // Dispatch action to save user details
        handleShowModal(); 
      } catch (error) {
        console.error("Error:", error);
      }
    }
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

  useEffect(() => {
    const getProfileDetails = async () => {
      try {
        const getAllData = await userProfile.getUserDataByToken();
        setProfileDetails(getAllData?.data?.data);
        const updatedFormData = { ...formData };

        updatedFormData.firstName.value = getAllData?.data?.data[0].firstname;
        updatedFormData.lastName.value = getAllData?.data?.data[0].lastname;
        updatedFormData.email.value = getAllData?.data?.data[0].email;
        updatedFormData.mobileNumber.value = getAllData?.data?.data[0].phone;
        setFormData(updatedFormData);
      } catch (error) {
        console.error('Error fetching document data:', error);
      }
    };
    getProfileDetails();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setIsChangingPassword(false);
    const updatedFormData = { ...formData };

    updatedFormData.oldPassword.error = "";
    updatedFormData.newPassword.error = "";
    updatedFormData.confirmPassword.error = "";
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
    updatedFormData.confirmPassword.error = "";
    updatedFormData.firstName.error = "";
    updatedFormData.lastName.error = "";
    updatedFormData.email.error = "";
    updatedFormData.mobileNumber.error = "";
    setFormData(updatedFormData);
  };

  // Function to show the modal
  const handleShowModal = () => setShowModal(true);

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/profile/home');
  };

  return (
    <div className="main d-flex w-100 h-100">
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Congrats! Your profile has been updated.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Sidebar socket={props.socket} id={props.id} updatedImage={updatedImage} isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} updatedUserData={updatedUserData} />
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
          <form style={{ display: isEditing ? "block" : "none" }}>
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
                    accept=".pdf, .xls, .doc, .docx, image/*"

                  />
                </div>
                <button onClick={handleSubmit} type="button" className="btn btn-green mt-2">
                  Submit
                </button>
              </div>
            </div>
          </form>
          <ChangePassword isChangingPassword={isChangingPassword} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
