import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../style/patientinfo.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const PatientInfo = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  // const [height, setHeight] = useState("");
  // const [weight, setWeight] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  // const [mediclaim, setMediclaim] = useState("");
  const [nameError, setnameError] = useState("");
  // const [ageError, setAgeError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [contactError, setContactError] = useState("");
  // const [stateError, setStateError] = useState("");
  // const [cityError, setCityError] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);


  const [formData, setFormData] = useState({
    // firstname: "",
    // lastname:"",
    // dob:"",
    // age: "",
    // gender: "",
    // contact: "",
    // height: "",
    // weight: "",
    // state: "",
    // city: "",
    // Mediclaim: "",
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    contactnumber: "",
    email: "",
    address: "",
  });
  const Navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    console.log(formData);
    const res = await axios
      .post("http://localhost:5000/User/patientInfo", formData, {
        withCredentials: true,
      })
      .then((value) => {
        console.log(value.data);

        Navigate("/");
      })
      .catch((err) => {
        console.warn(err);
      });

    // if(!firstname){
    //     setnameError("This is the required field !")
    //     setTimeout(() => {
    //         setnameError("");

    //     }, 2000);
    //     return;
    // }
    // if(!age){
    //     setAgeError("This is the required field !")
    //     setTimeout(() => {
    //         setAgeError("");

    //     }, 2000);
    //     return;
    // // }
    // if(!gender){
    //     setGenderError("This is the required field !")
    //     setTimeout(() => {
    //         setGenderError("");

    //     }, 2000);
    //     return;
    // }
    // if(!contacnumber){
    //     setContactError("This is the required field !")
    //     setTimeout(() => {
    //         setContactError("");

    //     }, 2000);
    //     return;
    // }
    // if(!state){
    //     setStateError("This is the required field !")
    //     setTimeout(() => {
    //         setStateError("");

    //     }, 2000);
    //     return;
    // }
    // if(!city){
    //     setCityError("This is the required field !")
    //     setTimeout(() => {
    //         setCityError("");

    //     }, 2000);
    //     return;
    // }

    Navigate("/patient-dashboard");
  };

  return (
    <div className="window">
      <div className="container ">
        <h2 style={{ marginBottom: "20px" }}>Patient Information</h2>
        <form className="mt-3">
          <div className="row align-items-start">
            <div className="col">
              <div className="form mb-2">
                <label style={{ fontWeight: "500" }}>
                  First name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="firstname"
                  onChange={handleChange}
                  required
                />
                <span>
                  {nameError && <p style={{ color: "red" }}>{nameError}</p>}
                </span>

                <label style={{ fontWeight: "500" }}>
                  Last name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="lastname"
                  onChange={handleChange}
                  required
                />
                <span>
                  {nameError && <p style={{ color: "red" }}>{nameError}</p>}
                </span>
              </div>
              <div className="form mb-2">
                <label style={{ fontWeight: "500" }}>
                  Email<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>

              <label style={{ fontWeight: "500" }}>
                  Date of Birth<span style={{ color: "red" }}>*</span>
                </label>
              <div
                className="input-group mt-2  "
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                
                <DatePicker
                  selected={selectedDate}
                  onChange={handleChange}
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
              {/* <div className="form mb-2">
                <label style={{fontWeight:'500'}}>Age<span style={{color:'red'}}>*</span></label>
                <input
                  className="form-control"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
                  <span>
                    {ageError && <p style={{color:"red"}}>{ageError}</p> }
                </span>
              
              </div> */}

              <div className="form mb-2">
                <label style={{ fontWeight: "500" }}>
                  Gender<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  className=" form-control"
                  required
                  name="gender"
                  onChange={handleChange}
                >
                  <option selected>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <span>
                  {genderError && <p style={{ color: "red" }}>{genderError}</p>}
                </span>
              </div>
              <div className="form mb-2">
                <label style={{ fontWeight: "500" }}>
                  Contact<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="tel"
                  name="contactnumber"
                  onChange={handleChange}
                  required
                />
                <span>
                  {contactError && (
                    <p style={{ color: "red" }}>{contactError}</p>
                  )}
                </span>
              </div>

              <div className="form mb-2">
                <label style={{ fontWeight: "500" }}>
                  Address<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="address"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* <div className="form mb-2">
                <label style={{fontWeight:'500'}}>Mediclaim:</label>
                <select
                className="form-control"
                  value={mediclaim}
                  onChange={(e) => setMediclaim(e.target.value)}
                 
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No </option>
                </select>
              </div> */}
            </div>
          </div>
          <br />
        </form>
        <button className="btn" id="button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default PatientInfo;
