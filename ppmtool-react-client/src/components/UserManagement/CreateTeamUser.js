import React from "react";
import { useState } from "react";
import { addTeamMember } from "../..//actions/securityActions.js";
import axios from "axios";
import { connect } from "react-redux";

function CreateTeamUser(props) {
  const initial = {
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    role: "",
  };

  const validationErrors = {
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    role: "",
  };

  const [inputValue, setInputValue] = useState(initial);
  const [errors, setErrors] = useState(validationErrors);

  const onFullNameChange = (e) => {
    setInputValue({ ...inputValue, fullName: e.target.value });
    
  };

  const onPasswordChange = (e) => {
    setInputValue({ ...inputValue, password: e.target.value });
  };

  const onCPasswordChange = (e) => {
    setInputValue({ ...inputValue, confirmPassword: e.target.value });
  };

  const onUserNameChange = (e) => {
    setInputValue({ ...inputValue, username: e.target.value });
  };

  const onRoleChange = (e) => {
    setInputValue({ ...inputValue, role: e.target.value });
  };

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  const onCreateNewUser = async (e) => {
    e.preventDefault();
    if (inputValue.fullName == "") {
      setErrors({ ...validationErrors, fullName: "Full Name cannot be None" });
    } else if (inputValue.password.length < 8) {
      setErrors({
        ...validationErrors,
        password: "Password cannot be less than 8 characters",
      });
    } else if (inputValue.confirmPassword != inputValue.password) {
      setErrors({
        ...validationErrors,
        confirmPassword: "Password does not match",
      });
    } else if (!validateEmail(inputValue.username)) {
      setErrors({
        ...validationErrors,
        username: "Enter valid email address",
      });
    } else if (inputValue.role == "None") {
      setErrors({
        ...validationErrors,
        role: "Select a valid role",
      });
    } else {
      setErrors({
        ...validationErrors,
      });

  
      console.log(inputValue)
      const id = props.security.user.id
      props.addTeamMember(inputValue, props.history, id)
   
    }
  };

  return (
    <>
      <div className="main-container">
        <h1>Create New Team Member</h1>
        <div>
          <label>Full Name</label>
          <input onChange={onFullNameChange} type="text" />
          <p>{errors.fullName}</p>
        </div>
        <div>
          <label>Password</label>
          <input onChange={onPasswordChange} type="password" />
          <p>{errors.password}</p>
        </div>
        <div>
          <label>Confirm Password</label>
          <input onChange={onCPasswordChange} type="password" />
          <p>{errors.confirmPassword}</p>
        </div>
        <div>
          <label>Email</label>
          <input onChange={onUserNameChange} type="text" />
          <p>{errors.username}</p>
        </div>
        <div>
          <label>Role</label>
          <select onChange={onRoleChange}>
            <option value="None">Select One</option>
            <option value="Developer">Developer</option>
            <option value="Tester">Tester</option>
          </select>
          <p>{errors.role}</p>
        </div>

        <div>
          <button onClick={onCreateNewUser}>Create Team Memeber</button>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { addTeamMember })(CreateTeamUser);
