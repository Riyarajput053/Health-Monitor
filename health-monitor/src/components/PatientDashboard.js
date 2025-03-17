import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./notused/Sidebar";
import ViewPrescriptions from "./ViewPrescription";
import Navbar from "./Functions/Navbar";
import history from "../images/history.png";
import analysis from "../images/analysis.png";
import "../style/patientdash.css";
import { useState, useEffect } from "react";
import axios from "axios";

const PatientDashboard = ({ authUser }) => {
  return (
    <div>
      <div className="d-flex flex-column" style={{ height: "715px" }}>
        <div className="d-flex justify-content-center align-items-center">
          <div className="row row-cols-2 row-cols-md-3 g-4 mt-5">
            {[
              { to: "/viewrecords", title: "Lab Reports" },
              { to: "/viewdocnotes", title: "Doctor Notes", marginTop: "mt-5" },
              { to: "/viewprescriptions", title: "Prescriptions" },
              { to: "/viewmedexpense", title: "Medical Expense", marginTop: "mt-5" },
              { to: "/viewimaging", title: "Imaging" },
              { to: "/viewvaccination", title: "Vaccination", marginTop: "mt-5" },
            ].map(({ to, title, marginTop }, index) => (
              <div className="col" key={index}>
                <Link to={to} style={{ textDecoration: "none", color: "#008B8B" }}>
                  <div
                    className={`card ${marginTop || ""}`}
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
                      <h5 className="card-title">{title}</h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <button
            className="btn mt-5 text-center"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            style={{ width: "800px", backgroundColor: "#008B8B" }}
          >
            + Add New Record
          </button>
        </div>

        {/* Modal */}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-body" style={{ backgroundColor: "#008B8B" }}>
                <div className="row row-cols-2 row-cols-md-3 gx-4 gy-4 m-5">
                  {[
                    { to: "/addrecords", title: "Lab Reports" },
                    { to: "/addprescriptions", title: "Prescriptions", marginTop: "mt-3" },
                    { to: "/adddocnotes", title: "Doctor Notes", marginTop: "mt-3" },
                    { to: "/addimaging", title: "Imaging" },
                    { to: "/addmedexpense", title: "Medical Expense", marginTop: "mt-3" },
                    { to: "/addvaccination", title: "Vaccination", marginTop: "mt-3" },
                  ].map(({ to, title, marginTop }, index) => (
                    <div className="col" key={index}>
                      <Link to={to} style={{ textDecoration: "none", color: "#008B8B" }}>
                        <div
                          className={`card ${marginTop || ""}`}
                          style={{
                            width: "9rem",
                            height: "6rem",
                            borderRadius: "25px",
                            backgroundColor: "#EEEEEE",
                            cursor: "pointer",
                          }}
                          data-bs-dismiss="modal"
                        >
                          <div className="card-body d-flex justify-content-center align-items-center">
                            <h5 className="card-title">{title}</h5>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" data-bs-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;