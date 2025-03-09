import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/login.css"; // Importing your custom CSS file
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from "./Functions/AuthProvider";


const LoginForm = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: val,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/User/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData }),
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Received data:', data);

      if (response.ok) {
        const { token } = data;

        if (typeof token !== "string") {
          throw new Error("Invalid token received");
        }

        const decoded = jwtDecode(token);
        console.log(decoded);

        // Store token and user info in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({ userId: decoded.userId, role: decoded.role })
        );

        setUser({ userId: decoded.userId, role: decoded.role });
        console.log("Received Token:", data.token); // Debugging
        localStorage.setItem("token", data.token);
        navigate("/patient-dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };




  const handleForgotPassword = () => {
    // Implement the logic for handling forgot password
    // This typically involves sending a password reset email to the user's email address
    console.log("Forgot Password clicked");
    // You would send a request to your backend to handle the password reset process
    // For this example, let's just show an alert
    alert("A password reset link has been sent to your email.");
  };

  return (
    <>
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
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              class="img-fluid"
              src="https://media.licdn.com/dms/image/C560BAQGYYuRNc51wog/company-logo_200_200/0/1631381718986?e=2147483647&v=beta&t=-MWTZKj5QY0ahW6nF-DYGuicq8LPa8DeKofynMt6DPI"
              alt="Health Monitor Logo"
            />
          </div>
          <div id="login-box">

            <h2 id="login">Login Here</h2>
            <form id="form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <span>
                  <i class="fa-solid fa-envelope fa-lg icon "></i>
                </span>
                <label for="exampleFormControlInput1" className="form-label">
                  &emsp;Email address
                </label>


                <input
                  className="form-control"
                  id="exampleFormControlInput1"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <span>
                  <i class="fa-solid fa-key fa-lg icon"></i>
                </span>
                <label for="inputPassword5" className="form-label">
                  &emsp;Password:
                </label>
                <input
                  id="inputPassword5"
                  class="form-control"
                  aria-describedby="passwordHelpBlock"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button id="button" type="submit">
                Login
              </button>
            </form>
            <div style={{ marginTop: "10px" }}>
              <p>
                Don't have an account?{" "}
                <Link to="/register-patient">Sign up</Link>
              </p>
              <p onClick={handleForgotPassword} style={{ cursor: "pointer" }}>
                Forgot Password?
              </p>
              <a href="#!" class="small text-muted">
                Terms of use.
              </a>
              <a href="#!" class="small text-muted">
                Privacy policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
