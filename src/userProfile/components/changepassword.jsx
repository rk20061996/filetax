import React, { useState } from "react";
import userProfile from '../../serviceApi/auth';

function ChangePassword(props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      setError("Please fill in both old and new passwords.");
      return;
    }

    // Password strength validation
    if (!isStrongPassword(newPassword)) {
      setError("Password should be at least 8 characters long and include letters, numbers, and special characters.");
      return;
    }

    // Handle form submission, e.g., making an API call to update the password
    
    const response = await userProfile.updatePassword({oldPassword,newPassword});

    // console.log("Old Password:", oldPassword);
    // console.log("New Password:", newPassword);
  };

  const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);

    if (isStrongPassword(newPasswordValue)) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Weak");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: props.isChangingPassword ? "block" : "none" }}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div >
            <label>Old Password</label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div >
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
        </div>
        <div className="col-sm-6">
          <button type="submit" className="btn btn-green mt-2">
            Change Password
          </button>
        </div>
      </div>
    </form>
  );
}

export { ChangePassword };
