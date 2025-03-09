import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/addrecords.css";

function AddPrescriptions() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [hospitalName, setHospitalName] = useState("");
  const [docName, setDocName] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("testDate", selectedDate ? selectedDate.toISOString().split("T")[0] : ""); // Ensure proper date format
    formData.append("prescriptionFile", selectedFile); // Ensure matches backend field
    formData.append("hospitalName", hospitalName);
    formData.append("docName", docName);
    formData.append("description", description);
    formData.append("condition", condition);

    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await fetch(`${API_URL}/api/prescriptions/add`, {
        method: "POST",
        body: formData,
        credentials: "include",
        headers, // Only include token if it exists
      });

      const result = await response.json();
      if (response.ok) {
        setUploadSuccess(true);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload prescription.");
    }
  };

  return (
    <>
      <div className="container-screen">
        <div className="container-box">
          <form onSubmit={handleSubmit}>
            <div>
              <h2>Add Records</h2>
              <div className="input-group mt-5" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Date"
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                  required
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fa-solid fa-calendar-days"></i>
                  </span>
                </div>
              </div>

              <input
                className="form-control form-control-lg mt-3"
                id="formFileLg"
                type="file"
                name="prescription" // Added name attribute
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="form-floating mt-3">
              <textarea
                className="form-control"
                placeholder="Hospital Name"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-floating mt-3">
              <textarea
                className="form-control"
                placeholder="Doctor Name"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-floating mt-3">
              <textarea
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ height: "100px" }}
              ></textarea>
            </div>

            <div className="form-floating mt-3">
              <textarea
                className="form-control"
                placeholder="Condition/Illness"
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

      {/* Success Modal */}
      {uploadSuccess && (
        <>
          <div className="modal-backdrop fade show"></div>

          <div className="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-footer">
                  <div className="modal-body">
                    Prescription saved successfully !!
                  </div>
                  <Link to="/viewprescriptions">
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
  );
}

export default AddPrescriptions;
