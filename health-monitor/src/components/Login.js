import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/login.css"; // Import your custom CSS
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./Functions/AuthProvider";
import { useLoading } from "../context/LoadingContext";


const LoginForm = () => {
  const { loading, setLoading } = useLoading();
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); 
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    try {
      const response = await fetch(`${API_URL}/User/login`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("Received data:", data);

      if (response.ok) {
        const { token } = data;

        if (typeof token !== "string") {
          throw new Error("Invalid token received");
        }

        const decoded = jwtDecode(token);
        console.log(decoded);

        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({ userId: decoded.userId, role: decoded.role })
        );

        setUser({ userId: decoded.userId, role: decoded.role });
        navigate("/patient-dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: "#008B8B" }}
    >
      <div className="card p-4 shadow-lg border-0" style={{ maxWidth: "800px", width: "90%" }}>
        <div className="text-center mb-3">
          <img
            src="https://media.licdn.com/dms/image/C560BAQGYYuRNc51wog/company-logo_200_200/0/1631381718986?e=2147483647&v=beta&t=-MWTZKj5QY0ahW6nF-DYGuicq8LPa8DeKofynMt6DPI"
            alt="Health Monitor Logo"
            className="img-fluid"
            style={{ maxWidth: "100px" }}
          />
        </div>

        <h2 className="text-center  mb-3" style={{color:"#008B8B"}}>Login Here</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" >
              <i className="fa-solid fa-envelope fa-lg me-2"  style={{color:"#008B8B"}}></i>Email address
            </label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              <i className="fa-solid fa-key fa-lg me-2" style={{color:"#008B8B"}}></i>Password
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn  w-100" type="submit" id="button" >
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Don't have an account? <Link to="/register-patient">Sign up</Link>
          </p>
          <p
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => alert("A password reset link has been sent to your email.")}
          >
            Forgot Password?
          </p>
        </div>

        <div className="text-center">
          <a href="#!" className="small text-muted me-2">Terms of use</a>
          <a href="#!" className="small text-muted">Privacy policy</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
