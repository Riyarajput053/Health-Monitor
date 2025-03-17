import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min");
  }, []);

  return (
    <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "#6196A6", important: "true" }}>
      <div className="container-fluid">
        {/* Sidebar Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Brand */}
        <Link className="navbar-brand text-white" to={user ? "/patient-dashboard" : "/"}>
          {user ? "Dashboard" : "Health Monitor"}
        </Link>

        {/* Sidebar (Offcanvas) */}
        <div
          className="offcanvas offcanvas-start bg-dark text-white"
          style={{ width: "50vw", maxWidth: "400px" }}
          tabIndex="-1"
          id="sidebarMenu"
          aria-labelledby="sidebarMenuLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="sidebarMenuLabel">Menu</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/features" onClick={() => document.getElementById("sidebarMenu").classList.remove("show")}>
                  Features
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/about" onClick={() => document.getElementById("sidebarMenu").classList.remove("show")}>
                  About
                </Link>
              </li>
              {user ? (
                <li className="nav-item">
                  <button 
                    className="nav-link text-white btn btn-link" 
                    onClick={() => { 
                      document.getElementById("sidebarMenu").classList.remove("show");
                      logout();
                    }}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/login" onClick={() => document.getElementById("sidebarMenu").classList.remove("show")}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/register-patient" onClick={() => document.getElementById("sidebarMenu").classList.remove("show")}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
