import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import PatientInfo from "./components/PatientInfo";
import PatientDashboard from "./components/PatientDashboard";
import About from "./components/About";
import AddPrescriptions from "./components/AddPrescriptions";
import ViewPrescription from "./components/ViewPrescription";
import Edit from "./components/notused/Edit";
import Prediction from "./components/Prediction";
import ProtectedRoute from "./components/Functions/ProtectedRoute";
import Footer from "./components/Functions/Footer";
import Features from "./components/Features";
import HowItWorks from "./components/howItWorks"; // Renamed to follow React naming convention
import Register from "./components/Register";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ViewRecords from "./components/ViewRecords";
import ViewImaging from "./components/ViewImaging";
import ViewDocNotes from "./components/ViewDocNotes";
import ViewMedExpense from "./components/ViewMedExpense";
import ViewVaccination from "./components/ViewVaccination";
import AddRecords from "./components/AddRecords";
import AddDocNotes from "./components/AddDocNotes";
import AddImaging from "./components/AddImaging";
import AddMedExpense from "./components/AddMedExpense";
import AddVaccination from "./components/AddVaccination";
import Navbar from "./components/Functions/Navbar";
import { AuthContext, AuthProvider } from "./components/Functions/AuthProvider";
import Image from "./components/Image";
import LoadingSpinner from "./components/Functions/LoadingSpinner";
import { useLoading } from "./context/LoadingContext";




const App = () => {
  const { setAuthUser } = useContext(AuthContext); // Extracting setAuthUser
  const { loading } = useLoading();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    if (user) {
      setAuthUser(user);
    }
  }, [setAuthUser]);

  return (
    <AuthProvider>
      <LoadingSpinner />
      {loading ? null : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register-patient" element={<Register />} />
            <Route path="/patient-info" element={<PatientInfo />} />

            {/* Protected Routes */}
            <Route
              path="/patient-dashboard"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />


            <Route
              path="/addrecords"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <AddRecords />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addprescriptions"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <AddPrescriptions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adddocnotes"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <AddDocNotes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addimaging"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <AddImaging />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addmedexpense"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <AddMedExpense />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addvaccination"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <AddVaccination />
                </ProtectedRoute>
              }
            />
            <Route
              path="/viewrecords"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <ViewRecords />
                </ProtectedRoute>
              }
            />
            <Route
              path="/viewprescriptions"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <ViewPrescription />
                </ProtectedRoute>
              }
            />
            <Route
              path="/viewvaccination"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <ViewVaccination />
                </ProtectedRoute>
              }
            />
            <Route
              path="/viewdocnotes"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <ViewDocNotes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/viewimaging"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <ViewImaging />
                </ProtectedRoute>
              }
            />
            <Route
              path="/viewmedexpense"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <ViewMedExpense />
                </ProtectedRoute>
              }
            />
            <Route
              path="/prediction"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <Prediction />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <Edit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/footer"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <Footer />
                </ProtectedRoute>
              }
            />

            {/* Other Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/howitworks" element={<HowItWorks />} />
            <Route path="/features" element={<Features />} />
            <Route path="/image" element={<Image />} />
          </Routes>

        </>
      )}

    </AuthProvider>
  );
};

export default App;
