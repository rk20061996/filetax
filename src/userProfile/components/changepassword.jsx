import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import userProfile from '../../serviceApi/auth';

function ChangePassword(props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setError("Please fill in all fields.");
      return;
    }

    // Password confirmation validation
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Handle form submission, e.g., making an API call to update the password
    const response = await userProfile.updatePassword({ oldPassword, newPassword });

    // Show success modal after a successful API call
    // if (response.success) {
      setShowSuccessModal(true);
    // }
  };

  const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Add any additional actions you want to perform after closing the modal
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: props.isChangingPassword ? "block" : "none" }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div>
              <label>Old Password</label>
              <input
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div>
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={handlePasswordChange}
              />
              {passwordStrength && <p>Password Strength: {passwordStrength}</p>}
            </div>
            <div>
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <button type="submit" className="btn btn-green mt-2">
              Change Password
            </button>
          </div>
        </div>
      </form>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Password Changed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your password has been changed successfully.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSuccessModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export { ChangePassword };
