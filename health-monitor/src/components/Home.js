import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Functions/Navbar';
import axios from 'axios';
import HomeSections from './Functions/HomeSections';
import Footer from './Functions/Footer';
import { useEffect } from 'react';
const Home = () => {
    const [authUser, setAuthUser] = useState("false");
    const [showLoginOptions, setShowLoginOptions] = useState(false);
    const [showRegisterOptions, setShowRegisterOptions] = useState(false);

    useEffect(()=>{
      window.scrollTo(0,0);
    },[])

   

    return (
        <>
            <div className="container-fluid p-0 text-center" style={{ color: 'black', backgroundColor:'#fff', backgroundSize: 'cover', minHeight: '100vh' }}>
              
                <div className="jumbotron" style={{backgroundColor:'#008B8B'}}>
                    <h1 className="display-4" style={{color:'#fff', fontWeight:'bold', fontFamily:'sans-serif'}}>Welcome to Health Monitor System</h1>
                    <p className="lead" style={{color:'#fff' ,fontWeight:'bold'}}>
                        This is a simple and effective system to monitor health records and prescriptions.
                    </p>
                    <hr className="my-4" />
                    <p style={{color:'#fff',fontWeight:'bold'}}>
                        Get started by logging in or registering as a doctor or patient.
                    </p>
                </div>
                <div
        className="card mb-3"
        style={{
          paddingTop: "60px",
          paddingRight: "30px",
          maxwidth: "200px",
          backgroundColor: "#fff",
          minHeight: "350px",
        }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="https://media.licdn.com/dms/image/C560BAQGYYuRNc51wog/company-logo_200_200/0/1631381718986?e=2147483647&v=beta&t=-MWTZKj5QY0ahW6nF-DYGuicq8LPa8DeKofynMt6DPI"
              style={{
                minWidth: "250px",
                minHeight: "200px",
                marginBottom: "20px",
              }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body" style={{ textAlign: "left" }}>
              <h5 className="card-title">
                {" "}
                All your health information in one place, Accessible, Anywhere,
                Anytime
              </h5>
              <p className="card-text">
                {" "}
                No more carrying bulky medical records for doctor's
                appointments! Empower your caregiver with your entire medical
                history from a single platform and get the best possible care in
                a timely manner.
              </p>
              <Link
                to="/register-patient"
                className="btn btn-outline-success"
                style={{ backgroundColor: "#008B8B", color: "white" }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
                <HomeSections/>
                <br></br>
                <Footer></Footer>
                
                {/* <div className="text-center gap-3 mt-3">
                   
                    <button type="button" className="btn btn-primary btn-lg me-md-2" onClick={handleLoginClick}>Login</button>
                    <button type="button" className="btn btn-primary btn-lg me-md-2" onClick={handleRegisterClick} style={{ backgroundColor: 'green', borderColor: 'green' }}>Register</button>
                </div>
                <div className="card-deck mt-4" >
                    {showLoginOptions && (
                        <>
                            <div >
                                    <Link to="/login?type=doctor" className="btn btn-primary">Login as doctor</Link>
                               
                            </div>

                            <div >
                                    <Link to="/login?type=patient" className="btn btn-success">Login as patient</Link>
                               
                            </div>
                        </>
                    )}

                    {showRegisterOptions && (
                        <div>
                            <div >
                                    <Link to="/register?type=doctor" className="btn btn-outline-primary" style={{ backgroundColor: 'blue', color: 'white' }}>Register as Doctor</Link>
                            
                            </div>

                            <div >
                                    <Link to="/register?type=patient" className="btn btn-outline-success" style={{ backgroundColor: 'green', color: 'white' }}>Register as patient</Link>
                                </div>
                      
                        </div>
                    )}
                

                    
                </div> */}
            </div>
            
        </>
    );
};

export default Home;
