import React from 'react'
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const AddMedExpense = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [hospitalName, setHospitalName] = useState("");
  const [paymentFor, setPaymentFor] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [amount, setAmount] = useState("");
  const [condition, setCondition] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

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
    formData.append("bill", selectedFile); // Ensure matches backend field
    formData.append("hospitalName", hospitalName);
    formData.append("paymentFor", paymentFor);
    formData.append("paymentMode", paymentMode);
    formData.append("amount", amount);
    formData.append("condition", condition);

    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await fetch("http://localhost:8000/api/medical-expenses/add", {
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
      alert("Failed to upload bill.");
    }
  };

  return (
    <>
      <div className="container-screen">
        <div className="container-box">
          <form onSubmit={handleSubmit}>
            <div>
              <h2>Add Medical Expenses</h2>
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
                    <i className="fa-solid fa-calendar-days"></i>
                  </span>
                </div>
              </div>

              <input
                className="form-control form-control-lg mt-3"
                id="formFileLg"
                type="file"
                name='bill'
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
            <div className="form mt-3">
              <select
                className="form-control"
                value={paymentFor}
                onChange={(e) => setPaymentFor(e.target.value)}
              >
                <option value="">Payment for</option>
                <option value="consultancy">Consultancy</option>
                <option value="medical_test">Medical test</option>
                <option value="medicine">Medicine</option>
              </select>
            </div>
            <div className="form-floating mt-3">
              <textarea
                className="form-control"
                placeholder="Amount"
                id="floatingTextarea"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form mt-3">
              <select
                className=" form-control"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
              >
                <option value="" >Payment Mode</option>
                <option value="cash">Cash</option>
                <option value="credit">Credit Card</option>
                <option value="bank">Bank</option>
                <option value="upi">UPI</option>
              </select>
            </div>
            <div className="form-floating mt-3">
              <textarea
                className="form-control"
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
                    Expense saved successfully !!
                  </div>
                  <Link to="/viewmedexpense">
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


export default AddMedExpense
