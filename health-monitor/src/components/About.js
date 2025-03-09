import React from 'react';
import Navbar from './Functions/Navbar';
import Footer from './Functions/Footer';
import { useEffect } from 'react';

const About = () => {
    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    return (
        <>
       
      
        
        <div style={{ textAlign: 'center' }}>
            <img src="https://media.licdn.com/dms/image/C560BAQGYYuRNc51wog/company-logo_200_200/0/1631381718986?e=2147483647&v=beta&t=-MWTZKj5QY0ahW6nF-DYGuicq8LPa8DeKofynMt6DPI" alt="Logo" style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: '20px' }} />
            <h1 style={{ marginBottom: '20px', color:'#008B8B', fontWeight:'400px' }}>Welcome to Health Monitor System</h1>
            <p>This system can empower users to take control of their health by providing them with easy access to their medical records, lab results, and other health-related data, allowing them to make informed decisions about their care.</p>
            <br />
            <p>Implementing a predictive analytics feature based on historical health data to estimate the probability of future health issues is a key goal.</p>
            <br />
            <p>Ensuring each user has a unique ID and a QR code for quick and accurate retrieval of information by healthcare professionals is another crucial aspect.</p>
            <br />
            <p>Aims to enhance communication between patients and doctors, streamline health data management and contribute to proactive healthcare.</p>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Footer></Footer>
        </>
    );
};

export default About;
