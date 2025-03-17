import React from "react";
import Sidebar from "./notused/Sidebar";
import "../style/patientdash.css";
import { Link } from "react-router-dom";
import ViewPrescriptions from "./ViewPrescription";
import Navbar from "./Functions/Navbar";
import history from "../images/history.png";
import analysis from "../images/analysis.png";
import { useState, useEffect } from "react";
import axios from "axios";

const PatientDashboard = ({ authUser }) => {
  return (
    <div>
      <div
        style={{
          flexDirection: "column",
          display: "flex",
          height: "715px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="row row-cols-1 row-cols-md-3 g-4 mt-5">
            <div className="col">
              <Link
                to="/viewrecords"
                style={{ textDecoration: "none", color: "#008B8B" }}
              >
                <div
                  className="card"
                  style={{
                    minHeight: "10rem",
                    borderRadius: "25px",
                    backgroundColor: "#EEEEEE",
                    cursor: "pointer",
                  }}
                >
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <h5 className="card-title">Lab Reports</h5>
                  </div>
                </div>
              </Link>
              <Link
                to="/viewdocnotes"
                style={{ textDecoration: "none", color: "#008B8B" }}
              >
                <div
                  className="card mt-5"
                  style={{
                    maxWidth: "15rem",
                    minHeight: "10rem",
                    minWidth: "15rem",
                    borderRadius: "25px",
                    backgroundColor: "#EEEEEE",
                    cursor: "pointer",
                  }}
                >
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <h5 className="card-title">Doctor Notes</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                to="/viewprescriptions"
                style={{ textDecoration: "none", color: "#008B8B" }}
              >
                <div
                  className="card"
                  style={{
                    maxWidth: "15rem",
                    minHeight: "10rem",
                    minWidth: "15rem",
                    borderRadius: "25px",
                    backgroundColor: "#EEEEEE",
                    cursor: "pointer",
                  }}
                >
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <h5 className="card-title">Prescriptions</h5>
                  </div>
                </div>
              </Link>
              <Link
                to="/viewmedexpense"
                style={{ textDecoration: "none", color: "#008B8B" }}
              >
                <div
                  className="card mt-5"
                  style={{
                    maxWidth: "15rem",
                    minHeight: "10rem",
                    minWidth: "15rem",
                    borderRadius: "25px",
                    backgroundColor: "#EEEEEE",
                    cursor: "pointer",
                  }}
                >
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <h5 className="card-title">Medical Expense</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                to="/viewimaging"
                style={{ textDecoration: "none", color: "#008B8B" }}
              >
                <div
                  className="card"
                  style={{
                    maxWidth: "15rem",
                    minHeight: "10rem",
                    minWidth: "15rem",
                    borderRadius: "25px",
                    backgroundColor: "#EEEEEE",
                    cursor: "pointer",
                  }}
                >
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <h5 className="card-title">Imaging</h5>
                  </div>
                </div>
              </Link>
              <Link
                to="/viewvaccination"
                style={{ textDecoration: "none", color: "#008B8B" }}
              >
                <div
                  className="card mt-5"
                  style={{
                    maxWidth: "15rem",
                    minHeight: "10rem",
                    minWidth: "15rem",
                    borderRadius: "25px",
                    backgroundColor: "#EEEEEE",
                    cursor: "pointer",
                  }}
                >
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <h5 className="card-title">Vaccination</h5>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <style>
          {`
            @media (max-width: 768px) {
              .card {
                max-width: 100% !important;
                min-width: auto !important;
                min-height: 8rem !important;
                text-align: center;
              }
              .row {
                flex-direction: column;
                align-items: center;
              }
              .card-title {
                font-size: 1rem;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default PatientDashboard;
