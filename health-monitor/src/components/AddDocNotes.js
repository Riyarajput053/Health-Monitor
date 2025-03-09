import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/addrecords.css";

function AddDocNotes() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [hospitalName, setHospitalName] = useState("");
  const [docName, setDocName] = useState("");
  const [notes, setNotes] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;



  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("testDate", selectedDate ? selectedDate.toISOString().split("T")[0] : ""); // Ensure proper date format
    formData.append("hospitalName", hospitalName);
    formData.append("docName", docName);
    formData.append("notes", notes);

    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await fetch(`${API_URL}/api/doctor-notes/add`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          testDate: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
          hospitalName,
          docName,
          notes
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
      alert("Failed to upload note.");
    }
  };

  return (
    <>
      <div className="container-screen">
        <div className="container-box">
          <form onSubmit={handleSubmit}>
            <div>
              <h2>Add Notes</h2>
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
                placeholder="Note"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{ height: "100px" }}
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
                    Image saved successfully !!
                  </div>
                  <Link to="/viewdocnotes">
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

export default AddDocNotes;
