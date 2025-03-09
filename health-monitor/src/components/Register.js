import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/register.css";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [formData, setFormData] = useState({
    name: "Anonymous",
    email: "",
    password: "",
    confirmpassword: "",
    role: "patient", // Directly assigned in formData
  });
  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    if (!formData.email) {
      setEmailError("Email is required");
      return;
    }
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setEmailError("Invalid email format");
      return;
    }
    if (formData.email !== formData.email.toLowerCase()) {
      setEmailError("Email must be in lowercase");
      return;
    }

    // Password validation
    let strength = 0;
    if (!formData.password) {
      setPassError("Password is required");
      return;
    }
    if (!formData.password.match(/[a-z]/)) {
      setPassError("Password should contain at least one lowercase letter");
      return;
    }
    strength++;
    if (!formData.password.match(/[A-Z]/)) {
      setPassError("Password should contain at least one uppercase letter");
      return;
    }
    strength++;
    if (!formData.password.match(/[0-9]/)) {
      setPassError("Password should contain at least one numeric digit");
      return;
    }
    strength++;
    if (!formData.password.match(/[$@#&!]/)) {
      setPassError("Password should contain at least one special character");
      return;
    }
    strength++;
    if (formData.password.length < 8) {
      setPassError("Password must have at least 8 characters");
      return;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmpassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/User/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/patient-dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div
      id="login-container"
      style={{
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#008B8B",
      }}
    >
      <div id="login-container-box">
        <div
          id="logo"
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <img
            className="img-fluid"
            src="https://media.licdn.com/dms/image/C560BAQGYYuRNc51wog/company-logo_200_200/0/1631381718986?e=2147483647&v=beta&t=-MWTZKj5QY0ahW6nF-DYGuicq8LPa8DeKofynMt6DPI"
            alt="Health Monitor Logo"
          />
        </div>
        <div id="login-box">
          <h2 id="login">Register Here</h2>

          <form id="form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <span>
                <i className="fa-solid fa-envelope fa-lg icon"></i>
              </span>
              <label htmlFor="email" className="form-label" style={{ fontWeight: "500" }}>
                &emsp;Email address
              </label>
              <input
                className="form-control"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            </div>

            <div>
              <span>
                <i className="fa-solid fa-key fa-lg icon"></i>
              </span>
              <label htmlFor="password" className="form-label" style={{ fontWeight: "500" }}>
                &emsp;Password:
              </label>
              <input
                id="password"
                className="form-control"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="form-text" style={{ color: "GrayText" }}>
                Your password must be 8+ characters long, contain uppercase, lowercase, numbers, and special characters.
              </div>
              {passError && <p style={{ color: "red" }}>{passError}</p>}
            </div>

            <div>
              <span>
                <i className="fa-solid fa-key fa-lg icon"></i>
              </span>
              <label htmlFor="confirmpassword" className="form-label" style={{ fontWeight: "500" }}>
                &emsp;Confirm Password:
              </label>
              <input
                id="confirmpassword"
                className="form-control"
                type="password"
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleChange}
                required
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>

            <button id="button" type="submit">
              Register
            </button>
          </form>
          <br />
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
