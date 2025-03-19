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

      {/* <div> */}
      {/* <h3>Followed Doctors:</h3>
        <ul>
          {followedDoctors.map((doctor) => (
            <li key={doctor._id}>{doctor.name}</li>
          ))}
        </ul>
      </div> */}

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
          <div className="row row-cols-2 row-cols-md-3 g-4 mt-5">
            <div className="col">
              <Link
                to="/viewrecords"
                style={{ textDecoration: "none", color: "#008B8B" }}
              >
                <div
                  className="card w-100 rounded-4 bg-light"
                  style={{
                    // minHeight: "10rem",
                    // maxWidth: "15rem",
                    // borderRadius: "25px",
                    // backgroundColor: "#EEEEEE",
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
                  className="card w-100 rounded-4 bg-light mt-5"
                  style={{
                    // maxWidth: "15rem",
                    // minHeight: "10rem",
                    // minWidth: "15rem",
                    // borderRadius: "25px",
                    // backgroundColor: "#EEEEEE",
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
                  className="card w-100 rounded-4 bg-light "
                  style={{
                    // maxWidth: "15rem",
                    // minHeight: "10rem",
                    // minWidth: "15rem",
                    // borderRadius: "25px",
                    // backgroundColor: "#EEEEEE",
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
                  className="card w-100 rounded-4 bg-light mt-5"
                  style={{
                    // maxWidth: "15rem",
                    // minHeight: "10rem",
                    // minWidth: "15rem",
                    // borderRadius: "25px",
                    // backgroundColor: "#EEEEEE",
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
                  className="card w-100 rounded-4 bg-light "
                  style={{
                    // maxWidth: "15rem",
                    // minHeight: "10rem",
                    // minWidth: "15rem",
                    // borderRadius: "25px",
                    // backgroundColor: "#EEEEEE",
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
                  className="card w-100 rounded-4 bg-light mt-5"
                  style={{
                    // maxWidth: "15rem",
                    // minHeight: "10rem",
                    // minWidth: "15rem",
                    // borderRadius: "25px",
                    // backgroundColor: "#EEEEEE",
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
        <div className=" d-flex justify-content-center align-items-center">
          <button
            className="btn mt-5 text-center "
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            style={{ width: "800px", backgroundColor: "#008B8B" }}
          >
            {" "}
            + Add New Record
          </button>
        </div>
        {/* <----------modal---------->*/}
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
              <div
                className="modal-body"
                style={{ backgroundColor: "#008B8B" }}
              >
                <div className="row row-cols-2 row-cols-md-3 g-4 m-5">
                  <div className="col">
                    <Link
                      to="/addrecords"
                      style={{ textDecoration: "none", color: "#008B8B" }}
                    >
                      <div
                        className="card w-100 rounded-4 bg-light "
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
                          <h5 className="card-title">Lab Reports</h5>
                        </div>
                      </div>
                    </Link>
                    <Link
                      to="/addprescriptions"
                      style={{ textDecoration: "none", color: "#008B8B" }}
                    >
                      <div
                        className="card w-100 rounded-4 bg-light mt-3"
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
                          <h5 className="card-title">Prescriptions</h5>
                        </div>
                      </div>
                    </Link>
                    <Link
                      to="/adddocnotes"
                      style={{ textDecoration: "none", color: "#008B8B" }}
                    >
                      <div
                        className="card w-100 rounded-4 bg-light mt-3"
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
                          <h5 className="card-title">Doctor Notes</h5>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="col">
                    <Link
                      to="/addimaging"
                      style={{ textDecoration: "none", color: "#008B8B" }}
                    >
                      <div
                        className="card w-100 rounded-4 bg-light  "
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
                          <h5 className="card-title">Imaging</h5>
                        </div>
                      </div>
                    </Link>
                    <Link
                      to="/addmedexpense"
                      style={{ textDecoration: "none", color: "#008B8B" }}
                    >
                      <div
                        className="card w-100 rounded-4 bg-light mt-3"
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
                          <h5 className="card-title ">Medical Expense</h5>
                        </div>
                      </div>
                    </Link>
                    <Link
                      to="/addvaccination"
                      style={{ textDecoration: "none", color: "#008B8B" }}
                    >
                      <div
                        className="card w-100 rounded-4 bg-light mt-3"
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
                          <h5 className="card-title">Vaccination</h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn " data-bs-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="row row-cols-1 row-cols-md-3 g-4 mt-5 mb-5">
            <div className="col">
              <div
                className="card w-100 rounded-4 bg-light "
                style={{
                  // height: "10rem",
                  // width: "20rem",
                  // borderRadius: "25px",
                  // backgroundColor: "#EEEEEE",
                  cursor: "pointer",
                }}
              >
                <Link to="/pathealthhistory" style={{ textDecoration: "none" }}>
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <img
                      src={history}
                      className="card-img-top mt-3"
                      style={{
                        maxHeight: "5rem",
                        maxWidth: "5rem",
                        padding: "5px",
                      }}
                      alt="..."
                    ></img>
                    <h5
                      className="card-title mt-4"
                      style={{ color: "#008B8B", padding: "5px" }}
                    >
                      Patient Health History
                    </h5>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col">
              <div
                className="card w-100 rounded-4 bg-light mt-5"
                style={{
                  // height: "10rem",
                  // width: "20rem",
                  // borderRadius: "25px",
                  // backgroundColor: "#EEEEEE",
                  cursor: "pointer",
                }}
              >
                <Link to="/prediction" style={{ textDecoration: "none" }}>
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <img
                      src={analysis}
                      className="card-img-top mt-3"
                      style={{
                        maxHeight: "5rem",
                        maxWidth: "5rem",
                        padding: "5px",
                      }}
                      alt="..."
                    ></img>

                    <h5
                      className="card-title mt-4"
                      style={{ color: "#008B8B" }}
                    >
                      &ensp;Health Analysis
                    </h5>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;