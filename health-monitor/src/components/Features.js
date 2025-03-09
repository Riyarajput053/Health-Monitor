import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Functions/Navbar";
import Footer from "./Functions/Footer";
import features2 from "../images/features2.jpg"
import features1 from "../images/features1.webp"
import features3 from "../images/features3.webp"
import feature4 from "../images/feature4.jpeg"
import feature5 from "../images/feature5.png"
import feature6 from "../images/feature6.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from "react";


const Features = (authUser) => {
    useEffect(() =>{
        window.scrollTo(0,0);
    },[])
  return (
    <div>
      
       
     
    
      
      <br/>
      <br/>
      <br/>
      <div className="container text-center">
      
        <h1
          className="display-4"
          style={{
            fontFamily: "sans-serif",
            fontWeight: "bold",
            color: "#008B8B"
          }}
        >
          One app, <br /> Complete Health Empowerment
        </h1>
        <p style={{ fontFamily: "sans-serif" }}>
          Uncover the power of seamless health management with an array of
          intuitive features designed for your proactive health journey.
        </p>
      </div>
    
      <br/>
      <hr className="my-4" />
     

      <div
        className="card mb-2"
        style={{
          paddingTop: "60px",
          paddingRight: "30px",
          maxwidth: "200px",
          backgroundColor: "#fff",
          minHeight: "350px",
          margin: "50px",
          border: "none",
        }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={features2}
              style={{
                maxWidth: "300px",
                minHeight: "200px",
                marginBottom: "20px",
                paddingLeft:'100px'
              }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body" style={{ textAlign: "left" }}>
              <h4 className="card-title" style={{ color: "#008B8B" }}>
                Digital records for you and your family
              </h4>
              <FontAwesomeIcon icon="fa-solid fa-check" />
              <h6><i className="fa-solid fa-check fa-lg text-[#008B8B]" style={{color:'#008B8B'}}></i>&emsp;Secure data sharing</h6>
              

              <p className="card-text">
                Manage and share your family's health records securely, all in
                one convenient place.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="card mb-3"
        style={{
          paddingTop: "60px",
          paddingRight: "30px",
          maxwidth: "200px",
          backgroundColor: "#fff",
          minHeight: "350px",
          margin: "50px",
          border: "none",
        }}
      >
        <div className="col-md-8">
          <div className="card-body" style={{ textAlign: "left", position:'absolute' }}>
           
            <h4 className="card-title" style={{ color: "#008B8B" }}>
              Informed decision making for critical care
            </h4>
            {/*insert icon*/}
            <h6><i className="fa-solid fa-check fa-lg text-[#008B8B]" style={{color:'#008B8B'}}></i>&emsp;Second opinions made simple</h6>
            <p className="card-text">
              Send your medical data to doctors in other locations within
              seconds for a second opinion
            </p>
            {/*insert icon*/}
            <h6><i className="fa-solid fa-check fa-lg text-[#008B8B]" style={{color:'#008B8B'}}></i>&emsp;Best results with timely action</h6>
            <p className="card-text">
              Be confident about making the right decision, quickly during
              challenging and stressful situations
            </p>

            <div className="row g-0">
              <div className="col-md-4 " >
                <img
                  src={features1}
                  style={{
                    minWidth: "250px",
                    minHeight: "100px",
                    marginBottom: "20px",
                    paddingLeft:'1000px',
                    position:'absolute'
                   
                               
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="card mb-3"
        style={{
          paddingTop: "60px",
          paddingRight: "30px",
          maxwidth: "200px",
          backgroundColor: "#fff",
          minHeight: "350px",
          margin: "50px",
          border: "none",
        }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={features3}
              style={{
                maxWidth: "300px",
                minHeight: "200px",
                marginBottom: "20px",
                paddingLeft:'100px'
              }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body" style={{ textAlign: "left" }}>
              <h4 className="card-title" style={{ color: "#008B8B" }}>
                Detailed health profile at your fingertips
              </h4>
              <h6><i className="fa-solid fa-check fa-lg text-[#008B8B]" style={{color:'#008B8B'}}></i>&emsp;Immediate accessibility</h6>
              <p className="card-text">
                Immediate accessibility Access & maintain your complete health
                profile directly from the Homescreen, simplifying your health
                tracking experience{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="card mb-3"
        style={{
          paddingTop: "60px",
          paddingRight: "30px",
          maxwidth: "200px",
          backgroundColor: "#fff",
          minHeight: "350px",
          margin: "50px",
          border: "none",
        }}
      >
        <div className="col-md-8">
          <div className="card-body" style={{ textAlign: "left" }}>
            <h4 className="card-title" style={{ color: "#008B8B" }}>
              Comprehensive predictive health analysis
            </h4>
            {/*insert icon*/}
            <h6><i className="fa-solid fa-check fa-lg text-[#008B8B]" style={{color:'#008B8B'}}></i>&emsp;Easy representation of your data</h6>
            <p className="card-text">
              Avail a consolidated view of your health data, charted out in the
              most simplest manner
            </p>
            {/*insert icon*/}
            <h6><i className="fa-solid fa-check fa-lg text-[#008B8B]" style={{color:'#008B8B'}}></i>&emsp;Health condition forecast</h6>
            <p className="card-text">
              Use the data to foresee any health risks and take preventative
              steps in the right direction{" "}
            </p>

            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={feature4}
                  style={{
                    minWidth: "250px",
                    minHeight: "100px",
                    marginBottom: "20px",
                    position:'absolute',
                    paddingLeft:'1000px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="card mb-2"
        style={{
          paddingTop: "60px",
          paddingRight: "30px",
          maxwidth: "200px",
          backgroundColor: "#fff",
          minHeight: "350px",
          margin: "50px",
          border: "none",
        }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={feature5}
              style={{
                minWidth: "350px",
                minHeight: "200px",
                marginBottom: "20px",
                paddingLeft:"100px"
              }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body" style={{ textAlign: "left" }}>
              <h4 className="card-title" style={{ color: "#008B8B" }}>
                Data privacy and security
              </h4>
              <h6> <i className="fa-solid fa-check fa-lg text-[#008B8B]" style={{color:'#008B8B'}}></i>&emsp;Secure data sharing</h6>
              <p className="card-text">
                Exercise your privacy as we only share data when required and
                with consent, in a secure manner{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="card mb-3"
        style={{
          paddingTop: "60px",
          paddingRight: "30px",
          maxwidth: "200px",
          backgroundColor: "#fff",
          minHeight: "350px",
          margin: "50px",
          border: "none",
        }}
      >
        <div className="col-md-8">
          <div className="card-body" style={{ textAlign: "left" }}>
            <h4 className="card-title" style={{ color: "#008B8B" }}>
              Health data on demand{" "}
            </h4>
            {/*insert icon*/}
            <h6><i className="fa-solid fa-check fa-lg text-[#008B8B]" style={{color:'#008B8B'}}></i>&emsp;Effortless sharing with caregiver</h6>
            <p className="card-text">
              Facilitate in-depth consultations by securely sharing your curated
              health profile data with healthcare professionals
            </p>

            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={feature6}
                  style={{
                    minWidth: "250px",
                    minHeight: "100px",
                    marginBottom: "20px",
                    position:'absolute',
                    paddingLeft:'1000px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div
        className="card mb-3"
        style={{
          paddingTop: "60px",
          paddingRight: "30px",
          maxwidth: "200px",
          backgroundColor: "#008B8B",
          minHeight: "350px",
          margin: "200px",
          borderRadius:'50px'
        }}
      >
        <div className="col-md-8">
          <div className="card-body " style={{ textAlign: "left" }}>
            <p
              className="card-text"
              style={{
                fontSize: "40px",
                fontFamily: "sans-serif",
                color: "#fff",
              }}
            >
              Take advantage of our extensive features today and secure a
              healthier tomorrow for you & your family. Register now!
            </p>

            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src=""
                  style={{
                    minWidth: "250px",
                    minHeight: "100px",
                    marginBottom: "20px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <br/>
      <br/>
      <br/>
      <Footer></Footer>
    </div>
    
  );
};

export default Features;
