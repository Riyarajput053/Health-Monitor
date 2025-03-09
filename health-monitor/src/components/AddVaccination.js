import React from 'react'
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const AddVaccination = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedValDate, setSelectedValDate] = useState(null);
  const [vaccinationFor, setVaccinationFor] = useState("");
  const [vaccineName, setVaccineName] = useState("");
  const [docName, setDocName] = useState("");
  const [condition, setCondition] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("testDate", selectedDate ? selectedDate.toISOString().split("T")[0] : ""); // Ensure proper date format
    formData.append("valDate", selectedValDate ? selectedValDate.toISOString().split("T")[0] : ""); // Ensure proper date format
    formData.append("vaccinationFor", vaccinationFor);
    formData.append("vaccineName", vaccineName);
    formData.append("docName", docName);
    formData.append("condition", condition);

    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await fetch("http://localhost:8000/api/vaccinations/add", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          testDate: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
          valDate: selectedValDate ? selectedValDate.toISOString().split("T")[0] : "",
          vaccinationFor,
          vaccineName,
          docName,
          condition
        })
      });

      const result = await response.json();
      if (response.ok) {
        setUploadSuccess(true);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload vaccination information.");
    }
  };

  return (

    <>
      <div className="container-screen" >
        <div className="container-box">
          <form onSubmit={handleSubmit}>
            <div>
              <h2>Add Vaccination</h2>
              <div className="input-group mt-4  " style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Date"
                  className="form-control"
                  dateFormat="dd/MM/yyyy"

                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i class="fa-solid fa-calendar-days"></i>
                  </span>
                </div>
              </div>
              <div className="input-group mt-3 " style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <DatePicker
                  selected={selectedValDate}
                  onChange={(date) => setSelectedValDate(date)}
                  placeholderText="Vaccination Validity date"
                  className="form-control"
                  dateFormat="dd/MM/yyyy"

                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i class="fa-solid fa-calendar-days"></i>
                  </span>
                </div>
              </div>


            </div>
            <div class="form-floating mt-3">
              <textarea
                class="form-control"
                placeholder="Dr. Name"
                id="floatingTextarea"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                required
              ></textarea>
            </div>
            <div class="form-floating mt-3">
              <textarea
                class="form-control"
                placeholder="Vaccination For"
                id="floatingTextarea"
                value={vaccinationFor}
                onChange={(e) => setVaccinationFor(e.target.value)}
                required
              ></textarea>
            </div>
            <div class="form-floating mt-3">
              <textarea
                className="form-control"
                placeholder="Vaccine Name"
                id="floatingTextarea2"
                value={vaccineName}
                onChange={(e) => setVaccineName(e.target.value)}
              ></textarea>
            </div>
            <div class="form-floating mt-3">
              <textarea
                class="form-control"
                placeholder="Condition/illness"
                id="floatingTextarea"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}

              ></textarea>
            </div>
            <button type="submit" className="btn mt-5" id="button" style={{ padding: ".5rem" }}>
              Continue
            </button>
          </form>
        </div>
      </div>
      {uploadSuccess && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-footer">
                  <div className="modal-body">
                    Vaccination updated successfully !!
                  </div>
                  <Link to="/viewvaccination">
                    <button type="button" className="btn" data-bs-dismiss="modal" onClick={() => setUploadSuccess(false)}>
                      Ok
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </>
  )
}

export default AddVaccination
