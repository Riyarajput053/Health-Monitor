import React from "react";
import images from "../../images/images.png";
import Register from "../Register";
import { Link } from "react-router-dom";
import profile from "../../images/profile.png";
import medication1 from "../../images/medication1.png";
import records from "../../images/records.jpg";
import Navbar from "./Navbar";

const HomeSections = () => {
  
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div
          className="card"
          style={{ width: "20rem", marginBlock: "50px", marginLeft: "80px" }}
        >
          <img src={profile} />
          <div className="card-body">
            <h5 className="card-title">Medical health profile</h5>
            <p className="card-text">
              Build your health profile that has your basics – height, weight,
              BMI, etc.
            </p>
          </div>
        </div>
        <div
          className="card"
          style={{ width: "20rem", marginBlock: "50px", marginLeft: "80px" }}
        >
          <img src={medication1} />
          <div className="card-body">
            <h5 className="card-title">Medications & prescriptions</h5>
            <p className="card-text">
              Retrieve all your prescriptions & medication in seconds to chart
              out the best course of action
            </p>
          </div>
        </div>
        <div
          className="card"
          style={{ width: "20rem", marginBlock: "50px", marginLeft: "80px" }}
        >
          <img src={records} />
          <div className="card-body">
            <h5 className="card-title">Lab reports & medical records</h5>
            <p className="card-text">
              Keep all your test reports and records in one place for a quick
              analysis of your vitals
            </p>
          </div>
        </div>
        <div
          className="card"
          style={{ width: "20rem", marginBlock: "50px", marginLeft: "80px" }}
        >
          <img src={images} />
          <div className="card-body">
            <h5 className="card-title">
              Stay in Sync With the Signals From Your Body
            </h5>
            <p className="card-text">
              Be more assertive about your health by tracking your vitals and
              understanding the difference between alarming and transient
              symptoms with us.
            </p>
          </div>
        </div>
      </div>
      <div></div>
      <Link
        to="/features"
        className="btn btn-outline-success"
        style={{ backgroundColor: "#008B8B", color: "white" }}
      >
        Know more
      </Link>
    </div>
  );
};

export default HomeSections;
