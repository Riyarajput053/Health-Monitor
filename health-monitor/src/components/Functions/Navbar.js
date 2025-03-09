import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider"; // Import AuthContext
import "../../style/navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext); // Get user and logout function from context

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: "#6196A6" }}>
      <div className="container-fluid">
        {/* If user is logged in, show "Dashboard" link, otherwise show "Health Monitor" */}
        <Link className="navbar-brand text-white" to={user ? "/patient-dashboard" : "/"}>{user ? "Dashboard" : "Health Monitor"}</Link>

        <div className="collapse navbar-collapse" style={{ justifyContent: "right" }}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/features">Features</Link>
            </li>
           
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">About</Link>
            </li>

            {user ? ( // If user is logged in, show Logout
              <li className="nav-item">
                <button className="nav-link text-white btn btn-link" onClick={logout}>Logout</button>
                

              </li>
            ) : ( // If user is NOT logged in, show Login & Register
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register-patient">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
