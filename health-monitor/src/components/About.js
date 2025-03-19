import React, { useEffect } from "react";
import Navbar from "./Functions/Navbar";
import Footer from "./Functions/Footer";
import { useLoading } from "../context/LoadingContext";


const About = () => {
  const { loading, setLoading } = useLoading();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); 
  }, []);

  return (
    <>
      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <img
          src="https://media.licdn.com/dms/image/C560BAQGYYuRNc51wog/company-logo_200_200/0/1631381718986?e=2147483647&v=beta&t=-MWTZKj5QY0ahW6nF-DYGuicq8LPa8DeKofynMt6DPI"
          alt="Logo"
          style={{
            width: "100%",
            maxWidth: "200px",
            height: "auto",
            marginBottom: "20px",
          }}
        />
        <h1
          style={{
            marginBottom: "20px",
            color: "#008B8B",
            fontWeight: "400",
            fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", // Adjusting font size for responsiveness
          }}
        >
          Welcome to Health Monitor System
        </h1>
        <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: "1.6" }}>
          This system empowers users to take control of their health by providing them with easy access to their medical records, lab results, and other health-related data, allowing them to make informed decisions about their care.
        </p>
        <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: "1.6" }}>
          Implementing a predictive analytics feature based on historical health data to estimate the probability of future health issues is a key goal.
        </p>
        <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: "1.6" }}>
          Ensuring each user has a unique ID and a QR code for quick and accurate retrieval of information by healthcare professionals is another crucial aspect.
        </p>
        <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: "1.6" }}>
          Aims to enhance communication between patients and doctors, streamline health data management, and contribute to proactive healthcare.
        </p>
      </div>

      <Footer />
    </>
  );
};

export default About;
