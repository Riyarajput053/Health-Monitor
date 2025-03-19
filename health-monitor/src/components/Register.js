import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/login.css"; // Using the same CSS as login for consistency
import axios from "axios";
import { useLoading } from "../context/LoadingContext";


const RegisterForm = () => {
  const { loading, setLoading } = useLoading();

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/User/register`, formData);
      if (response.status === 201) {
        alert("Registration successful. Please log in.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Please try again.");
    }finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#008B8B" }}>
      <div className="card p-4 shadow-lg border-0" style={{ maxHeight:"700px", maxWidth: "800px", width: "90%" }}>
        <div className="text-center mb-3">
          <img
            src="https://media.licdn.com/dms/image/C560BAQGYYuRNc51wog/company-logo_200_200/0/1631381718986?e=2147483647&v=beta&t=-MWTZKj5QY0ahW6nF-DYGuicq8LPa8DeKofynMt6DPI"
            alt="Health Monitor Logo"
            className="img-fluid"
            style={{ maxWidth: "100px" }}
          />
        </div>

        <h2 className="text-center mb-3" style={{ color: "#008B8B" }}>Register Here</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <i className="fa-solid fa-user fa-lg me-2" style={{ color: "#008B8B" }}></i>Name
            </label>
            <input className="form-control" type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">
              <i className="fa-solid fa-envelope fa-lg me-2" style={{ color: "#008B8B" }}></i>Email address
            </label>
            <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">
              <i className="fa-solid fa-key fa-lg me-2" style={{ color: "#008B8B" }}></i>Password
            </label>
            <input className="form-control" type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">
              <i className="fa-solid fa-lock fa-lg me-2" style={{ color: "#008B8B" }}></i>Confirm Password
            </label>
            <input className="form-control" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          <button className="btn w-100" type="submit" id="button">
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
